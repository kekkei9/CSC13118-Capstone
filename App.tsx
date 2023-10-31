import "react-native-gesture-handler";
import { NativeBaseProvider, Text } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import MainLayout from "./src/layouts/MainLayout/MainLayout";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();

const Test = () => <Text>Xin chao may che</Text>;

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
