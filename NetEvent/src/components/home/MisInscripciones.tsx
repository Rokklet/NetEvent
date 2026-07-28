import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";
import { traerMisInscripciones } from "../../services/InscriptionService";

const MisInscripciones: React.FC = () => {
  const { user } = useAuth();
  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (!user || user.role !== "participant") {
      setLoading(false);
      return;
    }

    const cargarEventos = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) throw new Error("Debes iniciar sesión")

        
        const data = await traerMisInscripciones(token);

        setEventos(data);
      } catch (error) {
        const mes = error instanceof Error ? error.message : "Error cargando tus eventos publicados";
        messageApi.error(mes);
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
    <Card title="Mis Inscripciones" style={{backgroundColor: '#f3f3f3'}}>
      {contextHolder}
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
