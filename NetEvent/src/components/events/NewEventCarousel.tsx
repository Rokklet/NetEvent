import React, { useState } from "react";
import { Carousel, Button, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import "../../styles/global.css";

interface Props {
  onImagesChange: (imgs: string[]) => void;
}

const NewEventCarousel: React.FC<Props> = ({ onImagesChange }) => {


  const [imagenes, setImagenes] = useState<string[]>([
    "https://netacad.com/p/ff9e491c-49be-4734-803e-a79e6e83dab1/a6efd491-1ca7-4275-88e4-746f3cfdf5b7/image.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLveODLzdsMPIeRyCqLykOEtAhF0P-zoM2cw&s",
  ]);

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
    <div className="event-carousel-container">
      <Carousel arrows dots={true}>
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
