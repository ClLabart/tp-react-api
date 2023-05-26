import React, { useState } from "react";
import LoginForm from "../../Component/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();
    const [formSubmitting, setFormSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (credentials) => {
        let error = false;
        setFormSubmitting(true);
        try {
            await fetch("https://localhost:8000/api/login_check", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: credentials.login,
                    password: credentials.password,
                }),
            })
                .then((res) => {
                    if (!res.ok) {
                        error = true;
                    }
                    return res.json();
                })
                .then((data) => {
                    if (error == true) {
                        setErrorMessage(data.message);
                        return error = false;
                    }
                    localStorage.setItem("user", data.token);
                    return navigate("/");
                });
        } catch (error) {
            throw new error();
        } finally {
            setFormSubmitting(false);
        }
    };

    return (
        <div className="login">
            <header>
                <h1>App pokemons</h1>
            </header>
            {formSubmitting ? (
                <div className="loader"></div>
            ) : (
                <main>
                    <LoginForm handleSubmit={handleSubmit} />
                </main>
            )}
            {errorMessage !== "" ? errorMessage : ""}
        </div>
    );
};

export default LoginPage;
