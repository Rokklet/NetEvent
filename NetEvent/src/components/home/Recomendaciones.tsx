import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";

const Recomendaciones: React.FC = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/eventos");
        const data = await response.json();

        if (!response.ok) throw new Error(data.message);

        setEventos(data);
      } catch (err: any) {
        message.error("Error cargando eventos");
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  if (loading) return <Spin />;

  return (
    <Card title="Recomendaciones">
      {eventos.map((ev) => (
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
      ))}
    </Card>
  );
};

export default Recomendaciones;
