import React from 'react';
import { Input , Card, Space , TimePicker , Button} from 'antd';

interface Props {
  id: number;
  onRemove: (id: number) => void;
}


const NewEventNewCharla:React.FC <Props> = ({ id, onRemove }) => {
    return(
        <Card style={{ marginBottom: "8px" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
                <Space.Compact block>
                    <Input style={{ width: '25%' }} placeholder='Encargado de Charla' />
                    <Input style={{ width: '30%' }} placeholder='Titulo de la Charla' />
                    <TimePicker placeholder='Inicio' style={{ width: '15%' }}/>
                    <Input
                        className="site-input-split" style={{ width: "5%", borderInlineStart: 0, borderInlineEnd: 0,pointerEvents: 'none',}}placeholder="hasta"disabled
                    />
                    <TimePicker placeholder='Final' style={{ width: '15%' }}/>
                    <Button type="primary" danger onClick={() => onRemove(id)}>Quiter</Button>
                </Space.Compact>
            </Space>
        </Card>
    )
}

export default NewEventNewCharla;