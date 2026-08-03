import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";
import { traerEventosTodos } from "../../services/EventService";
import { traerMisInscripciones } from "../../services/InscriptionService";

const Recomendaciones: React.FC = () => {
  const { user } = useAuth();

  const [eventos, setEventos] = useState<any[]>([]);
  const [misEventos, setMisEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await traerEventosTodos();
        setEventos(data);
        // solo los participantes tienen inscripciones
        if (user?.role === "participant") {
          const token = localStorage.getItem("token");
          if(!token) throw new Error("Debes inciar sesión")
          const r2 = await traerMisInscripciones(token);
          setMisEventos(r2);
        }
        
      } catch (error) {
        const mes = error instanceof Error ? error.message : "Error cargando recomendaciones";
        messageApi.error(mes);
      } finally {
        setLoading(false);
      }
    };
    

    cargarEventos();
  }, [user]);

  

  if (loading) return <Spin />;

  // ovulta al organizador sus propios eventos

  if (user?.role === "organizer") {
    const recomendados = eventos.filter(ev => {
      const idOrg = ev.organizador?._id || ev.organizador;
      return idOrg !== user._id;
    });

    return (
      <Card title="Recomendaciones" style={{backgroundColor: '#f3f3f3'}}>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
        {contextHolder}
        {recomendados.map((ev) => (
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
        </div>
      </Card>
    );
  }

  // si participante no tiene incripciones muestra todo
  if (misEventos.length === 0) {
    return (
      <Card title="Recomendaciones" style={{backgroundColor: '#f3f3f3'}}>
        <div style={{ maxHeight: '400px', overflowY: 'auto', paddingRight: '8px' }}>
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
        </div>
      </Card>
    );
  }

  // recomendación por tags

  const tagsUsuario = new Set<string>();
  misEventos.forEach((ev) =>
    ev.tags.forEach((tag: string) => tagsUsuario.add(tag))
  );

  const eventosInscriptosIds = new Set(misEventos.map(ev => ev._id));

  const recomendados = eventos.filter(ev => {
    const idOrg = ev.organizador?._id || ev.organizador;

    // No recomendar eventos ya inscriptos
    if (eventosInscriptosIds.has(ev._id)) return false;

    // No recomendar eventos del organizador (por si es organizer=participant)
    if (user && idOrg === user._id) return false;

    if (!ev.estado) return false;


    // Debe compartir mínimo 1 tag
    return ev.tags.some((tag: string) => tagsUsuario.has(tag));
  });

  return (
    <Card title="Recomendaciones" style={{backgroundColor: '#f3f3f3'}}>
      {recomendados.length === 0 ? (
        <p>No encontramos eventos basados en tus intereses.</p>
      ) : (
        recomendados.map((ev) => (
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

export default Recomendaciones;
