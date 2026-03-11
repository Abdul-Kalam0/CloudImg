import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const getMe = async () => {
      try {
        await api.get("/auth/me");
        setIsAuth(true);
      } catch (error) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    getMe();
  }, []);

  if (loading) return <h1>Fetching Data...</h1>;
  if (!isAuth) return <Navigate to="/" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};
