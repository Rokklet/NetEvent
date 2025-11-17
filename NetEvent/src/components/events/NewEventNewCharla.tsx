import React from 'react';
import { Input , Card, Space , TimePicker , Button } from 'antd';


interface Props {
  id: number;
  onRemove: (id: number) => void;
  onChange: (id: number, campo: string, valor: string) => void;
}

const NewEventNewCharla: React.FC<Props> = ({ id, onRemove, onChange }) => {

  return (
    <Card style={{ marginBottom: "8px" }}>
      <Space.Compact block>
        <Input
          style={{ width: "25%" }}
          placeholder="Encargado"
          onChange={e => onChange(id, "persona", e.target.value)}
        />

        <Input
          style={{ width: "30%" }}
          placeholder="Título"
          onChange={e => onChange(id, "titulo", e.target.value)}
        />

        <TimePicker
          placeholder="Inicio"
          style={{ width: "15%" }}
          onChange={t => onChange(id, "inicio", t ? t.format("HH:mm") : "")}
        />

        <Input
          className="site-input-split"
          style={{
            width: "5%",
            borderInlineStart: 0,
            borderInlineEnd: 0,
            pointerEvents: "none"
          }}
          placeholder="hasta"
          disabled
        />

        <TimePicker
          placeholder="Final"
          style={{ width: "15%" }}
          onChange={t => onChange(id, "fin", t ? t.format("HH:mm") : "")}
        />

        <Button type="primary" danger onClick={() => onRemove(id)}>
          Quitar
        </Button>
      </Space.Compact>
    </Card>
  );
};

export default NewEventNewCharla;
