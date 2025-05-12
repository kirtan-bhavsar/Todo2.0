import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare as faPenToSquareRegular } from "@fortawesome/free-regular-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Home from "../Pages/Home.jsx";
import Login from "../Pages/Login.jsx";
import Signup from "../Pages/Signup.jsx";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  
  return (
    <>
    <Router>
    <Routes>
      
      <Route path="/" element={<Login/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
};

// demo comment for v1
// demo comment for V2 which will be reflected in V2 branch but not in V1 brach

export default App;
