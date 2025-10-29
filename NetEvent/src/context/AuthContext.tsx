import React, { createContext, useContext, useState, useEffect } from "react";
import perfilMock from "../UsuarioTemporal/mockData";

export type Role = "organizer" | "participant" | "guest";

interface User {
  nombre: string;
  correo: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  

  useEffect(() => {
    const timeout = setTimeout(() => setUser(perfilMock), 500);
    return () => clearTimeout(timeout);
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};

export { AuthProvider, useAuth };

