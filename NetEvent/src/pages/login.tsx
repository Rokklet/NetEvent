import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message, Divider } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import "../styles/global.css";

const { Title } = Typography;

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
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

      // Guarda token y usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("nombre", data.user.nombre);
      localStorage.setItem("correo", data.user.correo);

      // Actualiza el contexto global
      setUser({
        nombre: data.user.nombre,
        correo: data.user.correo,
        role: data.user.role,
      });

      message.success(`Bienvenido, ${data.user.nombre}`);

      // Redirección según rol
      if (data.user.role === "organizer") {
        window.location.href = "/home";
      } else if (data.user.role === "participant") {
        window.location.href = "/home";
      } else {
        window.location.href = "/";
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

          <Button
            type="default"
            size="large"
            block
            onClick={() => (window.location.href = "/register")}
          >
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
