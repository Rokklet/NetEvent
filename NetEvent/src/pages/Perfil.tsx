import React, { useEffect, useState } from "react";
import { Card, Descriptions, Spin } from "antd";
import  perfilMock  from "../UsuarioTemporal/mockData";

interface PerfilData {
  nombre: string;
  correo: string;
  role: string;
}

const Perfil: React.FC = () => {
    
  const [perfil, setPerfil] = useState<PerfilData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos fetch desde backend
    const timeout = setTimeout(() => {
      setPerfil(perfilMock);
      setLoading(false);
    }, 500); // medio segundo de "latencia"
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Spin style={{ display: "block", margin: "4rem auto" }} />;

  return (
    <Card title="Mi Perfil">
      <Descriptions column={1}>
        <Descriptions.Item label="Nombre">{perfil?.nombre}</Descriptions.Item>
        <Descriptions.Item label="Correo">{perfil?.correo}</Descriptions.Item>
        <Descriptions.Item label="Rol">{perfil?.role}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default Perfil;
