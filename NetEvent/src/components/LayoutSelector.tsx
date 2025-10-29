import React from "react";
import MainLayout from "../layouts/MainLayout";
import OrganizadorLayout from "../layouts/OrganizardorLayout";
import { useAuth } from "../context/AuthContext";

const LayoutSelector: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
console.log("ROL DETECTADO:", user?.role);  



  switch (user?.role) {
    case "organizer":
      return <OrganizadorLayout>{children}</OrganizadorLayout>;
    //case "participant":
          //return <ParticipantLayout>{children}</ParticipantLayout>;
      default:
      return <MainLayout>{children}</MainLayout>;
  }
};

export default LayoutSelector;
