import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MediaList from "./src/screens/MediaList";
import UploadMedia from "./src/screens/UploadMedia";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MediaList">
        <Stack.Screen name="MediaList" component={MediaList} />
        <Stack.Screen name="UploadMedia" component={UploadMedia} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
