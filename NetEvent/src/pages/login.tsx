import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <Title level={3}>Iniciar sesión</Title>
          <p style={{ color: "#888" }}>Bienvenido de nuevo</p>
        </div>

        <Form layout="vertical">
          <Form.Item label="Correo electrónico">
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder="correo@empresa.com"
            />
          </Form.Item>

          <Form.Item label="Contraseña">
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="••••••"
            />
          </Form.Item>

          <Button type="primary" size="large" block>
            Ingresar
          </Button>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
