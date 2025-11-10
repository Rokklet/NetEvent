import { Layout} from "antd";
import "../styles/global.css";
import NavBarParticipante from "../components/NavBarParticipante";

const {Content, Footer } = Layout;

const OrganizadorLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Layout style={{ minHeight: "100vh" }}>
    <NavBarParticipante />
    <Layout>
      <Content style={{ margin: "24px" }}>{children}</Content>
    </Layout>
    <Footer style={{ textAlign: "center", color: "#888" }}>
        © {new Date().getFullYear()} NetEvent - Todos los derechos reservados
    </Footer>
  </Layout>
);

export default OrganizadorLayout;