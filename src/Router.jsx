import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home/Home";
import Login from "./Page/Login/LoginPage";
import Pokemon from "./Page/Pokemon/Pokemon";
import PropTypes from "prop-types";

const Router = ({ children }) => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={<Login />} />
                    <Route index element={<Home />} />
                    <Route path="pokemon/:id" element={<Pokemon />} />
                </Routes>
                {children}
            </BrowserRouter>
        </>
    );
};

Router.propTypes = {
    children: PropTypes.node,
};

export default Router;
