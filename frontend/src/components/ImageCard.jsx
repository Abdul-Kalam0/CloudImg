import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaTrash } from "react-icons/fa";
import { FaHeart, FaTrash, FaCommentDots } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const ImageCard = ({ image, setSelectedImage, onDelete }) => {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isFavourite, setIsFavourite] = useState(image.isFavourite);

  const menuRef = useRef(null);

  /* ================= CLOSE MENU OUTSIDE ================= */

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* ================= COMMENT IMAGE ================= */

  const commentHandle = async () => {
    try {
      const text = prompt("Enter your comment");
      if (!text || !text.trim()) return;
      api.post(`/albums/${image.albumId}/images/${image.imageId}/comments`, {
        text,
      });
      alert("Comment added successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Error adding comment");
    }
  };

  /* ================= DELETE IMAGE ================= */

  const deleteHandle = async () => {
    try {
      await api.delete(`/albums/${image.albumId}/images/${image.imageId}`);

      setMenuOpen(false);

      onDelete(image.imageId);

      alert("Image deleted successfully");
    } catch (error) {
      alert(error?.response?.data?.message || "Error deleting image");
    }
  };

  /* ================= TOGGLE FAVOURITE ================= */

  const favouriteHandle = async () => {
    const newFavourite = !isFavourite;

    try {
      await api.put(
        `/albums/${image.albumId}/images/${image.imageId}/favorite`,
        { isFavourite: newFavourite },
      );

      setIsFavourite(newFavourite);
      setMenuOpen(false);
    } catch (error) {
      alert(error?.response?.data?.message || "Error updating favourite");
    }
  };

  return (
    <>
      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black/20 z-10"></div>}

      <div
        ref={menuRef}
        className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
      >
        {/* Image */}
        <img
          src={image.imageUrl}
          alt={image.name}
          onClick={() => setSelectedImage(image)}
          className="w-full h-48 sm:h-52 md:h-56 object-cover cursor-pointer hover:scale-105 transition"
        />

        {/* Menu button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="absolute top-2 right-2 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition"
        >
          <BsThreeDotsVertical />
        </button>

        {/* Dropdown menu */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-2 top-10 bg-white border rounded-xl shadow-lg w-44 z-20 overflow-hidden
          transform transition-all duration-200 origin-top-right
          ${
            menuOpen
              ? "scale-100 opacity-100"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {/* Favourite */}
          <button
            onClick={favouriteHandle}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-sm"
          >
            <FaHeart
              className={`${isFavourite ? "text-red-500" : "text-gray-500"}`}
            />
            {isFavourite ? "Unfavourite" : "Favourite"}
          </button>

          {/* Comment */}
          <button
            onClick={commentHandle}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-sm"
          >
            <FaCommentDots className="text-gray-500" />
            Comment
          </button>

          {/* Delete */}
          <button
            onClick={deleteHandle}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100 text-red-500 text-sm"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
