import { createStackNavigator } from "@react-navigation/stack";
import CoursesScreen from "../../../screens/CoursesScreen";
import CourseDetailScreen from "../../../screens/CourseDetailScreen";
import TopicDetailScreen from "../../../screens/TopicDetailScreen";

const Stack = createStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Course List">
      <Stack.Screen name="Course List" component={CoursesScreen} />
      <Stack.Screen name="Course Detail" component={CourseDetailScreen} />
      <Stack.Screen name="Topic Detail" component={TopicDetailScreen} />
    </Stack.Navigator>
  );
};

export default CoursesStack;
