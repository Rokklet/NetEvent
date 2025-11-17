import React, { useEffect, useState } from "react";
import { Input, Card, Spin, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import EventCard from "../events/EventCard";

const BuscadorEventos: React.FC = () => {
  const [busqueda, setBusqueda] = useState("");
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/eventos");
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setEventos(data);
      } catch (err) {
        message.error("Error cargando eventos");
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  const filtrados = eventos.filter((ev) => {
    const texto = busqueda.toLowerCase();

    return (
      ev.titulo.toLowerCase().includes(texto) ||
      ev.tags.some((tag: string) => tag.toLowerCase().includes(texto))
    );
  });

  return (
    <Card title="Buscar eventos">
      <Input
        prefix={<SearchOutlined />}
        placeholder="Buscar por nombre o categoría"
        size="large"
        allowClear
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ marginBottom: 20 }}
      />

      {loading ? (
        <Spin />
      ) : busqueda.length === 0 ? (
        <p>Escribe algo para buscar por nombre o categoría.</p>
      ) : filtrados.length === 0 ? (
        <p>No se encontraron eventos con ese criterio.</p>
      ) : (
        filtrados.map((ev) => (
          <EventCard
            key={ev._id}
            id={ev._id}
            titulo={ev.titulo}
            fecha={new Date(ev.fecha).toLocaleDateString()}
            ubicacion={ev.ubicacion}
            categorias={ev.tags}
            organizadorLogo={ev.organizador?.foto}
            organizadorNombre={ev.organizador?.nombre}
          />
        ))
      )}
    </Card>
  );
};

export default BuscadorEventos;
