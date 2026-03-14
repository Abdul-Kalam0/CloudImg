import { BsThreeDotsVertical } from "react-icons/bs";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const ImageCard = ({ image, setSelectedImage }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const deleteHandle = async () => {
    try {
      await api.delete(`/albums/${image.albumId}/images/${image.imageId}`);
      alert("Image deleted successfully");
      navigate(`/albums/${image.albumId}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Error deleting image");
    }
  };

  const favouriteHandle = async () => {
    try {
      await api.put(
        `/albums/${image.albumId}/images/${image.imageId}/favorite`,
        { isFavourite: !image.isFavourite },
      );
      alert("Favourite updated");
    } catch (error) {
      alert(error?.response?.data?.message || "Error updating favourite");
    }
  };

  return (
    <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      <img
        src={image.imageUrl}
        alt={image.name}
        onClick={() => setSelectedImage(image)}
        className="w-full h-48 sm:h-52 md:h-56 object-cover cursor-pointer hover:scale-105 transition"
      />

      {/* Menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-2 right-2 text-white bg-black/40 p-1 rounded-full"
      >
        <BsThreeDotsVertical />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-2 top-10 bg-white border rounded-xl shadow-lg w-40 py-2 z-20">
          {/* Favourite */}
          <button
            onClick={favouriteHandle}
            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 text-gray-700"
          >
            <FaHeart className="text-gray-600" />
            Favourite
          </button>

          {/* Delete */}
          <button
            onClick={deleteHandle}
            className="flex items-center gap-3 w-full px-4 py-2 hover:bg-gray-100 text-red-500"
          >
            <FaTrash />
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
