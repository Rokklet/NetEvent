import React from "react";
import MainLayout from "../layouts/MainLayout";
import OrganizadorLayout from "../layouts/OrganizardorLayout";
import ParticipantLayout from "../layouts/ParticipanteLayout.tsx";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const LayoutSelector: React.FC<Props> = ({ children }) => {
  
  const { user } = useAuth();
  console.log("ROL DETECTADO:", user?.role);  

  const role = user?.role || "guest";

  switch (role) {
    case "organizer":
      return <OrganizadorLayout>{children}</OrganizadorLayout>;
      case "participant":
          return <ParticipantLayout>{children}</ParticipantLayout>;
      default:
      return <MainLayout>{children}</MainLayout>;
  }
};

export default LayoutSelector;
