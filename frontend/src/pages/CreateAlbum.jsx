import { useState } from "react";
import api from "../services/api.js";
import { Link, useNavigate } from "react-router-dom";

export const CreateAlbum = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/albums", {
        name,
        description,
      });
      setName("");
      setDescription("");
      alert("Album created successfully");
      navigate("/albums");
    } catch (error) {
      alert("Error creating album");
    }
  };
  return (
    <>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="name">Album Name</label> <br />
          <input
            type="text"
            id="name"
            placeholder="Album Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label> <br />
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-items-center">
          <button type="submit">Create</button>
          <Link to="/albums">Cancel</Link>
        </div>
      </form>
    </>
  );
};
