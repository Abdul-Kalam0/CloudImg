import { useEffect, useState } from "react";
import api from "../services/api";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [albums, setAlbums] = useState([]);

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  const totalAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data.data);
    } catch (error) {
      alert("Albums not found");
    }
  };

  useEffect(() => {
    getProfile();
    totalAlbums();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-gray-600">
          Loading User data...
        </h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 text-center">
        {/* Avatar */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{user.name}</h1>

        {/* Email */}
        <p className="text-gray-500 mb-6">{user.email}</p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 shadow">
            <p className="text-gray-500 text-sm">Total Albums</p>
            <h2 className="text-2xl font-bold text-blue-600">
              {albums.length}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 shadow">
            <p className="text-gray-500 text-sm">Status</p>
            <h2 className="text-lg font-semibold text-green-500">Active</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
