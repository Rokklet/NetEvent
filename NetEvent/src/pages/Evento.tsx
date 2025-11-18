import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  message,
  Row,
  Col,
  Divider,
  Typography,
  Tag,
  Table,
  Space,
} from "antd";
import { useAuth } from "../context/AuthContext";
import ViewEventCarousel from "../components/events/ViewEventCarousel";

const { Title, Paragraph } = Typography;

const Evento: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [evento, setEvento] = useState<any>(null);
  const [inscripto, setInscripto] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await fetch(`http://localhost:5000/api/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setEvento(data);

      if (data && data.inscriptos && userId && data.inscriptos.includes(userId)) {
        setInscripto(true);
      }
    };

    fetchEvento();
  }, [id]);

  const inscribirse = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/eventos/inscribir/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await res.json();

    if (res.ok) {
      setInscripto(true);
      message.success("Te inscribiste correctamente");
    } else {
      message.error(data.message || "Error al inscribirse");
    }
  };

  const descargarPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/eventos/${id}/inscriptos/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        return message.error("No se pudo descargar el PDF");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `inscriptos-${id}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Error al descargar PDF");
    }
  };

  if (!evento) return <p>Cargando...</p>;

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

        <Space>
          {/* Botón de inscripción */}
          {user?.role === "participant" && (
            <Button
              type={inscripto ? "default" : "primary"}
              disabled={inscripto}
              onClick={!inscripto ? inscribirse : undefined}
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
