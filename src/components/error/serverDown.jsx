import { NavLink } from "react-router"

import "../styles/error.css"

export default function ErrorPage() {
    return (
        <>
            <main className="error-main">
                <div className="error-styled">
                    <h1>Server down</h1>
                    <p>Something went wrong. please try again later.</p>
                    <div><NavLink to="/" className="homepage-error">Back to Homepage</NavLink></div>
                </div>
            </main>
        </>
    )
}