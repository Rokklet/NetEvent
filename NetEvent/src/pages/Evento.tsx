import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {  Card,Button,message,Row,Col,Divider,Typography,Tag,Table,Space,Result,} from "antd";
import { useAuth } from "../context/AuthContext";
import ViewEventCarousel from "../components/events/ViewEventCarousel";
import CommentSection from "../components/events/CommentSection";
import { inscribirUsuario, traerEvento } from "../services/EventService";
import { obtenerPDF, verificarInscripcion } from "../services/InscriptionService";

const { Title, Paragraph } = Typography;

const Evento: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  const [evento, setEvento] = useState<any>(null);
  const [inscripto, setInscripto] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();


  useEffect(() => {

    if(!id) return;

    const fetchEvento = async () => {
      try{
        const data = await traerEvento(id);
        setEvento(data);
      }catch(error){
        const mes = error instanceof Error ? error.message : "No se pudo cargar el evento";
        messageApi.error(mes);
      }
    };

    const consultarInscripcion = async () => {
      if (user?.role !== "participant") {
        setInscripto(false);
        return
      }

      const token = localStorage.getItem("token");

      if (!token){
        setInscripto(false);
        return
      }

      try{
        const estado = await verificarInscripcion(token, id);
        setInscripto(estado);
      }catch(error){
        const mes = error instanceof Error ? error.message : "No se puede verificar la inscripción";
        messageApi.error(mes);
      };
    }

    fetchEvento();
    consultarInscripcion();

  }, [id, user?.role]);

  if (!id) {
    return <Result status="404" title="Evento no encontrado" />;
  }

  const suscripcion = async () => {
    const token = localStorage.getItem("token");
      
    if (!token){
      messageApi.error("Debés iniciar sesión");
      return;
    };
    
    try{
      const res = await inscribirUsuario (id, token);

      setInscripto(true);

      messageApi.success(res.message);

    } catch (error) {
      const mes = error instanceof Error ? error.message : "Error al Inscribirte";
      messageApi.error(mes);
    }
  };

  const descargarPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) throw messageApi.error("Error al descargar PDF");

      await obtenerPDF(token, id);

      messageApi.success("Descargando listado de inscriptos")

    } catch (error) {
      const mes = error instanceof Error ? error.message : "Error al descargar PDF";
      messageApi.error(mes);
    }
  };

  if (!evento) return <>{contextHolder} <p>Cargando...</p>;</>

  const esOrganizadorDueño =
    user &&
    user.role === "organizer" &&
    evento.organizador &&
    (evento.organizador._id === user._id || evento.organizador === user._id);

  // Columnas para la tabla (mantener como any para evitar errores de tipado)
  const columnasCharlas: any[] = [
    { title: "Persona", dataIndex: "persona", key: "persona" },
    { title: "Título", dataIndex: "titulo", key: "titulo" },
    { title: "Inicio", dataIndex: "inicio", key: "inicio" },
    { title: "Fin", dataIndex: "fin", key: "fin" },
  ];

  const charlasData = evento.charlas || [];

  return (
    <Card title="Detalles del Evento">
    {contextHolder}  
      <Space direction="vertical" style={{ width: "100%" }} size="large">
          
        <ViewEventCarousel images={evento.imagenes || []} />

        {/* Título */}
        <Title level={2}>{evento.titulo}</Title>
        
        <Row gutter={16}>
          <Col flex={3}>
            <Paragraph>{evento.descripcion}</Paragraph>

            <p>
              <strong>Fecha del evento: </strong>
              {evento.fecha ? new Date(evento.fecha).toLocaleString() : "—"}
            </p>
          </Col>

          <Col flex={1}>
            <p>
              <strong>Ubicación:</strong> {evento.ubicacion || "—"}
            </p>

            <div style={{ marginTop: 10 }}>
              <strong>Categorías:</strong>
              <div style={{ marginTop: 8 }}>
                {(evento.tags || []).map((tag: string) => (
                  <Tag key={tag} style={{ marginBottom: 6 }}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </Col>
        </Row>

        <Divider />

        {/* Charlas: tipamos Table como Table<any> y protegemos rowKey */}
        <Title level={4}>Agenda del Evento</Title>
        <Table<any>
          dataSource={charlasData}
          columns={columnasCharlas}
          rowKey={(c: any) => {
            // si la charla viene como string (por cualquier motivo) devolvemos la string
            if (typeof c === "string") return c;
            // sino construimos key segura
            return `${c.titulo ?? ""}-${c.inicio ?? ""}-${Math.random()
              .toString(36)
              .substr(2, 5)}`;
          }}
          pagination={false}
        />

        <Divider />

          <Title level={4}>Sección de Comentarios</Title>

          <CommentSection />
          
        <Divider />

        <Space>
          {/* Botón de inscripción */}
          {user?.role === "participant" && (
            <Button
              type={inscripto ? "default" : "primary"}
              disabled={inscripto}
              onClick={!inscripto ? suscripcion : undefined}
            >
              {inscripto ? "Ya inscripto" : "Inscribirme"}
            </Button>
          )}

          {/* Botón PDF para organizador dueño */}
          {esOrganizadorDueño && (
            <Button onClick={descargarPDF}>Descargar lista PDF</Button>
          )}
        </Space>
      </Space>
    </Card>
  );
};

export default Evento;
