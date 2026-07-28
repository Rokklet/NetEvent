import React, { useEffect, useState } from "react";
import { Row, Col,  message } from "antd";
import { useAuth } from "../context/AuthContext";
import Recomendaciones from "../components/home/Recomendaciones";
import BuscadorEventos from "../components/home/BuscadorEventos";
import MisInscripciones from "../components/home/MisInscripciones";
import HomeEventCarousel from "../components/events/HomeEventCarousel";
import { traerEventosTodos } from "../services/EventService";
import MisEventosPublicadosActivos from "../components/home/MisEventosPublicadosActivos";

const Home: React.FC = () => {
  const { user } = useAuth();
  const role = user?.role || "guest";

  const [eventos, setEventos] = useState<any[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const cargarEventos = async () => {
      try {
        const data = await traerEventosTodos();
        setEventos(data);
      } catch (error) {
        const mes = error instanceof Error ? error.message : "Error cargando eventos";
        messageApi.error(mes);
      } 
    };

    cargarEventos();
  }, []);

  return (
    <>
      {contextHolder}
      {eventos.length > 0 && (
        <HomeEventCarousel eventos={eventos} />
      )}

      {role === "organizer" && (
        <MisEventosPublicadosActivos />
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


          {role === "guest" && (
            <BuscadorEventos />
          )}
        </Col>
      </Row>
    </>
  );
};

export default Home;
