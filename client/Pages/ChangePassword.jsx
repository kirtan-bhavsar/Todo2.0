import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {successNotification,errorNotification} from '../Utils/Notifications.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { useEffect } from 'react';
// import { useEffect } from 'react';

const ChangePassword = () => {

    
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
    const [formData,setFormData] = useState({
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
    });

    const [passwordMatches,isPasswordMatches] = useState(false);

    // console.log(formData);

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    const matchPassword = (e) => {

        const confirmNewPassword = e.target.value;
        // console.log(confirmNewPassword);
        // console.log(formData.newPassword);

        if(confirmNewPassword === formData.newPassword){
            isPasswordMatches(true);
            // console.log(passwordMatches);
        } else{
            isPasswordMatches(false);
        }

    }

    const changePassword = async(e) => {

        e.preventDefault();

        try {
            
            if(!passwordMatches){
                errorNotification("Passwords do not match");
            }
            // console.log(apiUrl);
            console.log(formData);
            console.log("formData");
            await axios.post(`${apiUrl}/api/v1/user/change-password`,formData,{withCredentials:true});
            successNotification("Password Updated successfully");
            return navigate('/login');

        } catch (error) {

            console.log(error);

            return errorNotification(error?.response?.data?.message);

        }

    }

    useEffect(() => {

    },[passwordMatches]);

  return (
    // <div className="change-password-container">
    //     <h1>Change Password</h1>
    //     <form action="">

    //     </form>
    // </div>
    <div className="ChangePasswordContainer">
    <div className="ChangePassword">
      <h3 className="ChangePasswordHeading">Change Password</h3>
      <p className="ChangePasswordParagraph">
        Secure your account with a new password
      </p>
      <form onSubmit={(e) => changePassword(e)}>
        {/* <div className="InputGroup">
          <label htmlFor="">Username</label>
          <input
            type="password"
            onChange={(e) => onChange(e)}
            name="name"
            placeholder="coolmate_16"
          ></input>
        </div> */}
        {/* <div className="InputGroup">
          <label htmlFor="">Email</label>
          <input
            required
            type="text"
            onChange={(e) => onChange(e)}
            name="email"
            placeholder="you@example.com"
          ></input>
        </div> */}
        <div className="InputGroup">
          <label htmlFor="">Current Password</label>
          <input
            required
            type="password"
            onChange={(e) => onChange(e)}
            name="currentPassword"
            placeholder="••••••••"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">New Password</label>
          <input
            type="password"
            name="newPassword"
            // className={
            //   passwordMatches ? "successIndication" : "failureIndication"
            // }
            required
            onChange={(e) => onChange(e)}
            placeholder="••••••••"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={
              passwordMatches ? "successIndication" : "failureIndication"
            }
            required
            onChange={(e) => {
                onChange(e);
                matchPassword(e);
            }}
            placeholder="••••••••"
          ></input>
        </div>
        <button type="submit">Update Password</button>
      </form>
    </div>
    </div>
  )
}

export default ChangePassword