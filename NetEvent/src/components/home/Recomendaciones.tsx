import React from "react";
import { Card } from "antd";
import EventCard from "../events/EventCard";

const Recomendaciones: React.FC = () => (
  <Card title="Recomendaciones">
    <EventCard
    id="123"
    titulo="Charla de Liderazgo"
    fecha="15 de noviembre"
    ubicacion="Córdoba"
    categorias={["Networking", "Liderazgo"]}
    organizadorNombre="Empower Talks"
    />
  </Card>
);

export default Recomendaciones;
