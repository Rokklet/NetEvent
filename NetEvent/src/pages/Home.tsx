import React from "react";
import { Carousel, Row, Card, Col  } from "antd";
import "../styles/global.css"

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#5c6a84ff',
};
 
const Home: React.FC = () => {



  return (

    <>
      <Carousel className="carouselHome" arrows infinite={false}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
      </Carousel>

      <Row gutter={24} style={{ marginTop: "24px" }}>
        <Col xs={24} md={12}>
          <Card title="Recomendaciones">
            
          </Card>
        </Col>

        <Col xs={24} md={12}>
            <Card title="Mis inscripciones">
            
          </Card>
        </Col>
      </Row>
    </>

  );
};

export default Home;
