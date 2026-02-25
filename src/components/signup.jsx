import { Navigate, useLocation, useNavigate } from "react-router";

import "./styles/cred.css"

export function checkSession() {
    const token = localStorage.getItem("Token");
    if(token) return true;
    return false;
}


export function extractData(formData) {
    const iterator = formData.entries();
    let data = {};

    for(const pair of iterator) {
        const [key, value] = [...pair];

        data[key] = value;
    }

    return data;
}

async function sendToServer(data) {
    const userCreated = await fetch('http://localhost:5000/Sign-up', {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json" 
        }
    })
    .then(async value => {
        const errors = await value.json();
        return errors;
    })
    .then(val => {
        if(val.status === 503) {
            return 503;
        }
        const errors = val.errors;
        if(errors) return displayErrors(errors.errors);
        return true;
    });

    return userCreated;
}

export function displayErrors(errors) {
    errors.forEach(err => {
        const inputId = err.path;
        const inputErr = document.querySelector(`.${inputId}-error`);
        inputErr.textContent = err.msg;
    })
}

export function IsAuthenticated(props) {
    return (
        <Navigate 
            to="/"
            state={{ from: props.location }}
            replace
        ></Navigate>
    )
}

export function SignupForm() {
    const location = useLocation();
    const navigate = useNavigate();

    async function handleSubmit(formData) {
        //todo- client side validation
        const data = extractData(formData);
        const success = await sendToServer(data);

        if(success === 503) return navigate('/server-error')
        if(success) onSignedup(); 
    }

    const isAuthenticated = checkSession();
    if(isAuthenticated) {
        return (
            <IsAuthenticated location={location} />
        )
    }

    function onSignedup() {
        return navigate('/Sign-in');
    }

    //TODO- use react router's form to handle form
    return (
        <div className="form-wrapper">
            <div className="form-styled">
                <div className="cred-styled">SIGN UP</div>
                <form action={handleSubmit} >
                    <section className="section username-section">
                        <div className="label-styled"><label htmlFor="username" >Username</label></div>
                        <div><input className="input-styled" type="text" name="username" id="username" minLength="5" required="required" autoFocus /></div>
                        <span className="error username-error"></span>
                    </section>
                    <section className="section password-section">
                        <div className="label-styled"><label htmlFor="password">Password</label></div>
                        <div><input className="input-styled" type="password" name="password" id="password" minLength="6" required="required"/></div>
                        <span className="error password-error"></span>
                    </section>
                    <section className="section confirm-password-section">
                        <div className="label-styled"><label htmlFor="confirm-password">Confirm password</label></div>
                        <div><input className="input-styled" type="password" name="confirm-password" id="confirm-password" required="required"/></div>
                        <span className="error confirm-password-error"></span>
                    </section>
                    <section>
                        <div className="signup-button-styled"><button type="submit">Continue</button></div>
                    </section>
                </form>
            </div>
        </div>
    )
}