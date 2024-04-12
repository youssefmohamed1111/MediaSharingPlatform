import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import { BASE_URL } from "../config";
const MediaList = () => {
  const [mediaList, setMediaList] = useState([]);

  const fetchMediaList = async () => {
    try {
      const response = await axios.get(BASE_URL + "/api/media");
      setMediaList(response.data);
    } catch (error) {
      console.error("Error fetching media list:", error);
    }
  };

  useEffect(() => {
    fetchMediaList();
  }, []);

  const handleLike = async (mediaId, isliked) => {
    try {
      // Toggle the value of isliked
      const newIsLiked = !isliked;

      // Update the media list in the state to reflect the changes
      setMediaList((prevMediaList) =>
        prevMediaList.map((media) =>
          media._id === mediaId ? { ...media, isliked: newIsLiked } : media
        )
      );

      // Update the media item on the backend
      await axios.put(BASE_URL + `/api/media/${mediaId}`, {
        isliked: newIsLiked,
      });
    } catch (error) {
      console.error("Error updating media:", error);
    }
  };

  const handleDelete = async (mediaId) => {
    // Handle delete action
    try {
      await axios.delete(BASE_URL + `/api/media/${mediaId}`);
      fetchMediaList();
    } catch (error) {
      console.error("Error deleting media:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Media List</Text>
      {mediaList.map((media) => (
        <View key={media._id} style={styles.mediaContainer}>
          {media._id}
          <Image
            source={{ uri: `http://localhost:3000/${media.image}` }}
            style={styles.image}
            onError={(error) => console.error("Error loading image:", error)}
          />
          <TouchableOpacity
            onPress={() => handleLike(media._id, media.isliked)}
          >
            <Text style={styles.button}>
              {media.isliked ? "Like" : "Liked"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(media._id)}>
            <Text style={styles.button}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  mediaContainer: {
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    padding: 10,
    backgroundColor: "blue",
    color: "white",
    marginTop: 5,
    textAlign: "center",
  },
});

export default MediaList;
