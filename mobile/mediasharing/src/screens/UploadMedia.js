import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../config";

const UploadMedia = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    console.log("Picker result:", pickerResult);

    if (!pickerResult.cancelled) {
      console.log("Selected file before update:", selectedFile);
      setSelectedFile(pickerResult.uri);
      console.log("Selected file after update:", selectedFile);
    }
    // if (!pickerResult.cancelled) {
    //   setSelectedFile(pickerResult.uri); // Update state with selected file path
    // }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      const fileName = selectedFile.split("/").pop(); // Extract filename from URI

      formData.append("image", {
        uri: selectedFile,
      });

      const response = await axios.post(`${BASE_URL}/api/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data); // Log response for debugging

      setSelectedFile(null);
      alert("Media uploaded successfully!");
      window.location.reload(false);
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
          <Text style={styles.previewFileName}>
            {selectedFile.split("/").pop()}
          </Text>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          title="Upload"
          onPress={handleSubmit}
          // disabled={!selectedFile}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
