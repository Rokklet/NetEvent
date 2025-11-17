import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import RegisterParticipante from "../pages/RegisterParticipante";
import RegisterOrganizador from "../pages/RegisterOrganizador";
import Perfil from "../pages/Perfil";
import LayoutSelector from "../components/LayoutSelector";
import PublicarEvento from "../pages/PublicarEvento";
import Evento from "../pages/Evento";

const AppRouter: React.FC = () => (
  <Routes>
    {/* Rutas */}
    <Route path="/home" element={<LayoutSelector><Home /></LayoutSelector>} />
    <Route path="/login" element={<LayoutSelector><Login /></LayoutSelector>} />
    <Route path="/register" element={<LayoutSelector><Register /></LayoutSelector>} />
    <Route path="/registerParticipante" element={<LayoutSelector><RegisterParticipante /></LayoutSelector>} />
    <Route path="/registerOrganizador" element={<LayoutSelector><RegisterOrganizador /></LayoutSelector>} />
    <Route path="/perfil" element={<LayoutSelector><Perfil /></LayoutSelector>} />
    <Route path="/nuevoevento" element={<LayoutSelector><PublicarEvento /></LayoutSelector>}/>
    <Route path="/evento/:id" element={<LayoutSelector><Evento /></LayoutSelector>} />

    {/* Redirección */}
    <Route path="/" element={<Navigate to="/home" replace />} />
  </Routes>
);

export default AppRouter;
