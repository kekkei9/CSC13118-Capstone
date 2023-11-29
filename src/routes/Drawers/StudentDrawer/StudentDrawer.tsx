import { createDrawerNavigator } from "@react-navigation/drawer";
import TutorsStack from "../../Stacks/TutorsStack";
import ScheduleScreen from "../../../screens/ScheduleScreen";
import HistoryScreen from "../../../screens/HistoryScreen";
import CoursesStack from "../../Stacks/CoursesStack";
import DialScreen from "../../../screens/DialScreen";

const Drawer = createDrawerNavigator();

const StudentDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="SignUp"
      screenOptions={{ sceneContainerStyle: { flex: 1 } }}
    >
      <Drawer.Screen name="Tutors" component={TutorsStack} />
      <Drawer.Screen name="Schedule" component={ScheduleScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Courses" component={CoursesStack} />
      <Drawer.Screen name="Dial" component={DialScreen} />
    </Drawer.Navigator>
  );
};

export default StudentDrawer;
