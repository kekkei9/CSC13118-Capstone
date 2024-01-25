import { createStackNavigator } from "@react-navigation/stack";
import CoursesScreen from "../../../screens/CoursesScreen";
import CourseDetailScreen from "../../../screens/CourseDetailScreen";
import ExploreCourseScreen from "../../../screens/ExploreCourseScreen";

const Stack = createStackNavigator();

const CoursesStack = () => {
  return (
    <Stack.Navigator initialRouteName="Course List">
      <Stack.Screen name="Course List" component={CoursesScreen} options={{headerShown: false}}/>
      <Stack.Screen name="Course Detail" component={CourseDetailScreen} />
      <Stack.Screen name="Explore Course" component={ExploreCourseScreen} />
    </Stack.Navigator>
  );
};

export default CoursesStack;
