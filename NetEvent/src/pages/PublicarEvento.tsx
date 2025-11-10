import React, { useState }  from 'react';
import { Input , Flex , Card, Row , Col , Divider , Typography, Button, Space} from 'antd';
import NewEventCarousel from '../components/events/NewEventCarousel';
import NewEventTagSelector from '../components/events/NewEventTagSelector';
import NewEventNewCharla from '../components/events/NewEventNewCharla';

const { TextArea } = Input;
const { Title } = Typography;

const PublicarEvento:React.FC = () => {


    const [charlas, setCharlas] = useState<number[]>([1]);

    const agregarCharla = () => {
        setCharlas((prev) => [...prev, Date.now()]); // ID único
    };

    const quitarCharla = (id: number) => {
        setCharlas((prev) => prev.filter((c) => c !== id));
    };




    return(
        <>
        <Card title="Publicar Nuevo Evento">
            <Flex vertical gap="15px">

                
                <NewEventCarousel />
            
                <Input placeholder='Titulo del Evento' />
                <Row>
                    <Col flex={3}>
                        <TextArea placeholder="Descripción" showCount maxLength={250} style={{ height: 150, resize: 'none' }}/>
                    </Col>
                    <Divider type="vertical" />
                    <Col flex={2}>
                        <Input placeholder='Ubicación' />
                        <br/>
                        <NewEventTagSelector />
                    </Col>
                </Row>

                <Divider />

                <Title level={4}>Agenda del Evento</Title>

                <Space direction="vertical" style={{ width: "100%" }}>
                    {charlas.map((id) => (
                        <NewEventNewCharla key={id} id={id} onRemove={quitarCharla} />
                    ))}

                    <Button
                        type="dashed"
                        icon={<span style={{ fontSize: 18 }}>+</span>}
                        onClick={agregarCharla}
                        block
                    >
                        Agregar charla
                    </Button>
                </Space>
            </Flex>
        </Card>
        </>
    );
};

export default PublicarEvento;