import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedImageurl, setUploadedImageUrl] = useState("");
  const [fetchImages, setFetchImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://cloudimg-uirq.onrender.com/images",
        );
        console.log(response.data.data);

        if (response.data.data.images) {
          setFetchImages(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch images", error);
        setMessage("Failed to fetch images");
      }
    };
    fetchImages();
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
    } catch (error) {
      setMessage("Image Upload failed.");
    }
  };
  return (
    <>
      <div>Image Uploader</div>
      <div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <p>
          {uploadedImageurl && (
            <img src={uploadedImageurl} alt="upload image" />
          )}
        </p>
      </div>
    </>
  );
}

export default App;
