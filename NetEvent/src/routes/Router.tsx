import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";

const AppRouter: React.FC = () => (
    
        <Routes>
            {/*Rutas*/}
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />

            {/*Redirects*/}
            <Route path="/" element={<Navigate to="/home" replace/>} />

        </Routes>
    
);

export default AppRouter;