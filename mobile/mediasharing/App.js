import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MediaList from "./src/screens/MediaList";
import UploadMedia from "./src/screens/UploadMedia";

const Stack = createStackNavigator();

const App = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const handleUploadPress = () => {
    setIsUploadVisible(true);
  };

  return (
    <View style={styles.container}>
      {isUploadVisible && <UploadMedia />}
      <Button
        title="Upload Media"
        onPress={handleUploadPress}
        disabled={isUploadVisible}
      />
      <MediaList />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});

export default App;
