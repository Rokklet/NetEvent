import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, message } from "antd";
import { useAuth } from "../context/AuthContext";

const Evento: React.FC = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [evento, setEvento] = useState<any>(null);
  const [inscripto, setInscripto] = useState(false);

  useEffect(() => {
    const fetchEvento = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await fetch(`http://localhost:5000/api/eventos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
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

    const res = await fetch(`http://localhost:5000/api/eventos/inscribir/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();

    if (res.ok) {
      setInscripto(true);
      message.success("Te inscribiste correctamente");
    } else {
      message.error(data.message || "Error al inscribirse");
    }
  };

  const descargarPDF = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/eventos/${id}/inscriptos/pdf`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        return message.error("No se pudo descargar el PDF");
      }

      // Descargar PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `inscriptos-${id}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      message.error("Error al descargar PDF");
    }
  };

  if (!evento) return <p>Cargando...</p>;

  const esOrganizadorDueño =
    user &&
    user.role === "organizer" &&
    evento.organizador &&
    (evento.organizador._id === user._id || evento.organizador === user._id);

  return (
    <Card title={evento.titulo}>
      <p>{evento.descripcion}</p>


      {/*Boton de evento, organizador del evento debe poder descargar un PFS con los inscriptos. 
      Los participantes pueden incrbirse pero los guest no */}
      {/* Botón de inscripción para participantes */}
      {user?.role === "participant" && (
        <Button
          type={inscripto ? "default" : "primary"}
          disabled={inscripto}
          style={{
            backgroundColor: inscripto ? "#ccc" : undefined,
            color: inscripto ? "#555" : undefined,
          }}
          onClick={!inscripto ? inscribirse : undefined}
        >
          {inscripto ? "Ya inscripto" : "Inscribirme"}
        </Button>
      )}


      {/* Botón PDF solo para el organizador dueño */}
      {esOrganizadorDueño && (
        <Button
          style={{ marginLeft: 10 }}
          type="default"
          onClick={descargarPDF}
        >
          Descargar lista PDF
        </Button>
      )}
    </Card>
  );
};

export default Evento;
