import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedImageurl, setUploadedImageUrl] = useState("");
  const [fetchImages, setFetchImages] = useState([]);

  const getImages = async () => {
    try {
      const response = await axios.get(
        "https://cloudimg-uirq.onrender.com/images",
      );

      if (response.data.data) {
        setFetchImages(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch images", error);
      setMessage("Failed to fetch images");
    }
  };
  useEffect(() => {
    getImages();
  }, []);

  const handleChange = (e) => {
    setImage(e.target.files[0]);
    console.log("Image: ", image);
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "https://cloudimg-uirq.onrender.com/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response);
      setUploadedImageUrl(response.data.data.imageUrl);
      setMessage("Image Uploaded successfully.");
      setImage(null);
      getImages();
    } catch (error) {
      setMessage("Image Upload failed.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://cloudimg-uirq.onrender.com/image/${id}`,
      );
      setFetchImages((prev) => prev.filter((img) => img._id !== id));
      if (response.data.success) {
        setMessage("Image deleted successfully");
      }
    } catch (error) {
      setMessage("Failed to delete image");
    }
  };

  return (
    <>
      <div>Image Uploader</div>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <div>
          {uploadedImageurl && (
            <div>
              <h2>Uploaded Image</h2>
              <img
                src={uploadedImageurl}
                alt="upload image"
                style={{ width: "200px", height: "100px" }}
              />
            </div>
          )}
        </div>

        <div>
          <h2>Existing Images</h2>
          <ul>
            {fetchImages.length > 0 ? (
              <div>
                {fetchImages.map((image) => (
                  <li key={image._id}>
                    <img
                      src={image.imageUrl}
                      alt="stored"
                      style={{ width: "200px", height: "100px" }}
                    />

                    <button onClick={() => handleDelete(image._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </div>
            ) : (
              <p>Images not found.</p>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
