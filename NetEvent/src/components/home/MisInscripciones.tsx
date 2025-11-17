import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";

const MisInscripciones: React.FC = () => {
  const { user } = useAuth();
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== "participant") {
      setLoading(false);
      return;
    }

    const cargarEventos = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/eventos/usuario/inscripto", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setEventos(data);
      } catch (err: any) {
        message.error("Error cargando tus inscripciones");
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, [user]);

  if (loading) return <Spin />;

  if (!user || user.role !== "participant")
    return <p>Solo los participantes pueden ver sus inscripciones.</p>;

  return (
    <Card title="Mis Inscripciones">
      {eventos.length === 0 ? (
        <p>No estás inscripto a ningún evento.</p>
      ) : (
        eventos.map((ev) => (
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

export default MisInscripciones;
