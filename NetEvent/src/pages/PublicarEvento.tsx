import React, { useState } from "react";
import {
  Input,
  Flex,
  Card,
  Row,
  Col,
  Divider,
  Typography,
  Button,
  Space,
  DatePicker,
  message
} from "antd";
import NewEventCarousel from "../components/events/NewEventCarousel";
import NewEventTagSelector from "../components/events/NewEventTagSelector";
import NewEventNewCharla from "../components/events/NewEventNewCharla";

const { TextArea } = Input;
const { Title } = Typography;

const PublicarEvento: React.FC = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fecha, setFecha] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [charlas, setCharlas] = useState<any[]>([
    { id: Date.now(), persona: "", titulo: "", inicio: "", fin: "" }
  ]);

  

  const agregarCharla = () => {
    setCharlas((prev) => [
      ...prev,
      { id: Date.now(), persona: "", titulo: "", inicio: "", fin: "" }
    ]);
  };

  const quitarCharla = (id: number) => {
    setCharlas((prev) => prev.filter((c) => c.id !== id));
  };

  const actualizarCharla = (id: number, campo: string, valor: string) => {
    setCharlas((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [campo]: valor } : c))
    );
  };

  

  const publicarEvento = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return message.error("No estás autenticado");

      if (!titulo.trim()) return message.error("El evento necesita un título");
      if (!descripcion.trim())
        return message.error("Debe agregar una descripción");
      if (!fecha) return message.error("Debe seleccionar una fecha");

      const evento = {
        titulo,
        descripcion,
        fecha,
        ubicacion,
        tags,
        imagenes,
        charlas
      };

      console.log("EVENTO A ENVIAR:", evento);

      const response = await fetch("http://localhost:5000/api/eventos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(evento)
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al publicar el evento");

      message.success("Evento publicado con éxito");
      window.location.href = "/home";
    } catch (err: any) {
      message.error(err.message);
    }
  };

  

  return (
    <Card title="Publicar Nuevo Evento">
      <Flex vertical gap="15px">
        <NewEventCarousel onImagesChange={setImagenes} />

        <Input
          placeholder="Título del Evento"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <Row>
          <Col flex={3}>
            <TextArea
              placeholder="Descripción"
              showCount
              maxLength={250}
              style={{ height: 150, resize: "none" }}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <br />
            <DatePicker
              style={{ width: "100%" }}
              onChange={(d) => setFecha(d ? d.toISOString() : "")}
            />
          </Col>

          <Divider type="vertical" />

          <Col flex={2}>
            <Input
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
            />
            <br />
            <NewEventTagSelector onChange={setTags} />
          </Col>
        </Row>

        <Divider />

        <Title level={4}>Agenda del Evento</Title>

        <Space direction="vertical" style={{ width: "100%" }}>
          {charlas.map((c) => (
            <NewEventNewCharla
              key={c.id}
              id={c.id}
              onRemove={quitarCharla}
              onChange={actualizarCharla}
            />
          ))}

          <Button
            type="dashed"
            icon={<span style={{ fontSize: 18 }}>+</span>}
            onClick={agregarCharla}
            block
          >
            Agregar charla
          </Button>
        </Space>

        <Divider />

        <Button
          type="primary"
          size="large"
          block
          onClick={publicarEvento}
          style={{ marginTop: 20 }}
        >
          Publicar evento
        </Button>

      </Flex>
    </Card>
  );
};

export default PublicarEvento;
