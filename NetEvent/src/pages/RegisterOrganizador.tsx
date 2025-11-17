import React, { useState } from "react";
import {
  Card,
  Divider,
  Col,
  Button,
  Typography,
  message,
  Form,
  Input,
  Upload,
  Avatar,
  Flex,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import "../styles/global.css";

const { Title } = Typography;

const RegisterOrganizador: React.FC = () => {
  // Guarda la imagen cargada localmente como URL base64
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Control el estado de carga (loading) durante el envío del formulario
  const [loading, setLoading] = useState(false);

  
  const handleChange = (info: UploadChangeParam) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  /**
   * Envía los datos del formulario al backend para registrar un organizador.
   * Hace una petición POST al endpoint `/api/auth/register`.
   * En caso de éxito, muestra un mensaje y redirige al login.
   */
  const onFinish = async (values: {
    nombre: string;
    correo: string;
    password: string;
    descripcion?: string;
  }) => {
    setLoading(true);
    try {
      // Envío de la información al servidor
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          role: "organizer", // Fija el rol en "organizer"
          foto: imageUrl, // Incluye la imagen si fue cargada
        }),
      });

      const data = await response.json();

      // Control de errores HTTP
      if (!response.ok) throw new Error(data.message || "Error al registrarse");

      message.success("Registro exitoso. Ahora puedes iniciar sesión.");
      window.location.href = "/login";
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
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
          size="small"
          block
          htmlType="submit"
          loading={loading}
        >
          Registrate
        </Button>
      </Form>
    </Card>
  );
};

export default RegisterOrganizador;
