import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFolder } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

export const AlbumCard = ({ album }) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="relative border rounded-xl p-6 shadow hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer">
      {/* Three dots menu button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        className="absolute top-3 right-3 text-gray-600"
      >
        <BsThreeDotsVertical />
      </button>

      {/* Dropdown menu */}
      {showMenu && (
        <div className="absolute right-3 top-10 bg-white border rounded-lg shadow-md p-2 w-32 z-10">
          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Rename
          </button>

          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Delete
          </button>

          <button className="block w-full text-left px-2 py-1 hover:bg-gray-100">
            Share
          </button>
        </div>
      )}

      {/* Album content */}
      <div
        onClick={() => navigate(`/albums/${album.albumId}`)}
        className="flex flex-col items-center"
      >
        <FaFolder size={90} className="text-yellow-500" />

        <h3 className="mt-3 font-semibold text-lg">{album.name}</h3>

        {/* <p className="text-gray-500 text-sm">
          {album.description || "No description"}
        </p> */}
      </div>
    </div>
  );
};
