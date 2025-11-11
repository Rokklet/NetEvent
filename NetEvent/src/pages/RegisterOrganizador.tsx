import React, { useState } from "react";
import { Card, Divider , Col, Button, Typography, message,  Form, Input, Upload, Avatar } from "antd";
import { UserOutlined, UploadOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import "../styles/global.css"

const { Title } = Typography;

const RegisterOrganizador: React.FC = () => {
    
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    //Carga local de foto de perfil

    const handleChange = (info: UploadChangeParam) => {
        const file = info.file.originFileObj;
        if (file) {
        const reader = new FileReader();
        reader.onload = () => setImageUrl(reader.result as string);
        reader.readAsDataURL(file);
        }
    };

    const onFinish = async (values: { nombre: string; correo: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, role: "organizer", foto:imageUrl, }),
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

    
    return  (
        
        <Card>
            <div >
                <Title level={3}>Registrate como Organizador</Title>
                <p>Complete sus datos para regsitrarse</p>
            </div>

            <Divider/>

            <Form layout="vertical" onFinish={onFinish}>
                    
                <div style={{ textAlign: "center", marginBottom: 16 }}>
                    <Avatar
                    size={100}
                    src={imageUrl || undefined}
                    icon={!imageUrl && <UserOutlined />}
                    className="avatar-preview"
                    />
                    <Col>
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false} 
                            onChange={handleChange}
                            >
                            <Button icon={<UploadOutlined />}>Subir foto</Button>
                        </Upload>
                    </Col>
                    
                </div>

                <Form.Item 
                    label="Nombre completo"
                    name="nombre"
                    rules={[{ required: true, message:"Ingresa tu nombre completo"}]}
                    >
                    <Input prefix={<UserOutlined />} placeholder="NetEvent" />
                </Form.Item>

                <Form.Item 
                    label="Descripción"
                    name="descripcion"
                    rules={[{ required: true, message: "Ingresa tu descripcion"}]}
                    >
                    <Input prefix={<UserOutlined />} placeholder="Descripción de tu empresa" />
                </Form.Item>

                <Form.Item 
                    label="Corre Electronico"
                    name="correo"
                    rules={[{ required: true, message: "Ingresa tu correo"}]}
                    >
                    <Input prefix={<MailOutlined />} placeholder="Contacto@netevent.com.ar" />
                </Form.Item>
            
                <Form.Item 
                    label="Contraseña"
                    name="password"
                    rules={[{ required: true, message: "Ingresa una contraseña"}]}
                    >
                    <Input prefix={<LockOutlined />} placeholder="*********" />
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

export default RegisterOrganizador;