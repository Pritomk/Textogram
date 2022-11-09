import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Header = () => {

    const navigate = new useNavigate()
    const { state, dispatch } = useContext(UserContext);

    const Logout = () => {
        localStorage.clear();
        dispatch({ type: "CLEAR" });
        navigate("/login");
    }

    return (
        <div className="header">
            <div className="nav-open-container">
                <div className="nav-open-span" onclick="nav_open()">
                    <hr className="nav-open-line" />
                    <hr className="nav-open-line" />
                    <hr className="nav-open-line" />
                </div>
            </div>
            <Link to={"/"}>
            <Link to={state ? "/" : "/login"} className="logo">Textogram</Link>

            </Link>
            <div className="search-header">
                <form id="search-form">
                    <input type="text" id="new-task-input" placeholder="New task..." />
                </form>
            </div>

            <Link to={"/profile"}>
                <div className="profile-item">
                    <img src="https://lh3.googleusercontent.com/ogw/AOh-ky0JGrqUbwbPmizoOMk2jajsyzohMhmuRhvz-o2xgg=s32-c-mo"
                        width="50rem" height="50rem" alt="Profile pic" id="profile-pic" onClick={() => { navigate("/profile") }} />

                    <div className="profile-item-details">
                        <div className="name">Pritom Karmakar</div>
                    </div>
                </div>

            </Link>
            <div>
                <i className="material-icons logout-btn"
                    onClick={() => Logout()}>power_settings_new</i>
            </div>
        </div>
    )
}

export default Header