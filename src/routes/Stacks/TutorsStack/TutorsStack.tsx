import { createStackNavigator } from "@react-navigation/stack";
import TutorListScreen from "../../../screens/TutorListScreen";
import TutorDetailScreen from "../../../screens/TutorDetailScreen";

const Stack = createStackNavigator();

const TutorsStack = () => (
  <Stack.Navigator initialRouteName="Tutor List">
    <Stack.Screen name="Tutor List" component={TutorListScreen} />
    <Stack.Screen name="Tutor Detail" component={TutorDetailScreen} />
  </Stack.Navigator>
);

export default TutorsStack;
