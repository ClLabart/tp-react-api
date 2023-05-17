import React, { useState } from "react";
import LoginForm from "../../Component/LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

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
        <div>
            {formSubmitting ? (
                <p>Loading</p>
            ) : (
                <LoginForm handleSubmit={handleSubmit} />
            )}
            {errorMessage !== "" ? errorMessage : ""}
        </div>
    );
};

export default LoginPage;
