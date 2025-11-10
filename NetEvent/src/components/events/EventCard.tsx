import React from "react";
import { Card, Avatar, Tag } from "antd";
import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../styles/global.css";

interface EventCardProps {
  id: string;
  titulo: string;
  fecha: string;
  ubicacion: string;
  categorias?: string[];
  organizadorLogo?: string;
  organizadorNombre?: string;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  titulo,
  fecha,
  ubicacion,
  categorias = [],
  organizadorLogo,
  organizadorNombre,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      hoverable
      className="event-card"
      onClick={() => navigate(`/evento/${id}`)}
      bodyStyle={{ padding: "16px 20px" }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
        <Avatar
          size={64}
          src={organizadorLogo}
          style={{ flexShrink: 0 }}
          alt={organizadorNombre}
        >
          {!organizadorLogo && organizadorNombre?.[0]?.toUpperCase()}
        </Avatar>

        <div style={{ flex: 1 }}>
          <h3 className="event-card-title">{titulo}</h3>

          <p className="event-card-info">
            <CalendarOutlined style={{ marginRight: 8 }} />
            {fecha}
          </p>
          <p className="event-card-location">
            <EnvironmentOutlined style={{ marginRight: 8 }} />
            {ubicacion}
          </p>

          <div className="event-card-tags">
            {categorias.map((cat, i) => (
              <Tag color="blue" key={i}>
                {cat}
              </Tag>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;


