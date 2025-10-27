import React from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import MainLayout from "../layouts/MainLayout"
import "../styles/global.css"

const { Title } = Typography;

const Login: React.FC = () => {
  return (
    <MainLayout>
    <div className="login-container">
      <Card className="login-card">
        <div className="login-title">
          <Title level={3}>Iniciar sesión</Title>
          <p className="login-subtitle">Bienvenido de nuevo</p>
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
        
          <Button type="primary" size="large" block onClick={() => window.location.href = "/register"}>
            Registrate
          </Button>

          <div className="login-forgot">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </Form>
      </Card>
    </div>
  </MainLayout>
  );
};

export default Login;
