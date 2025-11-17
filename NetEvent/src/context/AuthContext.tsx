import React, { createContext, useContext, useState, useEffect } from "react";

export type Role = "organizer" | "participant" | "guest";

interface User {
  _id: string;  
  nombre: string;
  correo?: string;
  role: Role;
  foto?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
  const _id = localStorage.getItem("userId");
  const nombre = localStorage.getItem("nombre");
  const correo = localStorage.getItem("correo");
  const role = (localStorage.getItem("role") as Role) || "guest";
  const foto = localStorage.getItem("foto");

  if (_id && nombre && role) {
    setUser({
      _id,
      nombre,
      correo: correo || "",
      role,
      foto: foto || ""
    });
  }
}, []);


  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
};
