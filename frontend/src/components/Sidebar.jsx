import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";

export const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
      alert("Log out successfully");
    } catch (error) {
      alert("Error in logout");
    }
  };
  return (
    <div className="w-64 bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-8">KaviosPix</h1>

      <nav className="flex flex-col space-y-4">
        <NavLink
          to="/dashboard"
          className="block p-2 rounded hover:bg-gray-800 hover:text-purple-400 hover:scale-105 transition-all duration-200"
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/albums"
          className="block p-2 rounded hover:bg-gray-800 hover:text-purple-400 hover:scale-105 transition-all duration-200"
        >
          My Albums
        </NavLink>

        <NavLink
          to="/upload"
          className="block p-2 rounded hover:bg-gray-800 hover:text-purple-400 hover:scale-105 transition-all duration-200"
        >
          Upload Image
        </NavLink>

        <NavLink
          to="/profile"
          className="block p-2 rounded hover:bg-gray-800 hover:text-purple-400 hover:scale-105 transition-all duration-200"
        >
          Profile
        </NavLink>
        <NavLink
          to="/setting"
          className="block p-2 rounded hover:bg-gray-800 hover:text-purple-400 hover:scale-105 transition-all duration-200"
        >
          Setting
        </NavLink>

        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};
