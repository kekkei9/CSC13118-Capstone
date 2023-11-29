import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  logOut,
  setRole,
} from "../../redux/authentication/authentication.slice";

const CustomDrawerContent = (props: any) => {
  const dispatch = useAppDispatch();
  const { role } = useAppSelector((state) => state.authentication);

  const oppositeRole = role === "student" ? "teacher" : "student";

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label={`Switch to ${oppositeRole}`}
        onPress={() => dispatch(setRole(oppositeRole))}
      />
      <DrawerItem label="Log out" onPress={() => dispatch(logOut())} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
