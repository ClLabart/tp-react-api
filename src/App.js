import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import "./App.css";
import Router from "./Router";

// eslint-disable-next-line react/prop-types
export function RequireAuth({ children }) {
    // Used to ensure the refreshToken is called once at a time
    const user = localStorage.getItem("user"); // TODO Get user from local storage

    if (user === null) {
        if (window.location.pathname !== "/login") {
            return <Navigate to="/login" replace={true} />;
        } else {
            return children;
        }
    } else {
        return children;
    }
}

function App() {
    //Navigation dans requireAuth
    return (
        //TODO ROUTER
        <>
            <Router>
                <RequireAuth></RequireAuth>
            </Router>
            <Outlet />
        </>
    );
}

export default App;
