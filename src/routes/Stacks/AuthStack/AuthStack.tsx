import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../../../screens/LoginScreen";
import SignUpScreen from "../../../screens/SignUpScreen";
import TopNav from "../../../containers/TopNav";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ForgotPasswordScreen from "../../../screens/ForgetPasswordScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  const insets = useSafeAreaInsets();
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: () => <TopNav />,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
