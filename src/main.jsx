import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import App from "./app";
import Dashboard from "./pages/dashboard";
import Gerador from "./pages/Gerador";
import Sidebar from "./components/Sidebar";
import SecurityRoute from "./pages/SecurityRoute"; // <-- seu PrivateRoute

function LayoutComSidebar() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
}

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route element={<SecurityRoute />}>
        <Route element={<LayoutComSidebar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/gerador" element={<Gerador />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);
