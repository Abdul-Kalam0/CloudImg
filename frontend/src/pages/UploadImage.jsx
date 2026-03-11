import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export const UploadImage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    setFile(selectedFile);

    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      if (!file) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();

      formData.append("image", file);
      formData.append("name", name);
      formData.append("tags", tags);

      await api.post(`/albums/${albumId}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Image uploaded successfully");

      navigate(`/albums/${albumId}`);
    } catch (error) {
      alert(error?.response?.data?.message || "Uploading failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload Image</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Image Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}

        {/* File Input */}
        <div>
          <label className="block mb-1 font-medium">Select Image</label>

          <input
            type="file"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
        </div>

        {/* Image Name */}
        <div>
          <label className="block mb-1 font-medium">Image Name</label>

          <input
            type="text"
            placeholder="Enter image name"
            required
            className="w-full border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 font-medium">Tags</label>

          <input
            type="text"
            placeholder="nature, travel, beach"
            className="w-full border rounded-lg p-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={uploading}
            className={`px-4 py-2 rounded-lg text-white ${
              uploading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            type="button"
            onClick={() => navigate(`/albums/${albumId}`)}
            className="border px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
