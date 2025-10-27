import React from "react";
import { Layout } from "antd";
import Navbar from "../components/NavBar";
const { Content, Footer } = Layout;

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "24px" }}>{children}</Content>
      <Footer style={{ textAlign: "center", color: "#888" }}>
        © {new Date().getFullYear()} NetEvent - Todos los derechos reservados
      </Footer>
    </Layout>
  );
};

export default MainLayout;