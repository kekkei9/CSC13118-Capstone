import { NativeBaseProvider } from "native-base";
import LoginScreen from "./src/screens/LoginScreen";
import MainLayout from "./src/layouts/MainLayout/MainLayout";

export default function App() {
  return (
    <NativeBaseProvider>
      <MainLayout>
        <LoginScreen />
      </MainLayout>
    </NativeBaseProvider>
  );
}
