import React from 'react';
import { useState } from 'react';
import  axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {successNotification,errorNotification} from '../Utils/Notifications.js';
// import dotenv from 'dotenv/config';

const AuthenticateEmail = () => {

  const [email,setEmail] = useState('');
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  const authEmail = async(e) => {

    console.log('auth email called');
    
    e.preventDefault();

    try {

      await axios.post(`${apiUrl}/api/v1/user/forgot-password/email`,{email},{withCredentials:true});
      successNotification('OTP sent to your registered mail id');
      return navigate('/forgot-password/reset-password');
      
    } catch (error) {
      console.log(error);
      return errorNotification(error?.response?.data?.message);
    }

  }

  return (
    <div className="AuthenticateEmailContainer">
    <div className="AuthenticateEmail">
      <h3 className="AuthenticateEmailHeading">Authenticate Email</h3>
      <p className="AuthenticateEmailParagraph">
        Please provide your registered email id so we can authenticate your account.
      </p>
      <form onSubmit={(e) => authEmail(e)}>
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
          <label htmlFor="">Email Id</label>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            placeholder="Enter you email id..."
          ></input>
        </div>
        <button type="submit">Send OTP</button>
      </form>
    </div>
    </div>
  )
}

export default AuthenticateEmail;