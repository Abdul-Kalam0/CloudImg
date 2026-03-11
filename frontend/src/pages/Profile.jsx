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
      alert("User profile");
    } catch (error) {
      alert(response?.data.message || "Failed to fetch user data");
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

  if (loading) return <h1>Loading User data...</h1>;
  return (
    <div>
      <h1>Profile</h1>
      <h1>Name: {user.name}</h1>
      <h3>Email: {user.email}</h3>
      <p>Toal Albums: {albums.length}</p>
    </div>
  );
};
