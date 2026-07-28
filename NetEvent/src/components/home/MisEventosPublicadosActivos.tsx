import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";
import { traerMisEventos } from "../../services/EventService";

const MisEventosPublicadosActivos: React.FC = () => {
  const { user } = useAuth();

  const [eventos, setEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const cargar = async () => {
      try {
        const token = localStorage.getItem("token");
        if(!token) throw new Error("Debes iniciar sesión")

        const data = await traerMisEventos(token);

        setEventos(data);
      } catch (error) {
        const mes = error instanceof Error ? error.message : "Error cargando tus eventos publicados";
        messageApi.error(mes);
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
    
    <Card title="Mis eventos publicados" style={{backgroundColor: '#f3f3f3'}}>
      {contextHolder}
      <div style={{ display: "flex", gap: 16,  overflowX: 'auto', maxHeight: '175px', flexWrap: "nowrap", paddingBottom: 8}} >
      {eventos.length === 0 ? (
        <p>No tenés eventos publicados.</p>
      ) : (
        eventos.map((ev) => (
          <div style={{ minWidth: 240, flexShrink: 0 }}>
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
          </div>
        ))
      )}
      </div>
    </Card>
  );
};

export default MisEventosPublicadosActivos;
