import React from "react";
import { Carousel, Card, Result } from "antd";
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

interface HomeEventCarouselProps {
  eventos: any[];
}

const HomeEventCarousel: React.FC<HomeEventCarouselProps> = ({ eventos }) => {
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: 30 }}>
      <Carousel arrows autoplay draggable dotPosition="bottom">
        {eventos.map((ev) => {
          const tienePortada = ev.imagenes[0] || ev.imagenes.lenght > 0;
          return (
            <div
              key={ev._id}
              style={{
                padding: "10px 0",
                cursor: "pointer",
                backgroundColor: '#f3f3f3'
              }}
              onClick={() => navigate(`/evento/${ev._id}`)}
            >
              <Card
                hoverable
                style={{
                  width: "90%",
                  margin: "0 auto",
                  borderRadius: 12,
                  overflow: "hidden",
                  backgroundColor: '#f3f3f3'
                }}
                cover={
                  tienePortada ? 
                  (
                  <img src={ev.imagenes[0]} style={{width: "100%",height: 350,objectFit: "cover",}}/>)
                    :
                  (
                  <Result icon={<SmileOutlined />} title="Este evento no posee una portada"/>
                  )
                  
                }
              >
                <Card.Meta
                  title={ev.titulo}
                  description={
                    <div>
                      <p style={{ margin: 0 }}>
                        <strong>Fecha:</strong>{" "}
                        {new Date(ev.fecha).toLocaleDateString()}
                      </p>
                      <p style={{ margin: 0 }}>
                        <strong>Ubicación:</strong> {ev.ubicacion}
                      </p>
                    </div>
                  }
                />
              </Card>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default HomeEventCarousel;
