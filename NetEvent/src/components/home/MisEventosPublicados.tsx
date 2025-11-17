import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";

const MisEventosPublicados: React.FC = () => {
  const { user } = useAuth();

  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:5000/api/eventos/mis-eventos", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setEventos(data);
      } catch (err) {
        message.error("Error cargando tus eventos publicados");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "organizer") {
      cargar();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Spin />;

  return (
    <Card title="Mis eventos publicados">
      {eventos.length === 0 ? (
        <p>No tenés eventos publicados.</p>
      ) : (
        eventos.map((ev) => (
          <EventCard
            key={ev._id}
            id={ev._id}
            titulo={ev.titulo}
            fecha={new Date(ev.fecha).toLocaleDateString()}
            ubicacion={ev.ubicacion}
            categorias={ev.tags}
            organizadorLogo={user?.foto}
            organizadorNombre={user?.nombre}
          />
        ))
      )}
    </Card>
  );
};

export default MisEventosPublicados;
