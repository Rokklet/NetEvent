import React, { useEffect, useState } from "react";
import { Card , Space , Descriptions , Avatar , Spin} from "antd";
import { UserOutlined } from '@ant-design/icons';
import  perfilMock  from "../../UsuarioTemporal/mockData";

interface PerfilData {
  nombre: string;
  correo: string;
  role: string;
}


const Basicos: React.FC = () => {

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
    <Space direction="horizontal">
        <Avatar size={128} icon={<UserOutlined />} />
        
            <Descriptions column={1}>
                <Descriptions.Item label="Nombre">{perfil?.nombre}</Descriptions.Item>
                <Descriptions.Item label="Correo">{perfil?.correo}</Descriptions.Item>
                <Descriptions.Item label="Rol">{perfil?.role}</Descriptions.Item>
            </Descriptions>

    </Space>
  </Card>
);
};

export default Basicos;