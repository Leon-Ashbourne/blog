import { Outlet, Navigate } from "react-router";

export default function IsAuthenticated() {
    const token = localStorage.getItem("Token");
    //todo- add a fetch api to authenticate with server;
    return (
        (token && typeof token !== 'undefined' && typeof token === 'string') ? <Outlet /> : <Navigate to="/Sign-in"></Navigate>
    )
}