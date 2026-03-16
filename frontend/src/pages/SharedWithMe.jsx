import { useEffect, useState } from "react";
import api from "../services/api";
import { AlbumCard } from "../components/AlbumCard";
import { toast } from "react-toastify";

export const SharedWithMe = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSharedAlbums = async () => {
    try {
      const res = await api.get("/albums/shared-with-me");
      setAlbums(res.data.data);
    } catch (error) {
      toast.error("Error fetching shared albums");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSharedAlbums();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shared With Me</h1>

      {albums.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No albums shared with you
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {albums.map((album) => (
            <AlbumCard key={album.albumId} album={album} />
          ))}
        </div>
      )}
    </div>
  );
};
