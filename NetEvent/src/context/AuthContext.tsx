import React, { createContext, useContext, useState, useEffect } from "react";


export type Role = "organizer" | "participant" | "guest";

interface User {
  nombre: string;
  correo?: string;
  role: Role;
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
    const nombre = localStorage.getItem("nombre");
    const role = (localStorage.getItem("role") as Role) || "guest";

    if (nombre && role) {
      setUser({ nombre, role });
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


