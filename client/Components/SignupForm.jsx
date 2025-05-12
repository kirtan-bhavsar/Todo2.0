import react, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import {
  successNotification,
  errorNotification,
} from "../Utils/Notifications.js";

const SignupForm = () => {
  const navigate = useNavigate();

  const [passwordMatches, setPasswordMatches] = useState(false);

  const getPassword = (e) => {
    let enteredConfirmPassword = e.target.value;

    // enteredConfirmPassword = enteredConfirmPassword.trim();
    
    console.log(enteredConfirmPassword + " enteredConfirmPassword");

    matchPassword(enteredConfirmPassword);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const matchPassword = (enteredConfirmPassword) => {

    console.log(enteredConfirmPassword  + " = " + formData.password);

    if (enteredConfirmPassword === formData.password) {
      setPasswordMatches(true);
      console.log(passwordMatches + " passwordmatches");
    } else {
        setPasswordMatches(false);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const registerUser = async (e, formData) => {
    e.preventDefault();

    try {
      if (!passwordMatches) {
        errorNotification("Passwords do not match");
      } else {

      const response = await axios.post("/api/v1/user/register", formData);
      if (response.status === 200) {
        navigate("/home");
        successNotification("Registration Successful");
      }
    }
    } catch (error) {
      errorNotification(error.response.data.message);
      console.log(error);
    }
  };

  useEffect(() => {},[passwordMatches]);

  return (
    <div className="SignupForm">
      <h3 className="SignupFormHeading">Create Account</h3>
      <p className="SignupFormParagraph">
        Get started with your task management
      </p>
      <form onSubmit={(e) => registerUser(e, formData)}>
        <div className="InputGroup">
          <label htmlFor="">Username</label>
          <input
            type="text"
            onChange={(e) => onChange(e)}
            name="name"
            placeholder="coolmate_16"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Email</label>
          <input
            required
            type="text"
            onChange={(e) => onChange(e)}
            name="email"
            placeholder="you@example.com"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Password</label>
          <input
            required
            type="password"
            onChange={(e) => onChange(e)}
            name="password"
            placeholder="••••••••"
          ></input>
        </div>
        <div className="InputGroup">
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className={
              passwordMatches ? "successIndication" : "failureIndication"
            }
            required
            onChange={(e) => getPassword(e)}
            placeholder="••••••••"
          ></input>
        </div>
        <button type="submit">Signup</button>
      </form>
      <div className="footer">
        Already have an account?{" "}
        <span>
          <Link className="LoginLink" to="/">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignupForm;
