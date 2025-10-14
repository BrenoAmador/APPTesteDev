import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import axios from "axios";

export default function SecurityRoute() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    let mounted = true;
    const token = localStorage.getItem("token");

    if (!token) {
      setChecking(false);
      setAllowed(false);
      return;
    }

    axios
      .post(
        apiUrl + "login/validar",
        {},
        { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 }
      )
      .then((res) => {
        if (!mounted) return;
        if (res.status === 200 && (res.data?.valid ?? true)) {
          setAllowed(true);
        } else {
          localStorage.removeItem("token");
          setAllowed(false);
        }
      })
      .catch(() => {
        if (!mounted) return;
        localStorage.removeItem("token");
        setAllowed(false);
      })
      .finally(() => {
        if (mounted) setChecking(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (checking) return <div style={{ padding: 20 }}>Verificando sessão...</div>;
  if (!allowed) return <Navigate to="/" />;
  return <Outlet />;
}
