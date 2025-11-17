import React from "react";
import { Layout, Typography, Avatar, Dropdown, Descriptions} from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LogoutOutlined,  HomeOutlined  } from "@ant-design/icons";
import "../styles/global.css";
import { useAuth } from "../context/AuthContext";

const { Header } = Layout;
const { Title } = Typography;

const NavbarOrganizador: React.FC = () => {

    const { user, logout } = useAuth();

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
      onClick: () => window.location.href = "/home",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Cerrar Sesion",
      icon: <LogoutOutlined />,
      danger: true,
      onClick: logout,
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

          <Descriptions.Item label="Nombre">{user?.nombre}</Descriptions.Item>

          <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <Avatar
                size={40}
                src={user?.foto || undefined}
                icon={!user?.foto && <UserOutlined />}
              />
          </Dropdown>

        </div>
        
    
    </Header>
  );
};

export default NavbarOrganizador;