import { Layout, Menu, Button } from "antd";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import "../styles/global.css";

const { Sider, Content } = Layout;

const OrganizadorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider theme="dark">
      <Menu
        mode="inline"
        items={[
          { key: "1", icon: <CalendarOutlined />, label: "Mis Eventos", onClick: () => window.location.href = "/perfil", },
          { key: "2", icon: <UserOutlined />, label: "Perfil" },
        ]}
        
      />

        <Button type="primary" onClick={() => window.location.href = "/registerOrganizador"}>
                                Organizador
        </Button>

    </Sider>
    <Layout>
      <Content style={{ margin: "24px" }}>{children}</Content>
    </Layout>
  </Layout>
);

export default OrganizadorLayout;