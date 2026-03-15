import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const [albums, setAlbums] = useState([]);

  const getProfile = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to fetch user data",
      );
    } finally {
      setLoading(false);
    }
  };

  const totalAlbums = async () => {
    try {
      const res = await api.get("/albums");
      setAlbums(res.data.data);
    } catch (error) {
      toast.error("Albums not found");
    }
  };

  useEffect(() => {
    getProfile();
    totalAlbums();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-[80vh] bg-gray-100 flex justify-center pt-10 md:pt-16 lg:pt-20 px-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg p-6 sm:p-8 text-center hover:shadow-2xl transition">
        {/* Avatar */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl sm:text-3xl font-bold shadow-md">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
          {user.name}
        </h1>

        {/* Email */}
        <p className="text-gray-500 text-sm sm:text-base mb-6">{user.email}</p>

        {/* Divider */}
        <div className="border-t mb-6"></div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Total Albums</p>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-600">
              {albums.length}
            </h2>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 shadow-sm hover:shadow-md transition">
            <p className="text-gray-500 text-sm">Status</p>
            <h2 className="text-base sm:text-lg font-semibold text-green-500">
              Active
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
