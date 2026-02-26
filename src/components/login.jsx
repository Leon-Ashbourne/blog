import { extractData, IsAuthenticated } from "./signup"
import { SessionContext } from "../App";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";

import "./styles/cred.css"

async function sessionLogin(data) {
    const isAuthenticated = await fetch('https://blog-api-fi4r.onrender.com/Sign-in', {
        method: "POST",
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(async (res) => {

        if(res.status === 503) return 503;
        
        else if(res.status === 406) {
            const result = await res.json();

            displayLoginErr(result.message);
            return false;
        }

        return await res.json();
    })
    .then(val => {

        if(val === 503 ) return val;
        else if(!val) return false;

        saveToken(val);
        return true;

    });
    
    return isAuthenticated;
}

function displayLoginErr(message) {
    const errorEle = document.querySelector('.error.username-password-error');
    errorEle.textContent = message;
}

function saveToken(val) {
    localStorage.setItem('Token', val.Token);
    localStorage.setItem('username', val.username)
}

export default function SigninForm() {
    const setUsername = useContext(SessionContext).setUsername;
    const location = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(formData) {
        const data = extractData(formData);
        const success = await sessionLogin(data);

        if(success === 503) return navigate('/server-error');
        if(success) onSucces();
    }

    const isAuthenticated = localStorage.getItem("Token");

    if(isAuthenticated) {
        return (
            <IsAuthenticated location={location} />
        )
    }

    function onSucces() {
        const username = localStorage.getItem("username");
        return setUsername(username);
    }

    return (
        <div className="form-wrapper">
            <div className="form-styled">
                <div className="cred-styled">SIGN IN</div>
                <form action={handleSubmit} >
                    <div className="error username-password-error" aria-live="polite"></div>
                    <div>
                        <section className="section username-section">
                            <div className="label-styled"><label htmlFor="username">username</label></div>
                            <div><input className="input-styled" type="username" name="username" id="username" required="required" autoFocus/></div>
                        </section>
                        <section className="section password-section">
                            <div className="label-styled"><label htmlFor="password">Password</label></div>
                            <div><input className="input-styled" type="password" name="password" id="password" minLength="5" required="required"/></div>
                        </section>
                        <section>
                            <div className="signup-button-styled"><button type="submit">Continue</button></div>
                        </section>
                    </div>
                </form>
            </div>
        </div>
    )
}