import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { FaFolder, FaEdit, FaTrash, FaShareAlt } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import api from "../services/api";
import { toast } from "react-toastify";

export const AlbumCard = ({ album, onDelete }) => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showRename, setShowRename] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const [newName, setNewName] = useState("");
  const [email, setEmail] = useState("");

  const menuRef = useRef(null);

  /* ================= CLOSE MENU WHEN CLICK OUTSIDE ================= */

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

      toast.success("Album deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting album");
    }
  };

  /* ================= RENAME ================= */

  const handleUpdate = async () => {
    try {
      if (!newName.trim()) return;

      await api.put(`/albums/${album.albumId}`, {
        name: newName.trim(),
      });

      toast.success("Album renamed successfully");

      setShowRename(false);
      setShowMenu(false);

      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating album");
    }
  };

  /* ================= SHARE ================= */

  const handleShare = async () => {
    try {
      if (!email.trim()) return;

      await api.post(`/albums/${album.albumId}/share`, { email });

      toast.success("Album shared successfully");

      setShowShare(false);
      setShowMenu(false);
      setEmail("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error sharing album");
    }
  };

  return (
    <>
      {/* Overlay for menu */}
      {showMenu && (
        <div
          className="fixed inset-0 bg-black/20 z-10"
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* ================= CARD ================= */}

      <div
        ref={menuRef}
        className="relative border rounded-xl p-4 sm:p-6 shadow hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer bg-white z-20"
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
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-3 top-10 bg-white border rounded-xl shadow-lg w-44 z-30 overflow-hidden
          transform transition-all duration-200 origin-top-right
          ${
            showMenu
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {/* Rename */}

          <button
            onClick={() => {
              setNewName(album.name);
              setShowRename(true);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-sm"
          >
            <FaEdit />
            Rename
          </button>

          {/* Delete */}

          <button
            onClick={handleDelete}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-red-500 text-sm"
          >
            <FaTrash />
            Delete
          </button>

          {/* Share */}

          <button
            onClick={() => setShowShare(true)}
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

      {/* ================= RENAME MODAL ================= */}

      {showRename && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Rename Album</h2>

            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Album name"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowRename(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= SHARE MODAL ================= */}

      {showShare && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg p-6 w-[350px] shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Share Album</h2>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowShare(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleShare}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
