import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../services/api";
import { ImageCard } from "../components/ImageCard";

export const AlbumDetails = () => {
  const { albumId } = useParams();

  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    getImages();
  }, [albumId]);

  if (loading)
    return (
      <h1 className="text-center mt-10 text-lg font-semibold">
        Loading Images...
      </h1>
    );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Album Images</h1>

        <NavLink
          to={`/albums/${albumId}/images`}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Upload Image
        </NavLink>
      </div>

      {/* Image Section */}
      {images.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No images in this album
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <ImageCard key={image.imageId} image={image} />
          ))}
        </div>
      )}
    </div>
  );
};
