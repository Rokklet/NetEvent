import React from "react";
import { Input, Card } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const BuscadorEventos: React.FC = () => (
  <Card title="Buscar eventos">
    <Input
      prefix={<SearchOutlined />}
      placeholder="Buscar por nombre o categoría"
      size="large"
      allowClear
    />
  </Card>
);

export default BuscadorEventos;
