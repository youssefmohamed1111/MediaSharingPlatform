import React, { useState, useEffect } from "react";
import axios from "axios";
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
    <div>
      <h2>Media List</h2>
      <ul>
        {mediaList.map((media) => (
          <li key={media._id}>
            {/* <h2>{media._id}</h2> */}
            <div
              style={{
                width: "300px",
                height: "200px",
                border: "1px solid #ccc",
                padding: "10px",
              }}
            >
              <img
                src={`http://localhost:3000/${media.image}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={media.description}
              />
            </div>
            <button onClick={() => handleLike(media._id, media.isliked)}>
              {media.isliked ? "Like" : "Liked"}
            </button>
            {/* {media.isliked ? "true" : "false"} */}
            <button onClick={() => handleDelete(media._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MediaList;
