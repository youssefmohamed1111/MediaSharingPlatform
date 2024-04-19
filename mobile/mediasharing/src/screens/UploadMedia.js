import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../config";

const UploadMedia = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async () => {
    const options = {
      mediaType: "photo", // Specify the media type you want to select (photo or video)
      quality: 1, // Image quality (0 to 1)
    };

    try {
      const response = await ImagePicker.launchImageLibraryAsync(options);
      if (!response.cancelled && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        const { uri, fileName, type } = selectedImage;
        const file = new File([uri], fileName, { type });

        setSelectedFile(file); // Update the selectedFile state with the created File object
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const handleSubmit = async () => {
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
      <Text>Upload Media</Text>
      <Button title="Select File" onPress={handleFileChange} />
      {selectedFile && <Text>Selected file: {selectedFile.name}</Text>}
      <Button title="Upload" onPress={handleSubmit} disabled={!selectedFile} />
    </View>
  );
};

export default UploadMedia;
