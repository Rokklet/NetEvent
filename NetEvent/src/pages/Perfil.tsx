import React from "react";
import Basicos from "../components/perfil/Basicos";
import { useAuth } from "../context/AuthContext";
import MisInscripciones from "../components/home/MisInscripciones";
import MisEventosPublicados from "../components/home/MisEventosPublicados";

const Perfil: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  return (
    <>
    <Basicos />

    {role === "participant" && (
      <>
        <MisInscripciones />
      </>
    )}

    {role === "organizer" && (
       <MisEventosPublicados />
    )}
    
    </>
  );
};

export default Perfil;
