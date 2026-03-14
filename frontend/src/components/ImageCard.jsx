import { BsThreeDotsVertical } from "react-icons/bs";
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

  return (
    <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      <img
        src={image.imageUrl}
        alt={image.name}
        onClick={() => setSelectedImage(image)}
        className="w-full h-48 sm:h-52 md:h-56 object-cover cursor-pointer hover:scale-105 transition"
      />

      {/* Image name */}
      <div className="p-2">
        <p className="text-sm font-medium truncate">{image.name}</p>
      </div>

      {/* Menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-2 right-2 text-white"
      >
        <BsThreeDotsVertical />
      </button>

      {/* Dropdown */}
      {menuOpen && (
        <div className="absolute right-2 top-8 bg-white border rounded shadow p-2 w-32">
          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Favourite
          </button>

          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500"
            onClick={deleteHandle}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
