import React, { useState } from "react";
import { Card, Divider , Col, Button, Typography,  Form, Input, Upload, Avatar } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import type { UploadChangeParam } from "antd/es/upload";
import MainLayout from "../layouts/MainLayout"
import "../styles/global.css"

const { Title } = Typography;

const RegisterParticipante: React.FC = () => {

     const [imageUrl, setImageUrl] = useState<string | null>(null);
    
        //Carga local de foto de perfil
    
        const handleChange = (info: UploadChangeParam) => {
            const file = info.file.originFileObj;
            if (file) {
            const reader = new FileReader();
            reader.onload = () => setImageUrl(reader.result as string);
            reader.readAsDataURL(file);
            }
        };
    
    return (
        <MainLayout>
            <Card>
                <div>
                    <Title level={3}>Registrate</Title>
                    <p>Complete con sus datos para regsitrarse</p>
                </div>

                <Divider/>

                <Form layout="vertical">
                     
                    <div>
                        <Avatar
                        size={100}
                        src={imageUrl || undefined}
                        icon={!imageUrl && <UserOutlined />}
                        className="avatar-preview"
                        />
                        <Col>
                            <Upload
                                showUploadList={false}
                                beforeUpload={() => false} // Evita subir al servidor por ahora
                                onChange={handleChange}
                                >
                                <Button icon={<UploadOutlined />}>Subir foto</Button>
                            </Upload>
                        </Col>
                        
                    </div>

                    <Form.Item label="Nombre completo">
                        <Input prefix={<UserOutlined />} placeholder="Juan Carlos Lopez" />
                    </Form.Item>

                    <Form.Item label="Corre Electronico">
                        <Input prefix={<UserOutlined />} placeholder="Contacto@netevent.com.ar" />
                    </Form.Item>
                
                    <Form.Item label="Contraseña">
                        <Input prefix={<UserOutlined />} placeholder="*********" />
                    </Form.Item>

                    <Button type="primary" size="large" block onClick={() => window.location.href = "/home"}>
                        Registrate
                    </Button>

                </Form>

            </Card>
        </MainLayout>
    );
};

export default RegisterParticipante;