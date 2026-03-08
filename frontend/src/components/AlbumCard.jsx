import { useNavigate } from "react-router-dom";

export const AlbumCard = ({ album }) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-2">{album.name}</h3>

      <p className="text-gray-500 text-sm mb-4">
        {album.description || "No description"}
      </p>

      <button
        onClick={() => navigate(`/albums/${album.albumId}`)}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Open Album
      </button>
    </div>
  );
};
