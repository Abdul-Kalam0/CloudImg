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
      setShowMenu(false); // menu closes immediately
      alert("Album Deleted successfully");
      onDelete(album.albumId);
    } catch (error) {
      alert(error?.response?.data?.message || "Error in deleting album");
    }
  };

  const handleUpdate = async () => {
    try {
      const newName = prompt("Enter new album name", album.name);

      if (!newName) return;

      await api.put(`/albums/${album.albumId}`, { name: newName });
      setShowMenu(false); // menu closes immediately
      alert("Album renamed successfully");
      window.location.reload();
    } catch (error) {
      alert(error?.response?.data?.message || "Error updating album");
    }
  };

  return (
    <div className="relative border rounded-xl p-6 shadow hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer">
      {/* Three dots menu */}
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
        <div className="absolute right-3 top-10 bg-white border rounded-lg shadow-md p-2 w-36 z-10">
          {/* Rename */}
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            <FaEdit className="text-gray-600" />
            Rename
          </button>

          {/* Delete */}
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
          >
            <FaTrash />
            Delete
          </button>

          {/* Share */}
          <button className="flex items-center gap-2 w-full text-left px-2 py-1 hover:bg-gray-100">
            <FaShareAlt className="text-gray-600" />
            Share
          </button>
        </div>
      )}

      {/* Album Content */}
      <div
        onClick={() => navigate(`/albums/${album.albumId}`)}
        className="flex flex-col items-center"
      >
        <FaFolder size={90} className="text-yellow-500" />

        <h3 className="mt-3 font-semibold text-lg">{album.name}</h3>
      </div>
    </div>
  );
};
