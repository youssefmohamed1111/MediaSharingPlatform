import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const UploadMedia = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      await axios.post(BASE_URL + "/api/media", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Reset form field after successful upload
      setSelectedFile(null);
      alert("Media uploaded successfully!");
      window.location.reload(false);
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Failed to upload media.");
    }
  };

  return (
    <div>
      <h2>Upload Media</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadMedia;
