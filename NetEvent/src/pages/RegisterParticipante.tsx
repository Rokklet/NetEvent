import React, { useState } from "react";
import {
  Card,
  Divider,
  Col,
  Button,
  Typography,
  Form,
  Input,
  Flex,
  Avatar,
  message,
} from "antd";
import { UserOutlined, UploadOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import "../styles/global.css";

const { Title } = Typography;

const RegisterParticipante: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (info: UploadChangeParam) => {
    const file = info.file.originFileObj;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onFinish = async (values: { 
    nombre: string; 
    correo: string; 
    password: string 
  }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values, 
          role: "participant",
          foto: imageUrl,
        }),
      });

      const data = await response.json();

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
    <Card className="register-card">
      <div>
        <Title level={3}>Registrate como Participante</Title>
        <p>Completa tus datos para crear tu cuenta</p>
      </div>

      <Divider />

      <Form layout="vertical" onFinish={onFinish}>
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

        <Form.Item
          label="Nombre completo"
          name="nombre"
          rules={[{ required: true, message: "Ingresa tu nombre completo" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Juan Carlos Lopez" />
        </Form.Item>

        <Form.Item
          label="Correo electrónico"
          name="correo"
          rules={[{ required: true, message: "Ingresa tu correo" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="contacto@empresa.com" />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Ingresa tu contraseña" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="*********" />
        </Form.Item>

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
  );
};

export default RegisterParticipante;
