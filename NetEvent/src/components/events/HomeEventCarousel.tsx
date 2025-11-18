import React from "react";
import { Carousel, Card } from "antd";
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
          const imagenPrincipal =
            ev.imagenes?.[0] ??
            "https://via.placeholder.com/900x400?text=Evento+sin+imagen";

          return (
            <div
              key={ev._id}
              style={{
                padding: "10px 0",
                cursor: "pointer",
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
                }}
                cover={
                  <img
                    src={imagenPrincipal}
                    style={{
                      width: "100%",
                      height: 350,
                      objectFit: "cover",
                    }}
                  />
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
