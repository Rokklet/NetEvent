import React from "react";
import { Row, Col } from "antd";
import { useAuth } from "../context/AuthContext";
import CarruselEventos from "../components/home/CarruselEventos";
import Recomendaciones from "../components/home/Recomendaciones";
import BuscadorEventos from "../components/home/BuscadorEventos";
import MisInscripciones from "../components/home/MisInscripciones";
import MisEventosPublicados from "../components/home/MisEventosPublicados";

const Home: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  return (
    <>
      <CarruselEventos />

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
