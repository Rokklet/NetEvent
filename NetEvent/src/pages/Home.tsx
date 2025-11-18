import React, { useEffect, useState } from "react";
import { Row, Col, Spin, message } from "antd";
import { useAuth } from "../context/AuthContext";
import Recomendaciones from "../components/home/Recomendaciones";
import BuscadorEventos from "../components/home/BuscadorEventos";
import MisInscripciones from "../components/home/MisInscripciones";
import MisEventosPublicados from "../components/home/MisEventosPublicados";
import HomeEventCarousel from "../components/events/HomeEventCarousel";

const Home: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

    const [eventos, setEventos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/eventos");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        setEventos(data);
      } catch (err) {
        message.error("Error cargando eventos");
      } finally {
        setLoading(false);
      }
    };

    cargarEventos();
  }, []);

  return (
    <>
      {eventos.length > 0 && (
        <HomeEventCarousel eventos={eventos} />
      )}


      <Row gutter={24} style={{ marginTop: "24px" }}>
        
        <Col xs={24} md={12}>
          <Recomendaciones />
        </Col>

       
        <Col xs={24} md={12}>
          {role === "participant" && (
            <>
              <BuscadorEventos />
              <div style={{ marginTop: "24px" }}>
                <MisInscripciones />
              </div>
            </>
          )}

          {role === "organizer" && (
            <MisEventosPublicados />
          )}

          {role === "guest" && (
            <BuscadorEventos />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
