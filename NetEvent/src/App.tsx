import React from "react";
import { Layout } from "antd";
import Navbar from "./components/NavBar.tsx";
import AppRouter from "./routes/Router.tsx";

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Navbar />
      <Content style={{ padding: "24px" }}>
        <AppRouter />
      </Content>
      
    </Layout>
  );
};

export default App;
