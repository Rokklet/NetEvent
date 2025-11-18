import React from "react";
import { Carousel } from "antd";
import "../../styles/global.css";

interface Props {
  images: string[];   
}

const ViewEventCarousel: React.FC<Props> = ({ images }) => {
  return (
    <div className="event-carousel-container">
      <Carousel arrows dots>
        {images.length === 0 ? (
          <div className="event-carousel-slide">
            <img
              src="https://via.placeholder.com/800x400?text=Sin+imagenes"
              className="event-carousel-img"
            />
          </div>
        ) : (
          images.map((src, i) => (
            <div key={i} className="event-carousel-slide">
              <img src={src} className="event-carousel-img" />
            </div>
          ))
        )}
      </Carousel>
    </div>
  );
};

export default ViewEventCarousel;
