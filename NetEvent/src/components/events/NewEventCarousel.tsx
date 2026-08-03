import React, { useState } from "react";
import { Carousel, Button, Upload, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import "../../styles/global.css";

interface Props {
  onImagesChange: (imgs: string[]) => void;
}

const NewEventCarousel: React.FC<Props> = ({ onImagesChange }) => {


  const [imagenes, setImagenes] = useState<string[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  const props: UploadProps = {
  showUploadList: false,
  beforeUpload: async (file) => {
    try {
      const comprimida = await comprimirImagen(file);
      const nuevas = [...imagenes, comprimida];
      setImagenes(nuevas);
      onImagesChange(nuevas);
      message.success("Imagen agregada");
    } catch {
      message.error("No se pudo procesar la imagen");
    }
    return false;
  },
};

const comprimirImagen = (file: File, maxWidth = 1200, calidad = 0.8): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let { width, height } = img;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Convertimos a WebP con calidad reducida
        const dataUrl = canvas.toDataURL("image/webp", calidad);
        resolve(dataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

  const handleClearImages = () => {
    setImagenes([]);
    onImagesChange([]);
    messageApi.success("Imágenes eliminadas");
  };

  return (
    <div className="event-carousel-container" style={{ height: '300px'}} >
      {contextHolder}
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
      
       <Button
        danger
        shape="circle"
        icon={<DeleteOutlined />}
        className="event-carousel-clear"
        onClick={handleClearImages}
        disabled={imagenes.length === 0}
      />
    </div>
  );
};

export default NewEventCarousel;
