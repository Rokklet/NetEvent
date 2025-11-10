import React from "react";
import Basicos from "../components/perfil/Basicos";
import { useAuth } from "../context/AuthContext";
import MisEventosParticipante from "../components/perfil/MisEventosParticipante";
import MisEventosOrganizador from "../components/perfil/MisEventosOrganizador";

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  return (
    <>
    <Basicos />

    {role === "participant" && (
      <>
        <MisEventosParticipante />
      </>
    )}

    {role === "organizer" && (
       <MisEventosOrganizador />
    )}
    
    </>
  );
};

export default Perfil;
