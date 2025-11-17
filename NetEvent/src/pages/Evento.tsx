import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, message } from "antd";

const Evento: React.FC = () => {
  const { id } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [inscripto, setInscripto] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await fetch(`http://localhost:5000/api/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();
      setEvento(data);

      if (data.inscriptos && userId && data.inscriptos.includes(userId)) {
        setInscripto(true);
      }
    };

    fetchEvento();
  }, [id]);

  const inscribirse = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:5000/api/eventos/inscribir/${id}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    const data = await res.json();

    if (res.ok) {
      setInscripto(true);
      message.success("Te inscribiste correctamente");
    } else {
      message.error(data.message || "Error al inscribirse");
    }
  };

  if (!evento) return <p>Cargando...</p>;

  return (
    <Card title={evento.titulo}>
      <p>{evento.descripcion}</p>

      <Button
        type={inscripto ? "default" : "primary"}
        disabled={inscripto}
        style={{
          backgroundColor: inscripto ? "#ccc" : undefined,
          color: inscripto ? "#555" : undefined
        }}
        onClick={!inscripto ? inscribirse : undefined}
      >
        {inscripto ? "Ya inscripto" : "Inscribirme"}
      </Button>
    </Card>
  );
};

export default Evento;
