import { createDrawerNavigator } from "@react-navigation/drawer";
import TopNav from "../../../containers/TopNav";
import HistoryScreen from "../../../screens/HistoryScreen";
import ScheduleScreen from "../../../screens/ScheduleScreen";
import CoursesStack from "../../Stacks/CoursesStack";
import TutorsStack from "../../Stacks/TutorsStack";
import CustomDrawerContent from "../CustomDrawerContent";
import DialScreen from "../../../screens/DialScreen";
import SettingScreen from "../../../screens/SettingScreen";

const Drawer = createDrawerNavigator();

const StudentDrawer = () => {
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
      <Drawer.Screen name="Tutors" component={TutorsStack} />
      <Drawer.Screen name="Schedule" component={ScheduleScreen} />
      <Drawer.Screen name="History" component={HistoryScreen} />
      <Drawer.Screen name="Courses" component={CoursesStack} />
      <Drawer.Screen name="Dial" component={DialScreen} options={{drawerItemStyle: {display:'none'}}} />
      <Drawer.Screen name="Settings" component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default StudentDrawer;
