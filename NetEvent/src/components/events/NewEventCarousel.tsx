import React, { useState } from "react";
import { Carousel, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import "../../styles/global.css";

interface Props {
  onImagesChange: (imgs: string[]) => void;
}

const NewEventCarousel: React.FC<Props> = ({ onImagesChange }) => {


  const [imagenes, setImagenes] = useState<string[]>([]);

   const props: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        if (result) {
          const nuevas = [...imagenes, result];
          setImagenes(nuevas);
          onImagesChange(nuevas);
          message.success("Imagen agregada");
        }
      };
      reader.readAsDataURL(file);
      return false;
    },
  };

  return (
    <div className="event-carousel-container" >
      <Carousel arrows dots={true} >
        {imagenes.map((src, i) => (
          <div key={i} className="event-carousel-slide">
            <img src={src} className="event-carousel-img" />
          </div>
        ))}
      </Carousel>

      <Upload {...props}>
        <Button type="primary" shape="circle" icon={<PlusOutlined />} className="event-carousel-add" />
      </Upload>
    </div>
  );
};

export default NewEventCarousel;
