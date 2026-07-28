import React, { useState } from "react";
import {
  Card,
  Divider,
  Button,
  Typography,
  message,
  Form,
  Input,
  Avatar,
  Flex,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import "../styles/global.css";
import { registrarse } from "../services/AuthService";

const { Title } = Typography;

const RegisterOrganizador: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: {
    nombre: string;
    correo: string;
    password: string;
    descripcion?: string;
  }) => {
    setLoading(true);
    try {
      
      await registrarse(values, imageUrl, "organizer");

      await  messageApi.success("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "/login";
    } catch (error) {
      const mes = error instanceof Error ? error.message : "Error al inciar sesión";
      messageApi.error(mes);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card>
        {contextHolder}
        <div>
          <Title level={3}>Registrate como Organizador</Title>
          <p>Complete sus datos para registrarse</p>
        </div>

        <Divider />

        {/* Formulario principal */}
        <Form layout="vertical" onFinish={onFinish}>
          {/* Sección de foto de perfil */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
              <Flex vertical align="center">

                  <Avatar
                      size={100}
                      src={imageUrl || undefined}
                      icon={!imageUrl && <UserOutlined />}
                      className="avatar-preview"
                      style={{ marginBottom: 10, border: "2px solid #f0f0f0" }}
                  />

                  <Button
                      icon={<UploadOutlined />}
                      onClick={() => {
                      const input = document.createElement("input");
                      input.type = "file";
                      input.accept = "image/*";
                      input.onchange = (e: any) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onloadend = () => {
                          setImageUrl(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                      };
                      input.click();
                      }}
                  >
                      Subir foto
                  </Button>
              </Flex>
              
          </div>



          {/* Campos del formulario */}
          <Form.Item
            label="Nombre completo"
            name="nombre"
            rules={[{ required: true, message: "Ingresa tu nombre completo" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="NetEvent" />
          </Form.Item>

          <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: true, message: "Ingresa tu descripción" }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Descripción de tu empresa o institución"
            />
          </Form.Item>

          <Form.Item
            label="Correo Electrónico"
            name="correo"
            rules={[{ required: true, message: "Ingresa tu correo electrónico" }]}
          >
            <Input prefix={<MailOutlined />} placeholder="contacto@empresa.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingresa una contraseña" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="*********" />
          </Form.Item>

          {/* Botón principal de registro */}
          <Button
            type="primary"
            size="large"
            block
            htmlType="submit"
            loading={loading}
          >
            Registrate
          </Button>
        </Form>
      </Card>
    </div>                
  );
};

export default RegisterOrganizador;
