    import React, { useEffect } from "react";
    import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
    import { FaBars } from "react-icons/fa";
    import axios from "axios";
    import { useNavigate } from "react-router-dom";
    import { successNotification, errorNotification } from "../Utils/Notifications";
    import { useState } from "react";
    import { FaMoon,FaLock } from "react-icons/fa";
    import {HiSun} from 'react-icons/hi';
import ChangePassword from "../Pages/ChangePassword";

    const TodoHeading = ({ user, isLightTheme, toggleTheme }) => {

    const [displayDropdown,setDisplayDropdown] = useState(false);

    const apiUrl = import.meta.env.VITE_API_URL;
// import ChangePassword from './../Pages/ChangePassword';

    const navigate = useNavigate();

    //   const showDropdown = () => {
    //     setDisplayDropdown(!displayDropdown);
    //   }

    const changePassword = (e) => {

        navigate('/change-password');

    }

    const logout = async () => {
        try {
        // const response = await axios.post('/api/v1/user/logout');
        const response = await axios.post(
            `${apiUrl}/api/v1/user/logout`,
            {},
            { withCredentials: true }
        );
        // const response = await axios.get(`${apiUrl}/api/v1/user/test`,{withCredentials:true});

        navigate("/login");

        successNotification(response.data.message);
        } catch (error) {
        errorNotification(error.response.data.message);

        console.log(error);
        }
    };

    return (
        <>
        <div className="HeaderContainer">
            <h1 className="text-custom-heading-color HeaderHeading fw-bold">
            Hello {user.name}! - What is on your List?
            </h1>
            {/* Single Logout Button */}
            {/* <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="HeaderLogoutButton"
            onClick={logout}
            ></FontAwesomeIcon> */}
            {/* Hamburger Menu */}
            <div className="dropdown">
            <FaBars onClick={() => setDisplayDropdown(!displayDropdown)} className="dropdown-button"></FaBars>
            <div  className={displayDropdown ? "dropdown-list active" : "dropdown-list"}>
                <button onClick={toggleTheme} className="dropdown-list-item">Theme
                {/* <FaMoon></FaMoon> */}
                {isLightTheme ? <FaMoon></FaMoon> : <HiSun style={{fontSize:"24px"}}></HiSun>}
                </button>
                <button onClick={logout} className="dropdown-list-item">Logout
                <FontAwesomeIcon
            icon={faArrowRightFromBracket}></FontAwesomeIcon>
                </button>
                <button onClick={(e) => changePassword(e)} className="dropdown-list-item">Change Password
                <FaLock></FaLock>
                </button>
            </div>
            </div>
        </div>
        </>
    );
    };

    export default TodoHeading;
