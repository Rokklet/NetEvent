import React from "react";
import { Card, Flex, Tag } from "antd";

interface Props {
  onChange: (tags: string[]) => void;
}

const NewEventTagSelector: React.FC<Props> = ({ onChange }) => {
  const tagsData = ["Seguridad", "Networking", "Cloud", "Firewalls", "Dispositivos"];

  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);

    setSelectedTags(nextSelectedTags);

    // 🔥 Notificamos al componente padre
    onChange(nextSelectedTags);
  };

  return (
    <Card title="Categorías">
      <Flex gap={4} wrap align="center">
        {tagsData.map((tag) => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={(checked) => handleChange(tag, checked)}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Flex>
    </Card>
  );
};

export default NewEventTagSelector;
