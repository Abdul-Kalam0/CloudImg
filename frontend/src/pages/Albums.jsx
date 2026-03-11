import { useState, useEffect } from "react";
import api from "../services/api";
import { AlbumCard } from "../components/AlbumCard";
import { NavLink } from "react-router-dom";

export const Albums = () => {
  const [loading, setLoading] = useState(true);
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data.data);
    } catch (error) {
      alert("Error fetching albums");
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

  if (loading) return <h1 className="p-6">Fetching Albums...</h1>;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Albums</h1>

        <NavLink
          to="/create-album"
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          + Create Album
        </NavLink>
      </div>

      {/* Album Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
