import React, { useState } from 'react'
import { errorNotification,successNotification } from '../Utils/Notifications';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const [formData,setFormData] = useState({
        otp:"",
        password:"",
        confirmPassword:"",
})

    const[passwordMatches,isPasswordMatches] = useState(false);
    const navigate = useNavigate();
    
  const apiUrl = import.meta.env.VITE_API_URL;

    const onChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    }

    
    const matchPassword = (e) => {

        const confirmEnteredPassword = e.target.value;
        // console.log(confirmNewPassword);
        // console.log(formData.newPassword);

        if(confirmEnteredPassword === formData.password){
            isPasswordMatches(true);
            // console.log(passwordMatches);
        } else{
            isPasswordMatches(false);
        }

    }

    const resetPassword = async(e) => {

        console.log("called reset password ui")

        e.preventDefault();

        try {
        
      await axios.post(`${apiUrl}/api/v1/user/forgot-password/reset-password`,formData,{withCredentials:true});
      successNotification('Password reset successfull');
      return navigate('/login');

        } catch (error) {

        console.log(error);
         
        return errorNotification(error?.response?.data?.message);

        }

    }

  return (
        <div className="ChangePasswordContainer">
    <div className="ChangePassword">
      <h3 className="ChangePasswordHeading">Reset Password</h3>
      <p className="ChangePasswordParagraph">
        Please reset password to your account, and we hope you'll remember it.
      </p>
      <form onSubmit={(e) => resetPassword(e)}>
        <div className="InputGroup">
          <label htmlFor="">OTP</label>
          <input
            required
            type="text"
            onChange={(e) => onChange(e)}
            name="otp"
            placeholder="provide your 6 digit OTP"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Reset Password</label>
          <input
            type="password"
            name="password"
            required
            onChange={(e) => onChange(e)}
            placeholder="••••••••"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Confirm Reset Password</label>
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
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  )
}

export default ResetPassword