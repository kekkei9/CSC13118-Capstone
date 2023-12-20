import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAppDispatch } from "../../redux/store";

const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const role = "student";
  const oppositeRole = role === "student" ? "teacher" : "student";

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={`Switch to ${oppositeRole}`} onPress={() => {}} />
      <DrawerItem label="Log out" onPress={() => {}} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
