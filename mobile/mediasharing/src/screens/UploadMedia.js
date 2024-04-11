import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // Update with your actual backend URL

const UploadMedia = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.cancelled) {
      setSelectedFile(pickerResult.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: selectedFile,
        type: "image/jpeg", // Adjust the type based on the file format
        name: "media.jpg", // Adjust the filename as needed
      });

      await axios.post(`${BASE_URL}/api/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset selected file after successful upload
      setSelectedFile(null);
      alert("Media uploaded successfully!");
    } catch (error) {
      console.error("Error uploading media:", error);
      alert("Failed to upload media.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Media</Text>
      <View style={styles.inputContainer}>
        <Button title="Choose File" onPress={handleFileChange} />
      </View>
      {selectedFile && (
        <View style={styles.previewContainer}>
          <Text style={styles.previewText}>Selected File:</Text>
          <Text style={styles.previewFileName}>{selectedFile}</Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Upload"
          onPress={handleSubmit}
          disabled={!selectedFile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  previewContainer: {
    marginBottom: 20,
  },
  previewText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  previewFileName: {
    fontSize: 16,
  },
  buttonContainer: {
    marginBottom: 20,
  },
});

export default UploadMedia;
