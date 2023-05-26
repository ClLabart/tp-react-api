import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import PropTypes from "prop-types";

/*
 TODO 
    API : 
    evolved from
    evolve into
    se connecter sur un seul navigateur => toucher au token et hook symfony
    
    Front : 
    Mettre router dans require auth

*/

export function RequireAuth({ children }) {
    const user = localStorage.getItem("user");
    let location = useLocation();
    // Used to ensure the refreshToken is called once at a time

    if (user === null) {
        if (location.pathname !== "/login") {
            return <Navigate to="/login" replace={true} />;
        } else {
            return children;
        }
    // } else if (typeof window !== 'undefined') {
    //     // ne s'éxécute qu'à l'ouverture de l'application
    //     return <Navigate to="/login" replace={true} />;
    } else {
        return children;
    }
}

RequireAuth.propTypes = {
    children: PropTypes.node,
};

function App() {
    return (
        <>
            <Router>
                <RequireAuth></RequireAuth>
            </Router>
            <Outlet />
            <footer>
                Corentin LABART - 2023
            </footer>
        </>
    );
}

export default App;
