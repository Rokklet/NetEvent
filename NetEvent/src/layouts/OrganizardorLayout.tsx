import { Layout} from "antd";
import "../styles/global.css";
import NavbarOrganizador from "../components/NavBarOrganizador";

const {Content, Footer } = Layout;

const OrganizadorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <NavbarOrganizador />
    <Layout>
      <Content style={{ margin: "24px" }}>{children}</Content>
    </Layout>
    <Footer style={{ textAlign: "center", color: "#888" }}>
        © {new Date().getFullYear()} NetEvent - Todos los derechos reservados
      </Footer>
  </Layout>
);

export default OrganizadorLayout;