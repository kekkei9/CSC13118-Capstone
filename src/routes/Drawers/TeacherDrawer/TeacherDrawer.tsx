import { createDrawerNavigator } from "@react-navigation/drawer";
import TopNav from "../../../containers/TopNav";
import { useI18nContext } from "../../../i18n/i18n-react";
import ScheduleScreen from "../../../screens/ScheduleScreen";
import SettingScreen from "../../../screens/SettingScreen";
import CoursesStack from "../../Stacks/CoursesStack";
import CustomDrawerContent from "../CustomDrawerContent";
import EditProfileScreen from "../../../screens/EditProfileScreen";

const Drawer = createDrawerNavigator();

const TeacherDrawer = () => {
  const {LL} = useI18nContext();
 
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
      {/* <Drawer.Screen name="Profile" component={EditProfileScreen} /> */}
      <Drawer.Screen name={LL.nav.schedule() || "Schedule"} component={ScheduleScreen} />
      <Drawer.Screen name={LL.nav.courses() || "Courses"} component={CoursesStack} />
      <Drawer.Screen name={LL.nav.settings() || "Settings"} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default TeacherDrawer;
