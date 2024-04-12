import React from "react";
import { ScrollView } from "react-native";
import MediaList from "./MediaList";
import UploadMedia from "./UploadMedia";
const CombinedScreen = () => {
  return (
    <ScrollView style={{ flex: 1 }}>
      <UploadMedia />
      <MediaList />
    </ScrollView>
  );
};

export default CombinedScreen;
