import React, { useEffect, useState } from "react";
import { Card, Spin, message } from "antd";
import EventCard from "../events/EventCard";
import { useAuth } from "../../context/AuthContext";

const Recomendaciones: React.FC = () => {
  const { user } = useAuth();

  const [eventos, setEventos] = useState<any[]>([]);
  const [misEventos, setMisEventos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        // Traer todos los eventos
        const res = await fetch("http://localhost:5000/api/eventos");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setEventos(data);

        // traer eventos del participante
        if (user?.role === "participant") {
          const token = localStorage.getItem("token");

          const r2 = await fetch(
            "http://localhost:5000/api/eventos/usuario/inscripto",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          const d2 = await r2.json();
          if (r2.ok) setMisEventos(d2);
        }
      } catch (err) {
        message.error("Error cargando recomendaciones");
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, [user]);

  if (loading) return <Spin />;

  // si no es participante, se trae todo
  if (!user || user.role !== "participant") {
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
  }

  // Si no tiene incripciones, trae todo
  if (misEventos.length === 0) {
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
  }

  // se trae un set de tag del participante
  const tagsUsuario = new Set<string>();
  misEventos.forEach((ev) => ev.tags.forEach((tag: string) => tagsUsuario.add(tag)));

  // id donde el usuario ya está inscripto
  const eventosInscriptosIds = new Set(misEventos.map((ev) => ev._id));

  

  // filtrar eventos recomendados
  const recomendados = eventos.filter((ev) => {
    if (eventosInscriptosIds.has(ev._id)) return false;

    // No recomendar eventos donde el usuario ya se inscribió
    if (eventosInscriptosIds.has(ev._id)) return false;

    // No recomendar eventos creados por el organizador
    //if (user?.role === "organizer" && ev.organizador?._id === user._id) return false;

    const esDelOrganizador =
      user?.role === "organizer" &&
      (ev.organizador === user._id ||
      ev.organizador?._id === user._id);

        if (esDelOrganizador) return false;

    // evento debe compartir al menos 1 tag
    return ev.tags.some((tag: string) => tagsUsuario.has(tag));
  });

  return (
    <Card title="Recomendaciones">
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
