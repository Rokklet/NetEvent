import React from "react";
import { Card, Divider , Col, Button, Typography, Space } from "antd";
import "../styles/global.css"

const { Title } = Typography;

const Register: React.FC = () => {
    return(
        <div className="login-container">
            <Card className="login-card">
                <div>
                    <Title level={3}>Registrate</Title>
                    <p className="login-subtitle">Bienvenido de nuevo</p>
                </div>

                <Col>
                    <Space direction="vertical">

                        <p>Si usted o su compañia desea realizar un evento, incribase como un organizador 
                            y atraiga a los entusiastas que desea</p>

                        <Button type="primary" onClick={() => window.location.href = "/registerOrganizador"}>
                            Organizador
                        </Button>

                        <Divider />

                        <p>Si eres un apacionado del Networking y quieres estar al día con las últimas novedades, 
                            incribete como un participante y anotate en todas las charlas para estar al día</p>

                        <Button type="primary" onClick={() => window.location.href = "/registerParticipante"}>
                            Participante
                        </Button>
                    </Space>
                </Col>
            </Card>
        </div>
    );
};

export default Register;