import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaFolder, FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../services/api";

export const AlbumCard = ({ album, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  /* ================= CLOSE MENU OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= DELETE ================= */

  const handleDelete = async () => {
    try {
      await api.delete(`/albums/${album.albumId}`);
      setShowMenu(false);
      onDelete(album.albumId);
      alert("Album Deleted successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Error deleting album");
    }
  };

  /* ================= RENAME ================= */

  const handleUpdate = async () => {
    try {
      const newName = prompt("Enter new album name");

      if (!newName || !newName.trim()) return;

      await api.put(`/albums/${album.albumId}`, { name: newName.trim() });

      setShowMenu(false);
      alert("Album renamed successfully");
      window.location.reload();
    } catch (error) {
      alert(error?.response?.data?.message || "Error updating album");
    }
  };

  /* ================= SHARE ================= */

  const handleShare = async () => {
    try {
      const email = prompt("Enter email to share album");

      if (!email) return;

      await api.post(`/albums/${album.albumId}/share`, { email });

      setShowMenu(false);
      alert("Album shared successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Error sharing album");
    }
  };

  return (
    <>
      {/* Overlay (mobile friendly) */}
      {showMenu && <div className="fixed inset-0 bg-black/20 z-10"></div>}

      <div
        ref={menuRef}
        className="relative border rounded-xl p-4 sm:p-6 shadow hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer bg-white"
      >
        {/* Menu Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="absolute top-3 right-3 text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
        >
          <BsThreeDotsVertical />
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-3 top-10 bg-white border rounded-xl shadow-lg w-44 z-20 overflow-hidden
          transform transition-all duration-200 origin-top-right
          ${
            showMenu
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          <button
            onClick={handleUpdate}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-sm"
          >
            <FaEdit />
            Rename
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-red-500 text-sm"
          >
            <FaTrash />
            Delete
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-sm"
          >
            <FaShareAlt />
            Share
          </button>
        </div>

        {/* Album Content */}
        <div
          onClick={() => navigate(`/albums/${album.albumId}`)}
          className="flex flex-col items-center"
        >
          <FaFolder className="text-yellow-500 text-[60px] sm:text-[80px]" />

          <h3 className="mt-3 font-semibold text-base sm:text-lg text-center">
            {album.name}
          </h3>
        </div>
      </div>
    </>
  );
};
