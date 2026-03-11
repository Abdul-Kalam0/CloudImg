import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";

export const ImageCard = ({ image, setSelectedImage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-lg transition">
      {/* Image */}
      <img
        src={image.imageUrl}
        alt={image.name}
        onClick={() => setSelectedImage(image)}
        className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition"
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

          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100 text-red-500">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};
