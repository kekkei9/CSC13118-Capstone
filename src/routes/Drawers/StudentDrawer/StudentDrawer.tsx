import { createDrawerNavigator } from "@react-navigation/drawer";
import TopNav from "../../../containers/TopNav";
import HistoryScreen from "../../../screens/HistoryScreen";
import ScheduleScreen from "../../../screens/ScheduleScreen";
import CoursesStack from "../../Stacks/CoursesStack";
import TutorsStack from "../../Stacks/TutorsStack";
import CustomDrawerContent from "../CustomDrawerContent";
import DialScreen from "../../../screens/DialScreen";
import SettingScreen from "../../../screens/SettingScreen";
import { useI18nContext } from "../../../i18n/i18n-react";

const Drawer = createDrawerNavigator();

const StudentDrawer = () => {
  const {LL} = useI18nContext();

  return (
    <Drawer.Navigator
      initialRouteName={LL.nav.tutors() || "Tutors"}
      screenOptions={{
        sceneContainerStyle: { flex: 1 },
        header: () => <TopNav />,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name={LL.nav.tutors() || "Tutors"} component={TutorsStack}/>
      <Drawer.Screen name={LL.nav.schedule() || "Schedule"} component={ScheduleScreen} />
      <Drawer.Screen name={LL.nav.history() || "History"} component={HistoryScreen} />
      <Drawer.Screen name={LL.nav.courses() || "Courses"} component={CoursesStack} />
      {/* <Drawer.Screen name="Dial" component={DialScreen} options={{drawerItemStyle: {display:'none'}}} /> */}
      <Drawer.Screen name={LL.nav.settings() || "Settings"} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default StudentDrawer;
