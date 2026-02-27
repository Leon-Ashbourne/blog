import { NavLink } from "react-router"

import "../styles/error.css"

export default function ErrorPage() {
    return (
        <>
            <main className="error-main">
                <div className="error-styled">
                    <h1>Error</h1>
                    <p>The content no longer available.</p>
                    <div><NavLink to="/" className="homepage-error">Back to Homepage</NavLink></div>
                </div>
            </main>
        </>
    )
}