import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

export const UploadImage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.size > MAX_SIZE) {
      toast.error("Image size must be less than 5MB");

      e.target.value = null;
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        toast.error("Please select an image");
        return;
      }

      setUploading(true);

      const formData = new FormData();

      formData.append("image", file);
      formData.append("name", name);
      formData.append("tags", tags);

      await api.post(`/albums/${albumId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Image uploaded successfully");

      navigate(`/albums/${albumId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Uploading failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Image</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preview */}
          {preview && (
            <div className="w-full h-48 overflow-hidden rounded-lg border">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Image
            </label>

            <input
              type="file"
              accept="image/*"
              required
              onChange={handleFileChange}
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Image Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Image Name</label>

            <input
              type="text"
              placeholder="Enter image name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium mb-1">Tags</label>

            <input
              type="text"
              placeholder="nature, travel, beach"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => navigate(`/albums/${albumId}`)}
              className="text-gray-600 hover:underline"
            >
              ← Back
            </button>

            <button
              type="submit"
              disabled={uploading}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
