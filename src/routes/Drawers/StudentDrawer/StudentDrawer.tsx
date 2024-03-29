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
import EditProfileScreen from "../../../screens/EditProfileScreen";
import ChangePasswordScreen from "../../../screens/ChangePasswordScreen";

const Drawer = createDrawerNavigator();

const StudentDrawer = () => {
  const {LL} = useI18nContext();

  return (
    <Drawer.Navigator
      screenOptions={{
        sceneContainerStyle: { flex: 1 },
        header: () => <TopNav />,
        drawerPosition: "right",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={LL.nav.tutors() || "Tutors"}
    >
      <Drawer.Screen name={LL.nav.profile() || "Profile"} component={EditProfileScreen} />
      <Drawer.Screen name={LL.nav.tutors() || "Tutors"} component={TutorsStack} />
      <Drawer.Screen name={LL.nav.schedule() || "Schedule"} component={ScheduleScreen} />
      <Drawer.Screen name={LL.nav.history() || "History"} component={HistoryScreen} />
      <Drawer.Screen name={LL.nav.courses() || "Courses"} component={CoursesStack} />
      <Drawer.Screen name="Dial" component={DialScreen} options={{drawerItemStyle: {display:'none'}}} />
      <Drawer.Screen name="Change Password" component={ChangePasswordScreen} options={{drawerItemStyle: {display:'none'}}} />
      <Drawer.Screen name={LL.nav.settings() || "Settings"} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default StudentDrawer;
