import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaFolder, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      alert("Log out successfully");
      navigate("/");
    } catch (error) {
      alert("Error in logout");
    }
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded transform transition duration-200
     hover:bg-gray-800 hover:text-purple-400 hover:scale-105
     ${isActive ? "bg-gray-800 text-purple-400" : ""}`;

  return (
    <div className="w-64 bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-8">KaviosPix</h1>

      <nav className="flex flex-col space-y-4">
        <NavLink to="/albums" className={navStyle}>
          <FaFolder />
          My Albums
        </NavLink>

        <NavLink to="/profile" className={navStyle}>
          <FaUser />
          Profile
        </NavLink>

        <NavLink to="/setting" className={navStyle}>
          <FaCog />
          Setting
        </NavLink>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-2 rounded transform transition duration-200 hover:bg-gray-800 hover:text-purple-400 hover:scale-105"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </nav>
    </div>
  );
};
