import React from 'react';
import LoginForm from "../../Component/LoginForm/LoginForm";
//import { useState } from "react";
//import { Navigate } from "react-router-dom";

const LoginPage = () => {
    //const [formSubmitting, setFormSubmitting] = useState(false);
    const handleSubmit = async (credentials) => {
        //setFormSubmitting(true);
        try {
            //TODO Make Login call
            await fetch("https://localhost:8000/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: credentials.login,
                    password: credentials.password,
                }),
            })
                .then((response) => response.json())
                .then((data) => localStorage.setItem("user", data.token));
        } catch (error) {
            throw new error;
            // message
        } finally {
            //setFormSubmitting(false);
            // TODO redirect to /
            //return <Navigate to="/" replace={true} />;
        }
    };

    return (
        <div>
            <LoginForm handleSubmit={handleSubmit} />
        </div>
    );
};

export default LoginPage;
