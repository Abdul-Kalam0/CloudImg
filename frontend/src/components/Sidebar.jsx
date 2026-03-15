import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaFolder, FaUser, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
    } catch (error) {
      toast.error("Error in logout");
    }
  };

  const navStyle = ({ isActive }) =>
    `flex items-center gap-3 p-3 rounded-lg transition
     hover:bg-gray-800 hover:text-purple-400
     ${isActive ? "bg-gray-800 text-purple-400" : ""}`;

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-10">CloudImg</h1>

      <nav className="flex flex-col gap-4">
        <NavLink to="/albums" className={navStyle}>
          <FaFolder />
          My Albums
        </NavLink>

        <NavLink to="/profile" className={navStyle}>
          <FaUser />
          Profile
        </NavLink>
      </nav>

      {/* Logout at bottom */}
      <button
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </div>
  );
};
