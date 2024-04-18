import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import { BASE_URL } from "../config";

const UploadMedia = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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
    <View>
      <div>
        <h2>Upload Media</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Upload</button>
        </form>
      </div>
    </View>
  );
};

const options = {
  title: "Select Image",
  customButtons: [{ name: "cancel", title: "Cancel" }],
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  imagePreview: {
    marginTop: 10,
  },
});

export default UploadMedia;
