import "./styles/load.css";

export default function Loader() {
    return (
        <div className="loader-wrapper container">
            <div className="styled-loader"></div>
            <div>We ask for your patience while we connect to the server.</div>
        </div>
    )
}