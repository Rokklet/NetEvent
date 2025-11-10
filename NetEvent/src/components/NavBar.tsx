import React from "react";
import { Layout, Typography, Avatar, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import "../styles/global.css";

const { Header } = Layout;
const { Title } = Typography;

const Navbar: React.FC = () => {
    const items: MenuProps["items"] = [
    
      {
      key: "home",
      label: "Home",
      icon: <UserOutlined />,
      onClick: () => window.location.href = "/home",
    },
    {
      type: "divider",
    },
    {
      key: "login",
      label: "Iniciar Sesion",
      icon: <LoginOutlined />,
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
