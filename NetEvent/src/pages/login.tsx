import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import "../styles/global.css"

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);

   const onFinish = async (values: { correo: string; password: string }) => {
    setLoading(true);
     try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("nombre", data.nombre);

      message.success(`Bienvenido, ${data.nombre}`);

       // Redirige según el rol
      if (data.role === "organizer") {
        window.location.href = "/home";
      } else {
        window.location.href = "/home";
      }

       } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-title">
          <Title level={3}>Iniciar sesión</Title>
          <p className="login-subtitle">Bienvenido de nuevo</p>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Correo electrónico"
            name="correo"
            rules={[{ required: true, message: "Ingresa tu correo" }]}
          >
            <Input size="large" prefix={<MailOutlined />} placeholder="correo@empresa.com" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Ingresa tu contraseña" }]}
          >
            <Input.Password size="large" prefix={<LockOutlined />} placeholder="••••••" />
          </Form.Item>

          <Divider />

          <Button type="primary" size="large" htmlType="submit" block loading={loading}>
            Ingresar
          </Button>

          <Divider />
        
          <Button type="primary" size="large" block onClick={() => window.location.href = "/register"}>
            Registrate
          </Button>

          <Divider />

          <div className="login-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
