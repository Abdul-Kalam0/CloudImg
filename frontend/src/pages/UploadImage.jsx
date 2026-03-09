import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

export const UploadImage = () => {
  const { albumId } = useParams();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!file) {
        alert("Please select an image");
        return;
      }

      const formData = new FormData();

      formData.append("image", file);
      formData.append("name", name);
      formData.append("tags", tags);

      await api.post(`/albums/${albumId}/images`, formData, {
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
    <>
      <h1>Upload Image</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="file">Select Image</label>
        <br />

        <input
          type="file"
          accept="image/*"
          id="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <br />

        <input
          type="text"
          placeholder="Image name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <input
          type="text"
          placeholder="Tags"
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        <br />

        <div>
          <button type="submit">Upload</button>

          <button type="button" onClick={() => navigate(`/albums/${albumId}`)}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};
