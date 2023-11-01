import "react-native-gesture-handler";
import { NativeBaseProvider, Text, extendTheme } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import MainLayout from "./src/layouts/MainLayout/MainLayout";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import TutorList from "./src/screens/TutorList";
import TutorDetail from "./src/screens/TutorDetail/TutorDetail";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import CoursesScreen from "./src/screens/CoursesScreen";

const Stack = createStackNavigator();

const theme = extendTheme({
  fontConfig: {
    Poppins: {
      100: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      200: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      300: {
        normal: "Poppins-Light",
        italic: "Poppins-LightItalic",
      },
      400: {
        normal: "Poppins-Regular",
        italic: "Poppins-Italic",
      },
      500: {
        normal: "Poppins-Medium",
      },
      600: {
        normal: "Poppins-Medium",
        italic: "Poppins-MediumItalic",
      },
      700: {
        normal: "Poppins-Bold",
      },
      800: {
        normal: "Poppins-Bold",
        italic: "Poppins-BoldItalic",
      },
      900: {
        normal: "Poppins-Bold",
        italic: "Poppins-BoldItalic",
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: "Poppins",
    body: "Poppins",
    mono: "Poppins",
  },
});

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("./assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("./assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("./assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("./assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Italic": require("./assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("./assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("./assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("./assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("./assets/fonts/Poppins-ThinItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="History"
          screenOptions={
            {
              // cardStyle: { backgroundColor: "#fff" },
            }
          }
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="TutorList" component={TutorList} />
          <Stack.Screen name="TutorDetail" component={TutorDetail} />
          <Stack.Screen name="Schedule" component={ScheduleScreen} />
          <Stack.Screen name="History" component={HistoryScreen} />
          <Stack.Screen name="Courses" component={CoursesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
