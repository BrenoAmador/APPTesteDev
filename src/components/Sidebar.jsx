import {
  CSidebar,
  CSidebarHeader,
  CSidebarNav,
  CSidebarToggler,
  CNavItem,
  CNavTitle,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import { cilLayers, cilSpeedometer } from "@coreui/icons";

export const Sidebar = () => {
  return (
    <CSidebar
      className="border-end"
      style={{ height: "100vh" }}
      colorScheme="dark"
    >
      <CSidebarHeader className="border-bottom">
        <a style={{ fontWeight: 600 }}>GERADOR DE DADOS</a>
      </CSidebarHeader>

      <CSidebarNav>
        <CNavTitle>Menu De Navegação</CNavTitle>

        <CNavItem href="/dashboard">
          <CIcon customClassName="nav-icon" icon={cilSpeedometer} /> Dashboard
        </CNavItem>

        <CNavItem href="/gerador">
          <CIcon customClassName="nav-icon" icon={cilLayers} /> Gerar Dados
        </CNavItem>
      </CSidebarNav>

      <CSidebarHeader className="border-top">
        <CSidebarToggler
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        />
      </CSidebarHeader>
    </CSidebar>
  );
};

export default Sidebar;
