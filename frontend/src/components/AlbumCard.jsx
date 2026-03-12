import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFolder, FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../services/api";

export const AlbumCard = ({ album, onDelete }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleDelete = async () => {
    try {
      await api.delete(`/albums/${album.albumId}`);
      setShowMenu(false);
      alert("Album Deleted successfully");
      onDelete(album.albumId);
    } catch (error) {
      alert(error?.response?.data?.message || "Error deleting album");
    }
  };

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
    <div className="relative border rounded-xl p-4 sm:p-6 shadow hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer">
      {/* Menu Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="absolute top-3 right-3 text-gray-600"
      >
        <BsThreeDotsVertical />
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-3 top-10 bg-white border rounded-lg shadow-md p-2 w-40 z-10">
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            <FaEdit />
            Rename
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
          >
            <FaTrash />
            Delete
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 w-full text-left px-3 py-2 hover:bg-gray-100"
          >
            <FaShareAlt />
            Share
          </button>
        </div>
      )}

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
  );
};
