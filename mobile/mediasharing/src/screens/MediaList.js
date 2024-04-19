import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, Button, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../config";
//
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
    <View style={{ marginBottom: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>Media List</Text>
      {mediaList.map((media) => (
        <View
          key={media._id}
          style={{
            marginVertical: 10,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
          }}
        >
          <img
            src={`http://localhost:3000/${media.image}`}
            style={{ width: 300, height: 200, resizeMode: "contain" }}
            alt={media.description}
          />
          {/* <Text>{media.image}</Text> */}

          {media.description && (
            <Text style={{ marginVertical: 5 }}>{media.description}</Text>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => handleLike(media._id, media.isliked)}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: media.isliked ? "black" : "blue",
                }}
              >
                {media.isliked ? "Like" : "Liked"}
              </Text>
            </TouchableOpacity>
            <Text
              onPress={() => handleDelete(media._id)}
              style={{ fontSize: 16, color: "red" }}
            >
              {" "}
              Delete
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default MediaList;
