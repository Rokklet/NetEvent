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
import { publicarEvento } from "../services/EventService";

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
  const [messageApi, contextHolder] = message.useMessage();

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


  const publicar = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Debes iniciar sesión para publicar este evento")
      
      const evento = {titulo, descripcion, fecha, ubicacion, tags, imagenes, charlas};

      await publicarEvento(evento, token);

      await messageApi.success("Evento publicado con éxito");
      window.location.href = "/home";
      
    } catch (error) {
      const mes = error instanceof Error ? error.message : "Error al inciar sesión";
      messageApi.error(mes);
    }
  };

  return (
    <Card title="Publicar Nuevo Evento">
      {contextHolder}
      <Flex vertical gap="15px">
        <div style={{ maxHeight: '400px', paddingRight: '8px' }}>
          <NewEventCarousel onImagesChange={setImagenes} />
        </div>
        <Input
          placeholder="Título del Evento"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          style={{width: "60%"}}
        />

        <Row>
          <Col flex={3}>
            <TextArea
              placeholder="Descripción"
              showCount
              maxLength={250}
              style={{ height: 150, resize: "none", margin: "10px" }}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <br />
            <DatePicker
              style={{ width: "100%", margin: "10px" }}
              onChange={(d) => setFecha(d ? d.toISOString() : "")}
            />
          </Col>

          <Divider type="vertical" />

          <Col flex={2}>
            <Input
              placeholder="Ubicación"
              value={ubicacion}
              onChange={(e) => setUbicacion(e.target.value)}
              style={{ margin: "10px"}}
              required
            />
            <br />
            <NewEventTagSelector onChange={setTags}  />
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
          onClick={publicar}
          style={{ marginTop: 20, width: "60%", margin: "20px auto 0"}}
        >
          Publicar evento
        </Button>

      </Flex>
    </Card>
  );
};

export default PublicarEvento;
