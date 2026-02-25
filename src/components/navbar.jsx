import { useContext } from "react";
import { NavLink } from "react-router";

import { SessionContext } from "../App";
import "./styles/navbar.css";

//send session details to the blog editor
export function sendSessionToEditor() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("Token");

    const targetOrigin = "http://localhost:5174";

    const session = {
        username,
        token
    }

    postMessage(session, targetOrigin);
}

//navbar
export default function Navbar() {

    return (
        <nav>
            <div className="navbar-wrapper">
                <div className="navbar-container">
                    <div className="link-wrapper navbar-logo"><NavLink to="/" className="navbar-link logo">Home</NavLink></div>
                    <SessionProfile />
                </div>
            </div>
        </nav>
    )
}

function SessionProfile() {
    const isLoggedIn = useContext(SessionContext).username;
    const setUsername = useContext(SessionContext).setUsername;

    function handleLogout() {
        setUsername(null);
        localStorage.removeItem('Token');
        localStorage.removeItem('username');

    }

    if(isLoggedIn) {
        return (
            <div className="user-wrapper">
                <div className="link-wrapper navbar-write-blog"><NavLink to="/create" className="navbar-create navbar-link">create a blog</NavLink></div>
                <div className="link-wrapper navbar-log-out"><NavLink to="/" className="navbar-link log-out" onClick={ handleLogout }>Logout</NavLink></div>
            </div>
        )
    }else {
        return (
            <div className="login-wrapper">
                <div className="link-wrapper navbar-register"><NavLink to="/Sign-up" className="navbar-link register">Register</NavLink></div>
                <div className="link-wrapper navbar-login"><NavLink to="/Sign-in" className="navbar-link login">Login</NavLink></div>
            </div>
        )
    }
}

