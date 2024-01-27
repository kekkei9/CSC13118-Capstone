import 'intl-pluralrules'

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Container, NativeBaseProvider, View, extendTheme, useColorMode } from "native-base";
import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";
import AuthProvider from "./src/containers/AuthProvider";
import store from "./src/redux/store";
import AuthStack from "./src/routes/Stacks/AuthStack";
import UserStack from "./src/routes/Stacks/UserStack";
import { fetcher } from "./src/services/backend/axiosClient";
import { LogBox } from "react-native";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import customParseFormat from "dayjs/plugin/customParseFormat";
import TypesafeI18n, { I18nContext, useI18nContext } from './src/i18n/i18n-react';
import { useEffect } from 'react';
import { loadAllLocalesAsync } from './src/i18n/i18n-util.async';
import { loadAllLocales } from './src/i18n/i18n-util.sync';
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

dayjs.extend(customParseFormat);
dayjs.extend(utc)

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
  colors: {
    primary: {
      50: '#E3F2F9',
      100: '#C5E4F3',
      200: '#A2D4EC',
      300: '#7AC1E4',
      400: '#47A9DA',
      500: '#0088CC',
      600: '#007AB8',
      700: '#006BA1',
      800: '#005885',
      900: '#003F5E',
    },
  }
});

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
}

const NavigationProvider = () => { 
  const { setLocale } = useI18nContext();
  const {
    colorMode,
  } = useColorMode();
  
  useEffect(() => {
    loadAllLocales();
    setLocale("en");
  }, [])

  return (
  <NavigationContainer theme={colorMode === "light" ? LightTheme : DarkTheme}>
    <AuthProvider
      authComponent={UserStack}
      unAuthComponent={AuthStack}
    />
  </NavigationContainer>)
}


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
    <TypesafeI18n locale="en">
      <SWRConfig
        value={{
          refreshInterval: 300000,
          fetcher: fetcher,
        }}
      >
        <Provider store={store}>
          <NativeBaseProvider theme={theme}>
            <NavigationProvider />
          </NativeBaseProvider>
        </Provider>
      </SWRConfig>
    </TypesafeI18n>
  );
}
