import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";
import { ImageCard } from "../components/ImageCard";

export const AlbumDetails = () => {
  const { albumId } = useParams();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [album, setAlbums] = useState();

  const getImages = async () => {
    try {
      const res = await api.get(`/albums/${albumId}/images`);
      setImages(res.data.data);
    } catch (error) {
      alert(error?.response?.data?.message || "Error fetching images");
    } finally {
      setLoading(false);
    }
  };

  const getAlbum = async () => {
    try {
      const res = await api.get(`/albums/${albumId}`);
      setAlbums(res.data.data);
    } catch (error) {
      alert(error?.response?.data?.message || "Error fetching album");
    }
  };

  useEffect(() => {
    getImages();
    getAlbum();
  }, [albumId]);

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-lg font-semibold">
        Loading Images...
      </h1>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="grid grid-cols-3 items-center mb-8">
        {/* Back button */}
        <NavLink to="/albums" className="text-gray-600 hover:text-black">
          ← Back
        </NavLink>

        {/* Center Title */}
        <h1 className="text-3xl font-bold text-center">
          {album?.name || "Album"}
        </h1>
        {/* Upload Button */}
        <div className="flex justify-end">
          <NavLink
            to={`/albums/${albumId}/upload`}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Upload Image
          </NavLink>
        </div>
      </div>

      {/* Empty state */}
      {images.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">
          No images in this album
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard
              key={image.imageId}
              image={image}
              setSelectedImage={setSelectedImage}
            />
          ))}
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white text-3xl"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>

          {/* Image */}
          <img
            src={selectedImage.imageUrl}
            alt={selectedImage.name}
            className="max-h-[90%] max-w-[90%] rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
};
