import React from 'react'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import {ToastContainer,toast,Slide} from 'react-toastify';
import { successNotification,errorNotification } from '../Utils/Notifications.js';
// import 'react-toastify/dist/ReactToastify.css'; // Make sure you have this import

const LoginForm = () => {

  const [data,setData] = useState({
    email:"",
    password:""
  });

   const navigate = useNavigate();

   const onChange = (e) => {
    setData({...data,[e.target.name]:e.target.value});
   }
  
    const loginUser = async (e,data) => {

      e.preventDefault();

      try {
        await axios.post("/api/v1/user/login", data);
        successNotification("Login Successful");
        navigate('/home');
      } catch (error) {
          if(error){
            errorNotification(error.response.data.message);
          }
      }
    }

  return (
    <>
    <div className='LoginForm'>
    <h2 className='LoginFormHeading'>Welcome Back</h2>
    <p className='LoginFormParagraph'>Login to continue to your tasks</p>
    
        <form onSubmit={(e) => loginUser(e,data)}>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Email</label>
        <input required type="text" name='email' onChange={(e) => onChange(e)} className='d-inline-block EmailInput' placeholder='you@example.com'/>
        </div>
        <div className="InputGroup">
        <label htmlFor="" className='d-inline-block'>Password</label>
        <input required type="password" name='password' onChange={(e) => onChange(e)} placeholder='••••••••'/>
        </div>
        <button type='submit'>Login</button>
    </form>
    <div className="divider">or</div>
    <div className="footer">Don't have an account? <span><Link className="SignupLink" to='/signup'>Sign up</Link></span></div>
    </div>
    {/* <ToastContainer></ToastContainer> */}
    </>
  )
}

export default LoginForm