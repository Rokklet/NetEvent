import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import RegisterParticipante from "../pages/RegisterParticipante";
import RegisterOrganizador from "../pages/RegisterOrganizador";


const AppRouter: React.FC = () => (
     <BrowserRouter>
        <Routes>
            {/*Rutas*/}
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />}/>
            <Route path="/registerParticipante" element={<RegisterParticipante />}/>
            <Route path="/registerOrganizador" element={<RegisterOrganizador />}/>
            
            {/*Redirects*/}
            <Route path="/" element={<Navigate to="/home" replace/>} />

        </Routes>
     </BrowserRouter>
);

export default AppRouter;