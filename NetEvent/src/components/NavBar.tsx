import React from "react";
import { Layout, Typography, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, SettingOutlined, LogoutOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
    //  const navigate = useNavigate();
    
    const items: MenuProps["items"] = [
    
      {
      key: "profile",
      label: "Perfil",
      icon: <UserOutlined />,
    //   onClick: () => navigate("/perfil"),
      onClick: () => window.location.href = "/perfil",
    },
    {
      key: "settings",
      label: "Configuración",
      icon: <SettingOutlined />,
    //   onClick: () => navigate("/config"),
      onClick: () => window.location.href = "/config",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Cerrar sesión",
      icon: <LogoutOutlined />,
      danger: true,
      onClick:() => window.location.href = "/login",
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

      {/* Avatar con menú desplegable */}
      <Dropdown menu={{ items }} placement="bottomRight" arrow>
        <Avatar icon={<UserOutlined />} className="navbar-avatar" />
      </Dropdown>
    </Header>
  );
};

export default Navbar;
