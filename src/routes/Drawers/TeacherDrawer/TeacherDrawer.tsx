import { createDrawerNavigator } from "@react-navigation/drawer";
import TopNav from "../../../containers/TopNav";
import HistoryScreen from "../../../screens/HistoryScreen";
import ScheduleScreen from "../../../screens/ScheduleScreen";
import CoursesStack from "../../Stacks/CoursesStack";
import TutorsStack from "../../Stacks/TutorsStack";
import CustomDrawerContent from "../CustomDrawerContent";

const Drawer = createDrawerNavigator();

const TeacherDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Tutors"
      screenOptions={{
        sceneContainerStyle: { flex: 1 },
        header: () => <TopNav />,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Schedule" component={ScheduleScreen} />
      <Drawer.Screen name="Courses" component={CoursesStack} />
    </Drawer.Navigator>
  );
};

export default TeacherDrawer;
