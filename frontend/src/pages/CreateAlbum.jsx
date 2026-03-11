import { useState } from "react";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

export const CreateAlbum = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/albums", {
        name,
        description,
      });

      setName("");
      setDescription("");

      alert("Album created successfully");

      navigate("/albums");
    } catch (error) {
      alert(error?.response?.data?.message || "Error creating album");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Create Album</h1>

        <form onSubmit={handleCreate} className="space-y-4">
          {/* Album Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Album Name</label>

            <input
              type="text"
              placeholder="Album Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              placeholder="Album description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">
            <Link to="/albums" className="text-gray-600 hover:underline">
              ← Back
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading ? "Creating..." : "Create Album"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
