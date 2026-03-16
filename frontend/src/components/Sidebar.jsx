import { NavLink, useNavigate } from "react-router-dom";
import api from "../services/api";
import { FaFolder, FaUser, FaSignOutAlt, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";

export const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      navigate("/");
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Error in logout");
    }
  };

  const navStyle = ({ isActive }) =>
    `group flex items-center gap-3 p-3 rounded-lg transition-all duration-200
     hover:bg-gray-800 hover:text-purple-400 hover:scale-[1.03]
     ${isActive ? "bg-gray-800 text-purple-400 shadow-md" : "text-gray-300"}`;

  const iconStyle =
    "text-lg transition-colors duration-200 group-hover:text-purple-400";

  return (
    <div className="w-64 bg-gray-900 text-white p-6 flex flex-col h-screen">
      <h1 className="text-3xl font-bold mb-10 tracking-wide">CloudImg</h1>

      <nav className="flex flex-col gap-3">
        <NavLink to="/albums" className={navStyle}>
          <FaFolder className={iconStyle} />
          My Albums
        </NavLink>

        <NavLink to="/shared-with-me" className={navStyle}>
          <FaShareAlt className={iconStyle} />
          Shared With Me
        </NavLink>

        <NavLink to="/profile" className={navStyle}>
          <FaUser className={iconStyle} />
          Profile
        </NavLink>
      </nav>

      {/* Logout at bottom */}

      <button
        onClick={handleLogout}
        className="mt-auto group flex items-center gap-3 p-3 rounded-lg text-gray-300
        hover:bg-red-600 hover:text-white transition-all duration-200 hover:scale-[1.03]"
      >
        <FaSignOutAlt className="transition-colors duration-200 group-hover:text-white" />
        Logout
      </button>
    </div>
  );
};
