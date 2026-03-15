import { useState, useEffect } from "react";
import api from "../services/api";
import { AlbumCard } from "../components/AlbumCard";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data.data);
    } catch (error) {
      toast.error("Error fetching albums");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAlbum = (albumId) => {
    setAlbums((prev) => prev.filter((album) => album.albumId !== albumId));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Albums</h1>

        <NavLink
          to="/create-album"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-center"
        >
          + Create Album
        </NavLink>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.albumId}
            album={album}
            onDelete={handleDeleteAlbum}
          />
        ))}
      </div>
    </div>
  );
};
