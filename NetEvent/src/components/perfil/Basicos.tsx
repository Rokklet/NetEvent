import React from "react";
import { Card , Space , Descriptions , Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';
//import  perfilMock  from "../../UsuarioTemporal/mockData";
import { useAuth } from "../../context/AuthContext";

const Basicos: React.FC = () => {

    const { user } = useAuth();

return (
  <Card title="Mi Perfil">
    <Space direction="horizontal">
        <Avatar size={128} icon={<UserOutlined />} />
        
            <Descriptions column={1}>
                <Descriptions.Item label="Nombre">{user?.nombre}</Descriptions.Item>
                <Descriptions.Item label="Correo">{user?.correo}</Descriptions.Item>
                <Descriptions.Item label="Rol">{user?.role}</Descriptions.Item>
            </Descriptions>

    </Space>
  </Card>
);
};

export default Basicos;