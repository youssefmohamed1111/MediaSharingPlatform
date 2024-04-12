import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CombinedScreen from "./src/screens/CombinedScreen";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="CombinedScreen" component={CombinedScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
