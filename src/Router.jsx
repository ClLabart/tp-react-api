import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/LoginPage";

// eslint-disable-next-line react/prop-types
const Router = ({ children }) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route index element={<Home />} />
                </Routes>
                { children }
            </BrowserRouter>
        </>
    );
};

export default Router;