import React from "react";
import { Tag , Card, Flex } from "antd";

import "../../styles/global.css";

const NewEventTagSelector: React.FC = () => {

    const tagsData = ['Seguridad', 'Networking', 'Cloud', 'Firewalls', 'Dispositivos'];

    const [selectedTags, setSelectedTags] = React.useState<string[]>(['Movies']);
    const handleChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
        ? [...selectedTags, tag]
        : selectedTags.filter((t) => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
    };


    return(
        <Card title="Categorias">
            <Flex gap={4} wrap align="center">
                {tagsData.map<React.ReactNode>((tag) => (
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