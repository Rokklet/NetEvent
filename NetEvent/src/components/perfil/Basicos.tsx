import React from "react";
import { Card , Space , Descriptions , Avatar, Divider, Row, Col} from "antd";
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from "../../context/AuthContext";

const Basicos: React.FC = () => {

    const { user } = useAuth();

return (
  <Card title="Mi Perfil">
    <Col>
      <Space direction="horizontal">
          <Avatar
            size={128}
            src={user?.foto || undefined}
            icon={!user?.foto && <UserOutlined />}
          />
      
          <Descriptions column={1}>
              <Descriptions.Item label="Nombre">{user?.nombre}</Descriptions.Item>
              <Descriptions.Item label="Correo">{user?.correo}</Descriptions.Item>
          </Descriptions>

      </Space>

      {user?.role === "organizer" && (
        <>
          <Divider />

          <Card title="Descripción">
            <Descriptions>
                <Descriptions.Item> {user?.descripcion}</Descriptions.Item>
            </Descriptions>
            
          </Card>
        </>
        
      )}

    </Col>
    
  </Card>
);
};

export default Basicos;