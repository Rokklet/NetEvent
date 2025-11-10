import React from "react";
import { Layout, Typography, Avatar, Dropdown, Button } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined, PlusOutlined, HomeOutlined  } from "@ant-design/icons";
import "../styles/global.css";

const { Header } = Layout;
const { Title } = Typography;

const NavbarOrganizador: React.FC = () => {
    const items: MenuProps["items"] = [
    
      {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => window.location.href = "/home",
    },
    {
      type: "divider",
    },
    {
      key: "perfil",
      label: "Perfil",
      icon: <UserOutlined />,
      onClick: () => window.location.href = "/perfil",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Cerrar Sesion",
      icon: <LogoutOutlined />,
      danger: true,
      onClick:() => window.location.href = "/home",
    },
    
  ];
  return (
    
     <Header className="navbar">
      {/* Logo o título que redirige a Home */}
      <Title
        level={4}
        className="navbar-title"
        onClick={() => window.location.href = "/home"}
      >
        NetEvent
      </Title>


      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ backgroundColor: "#000c1eff", border: "none" }}
          onClick={() => window.location.href = "/nuevoevento"}
        >Nuevo Evento</Button>

        <Dropdown menu={{ items }} placement="bottomRight" arrow>
            <Avatar icon={<UserOutlined />} className="navbar-avatar" />
        </Dropdown>

      </div>
    
    </Header>
  );
};

export default NavbarOrganizador;
