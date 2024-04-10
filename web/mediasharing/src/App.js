import React from "react";
import "./App.css";
import MediaList from "./components/MediaList";
import UploadMedia from "./components/UploadMedia";
function App() {
  return (
    <div>
      <h1>Media Sharing Platform</h1>
      <UploadMedia />

      <MediaList />
    </div>
  );
}

export default App;
