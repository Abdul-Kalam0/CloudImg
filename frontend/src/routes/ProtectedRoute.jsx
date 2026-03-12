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

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  if (!isAuth) return <Navigate to="/" />;

  return (
    <div>
      <Outlet />
    </div>
  );
};
