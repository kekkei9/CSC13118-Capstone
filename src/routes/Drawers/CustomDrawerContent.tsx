import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useAppDispatch } from "../../redux/store";
import { logOut } from "../../redux/authentication/authentication.slice";
import { useI18nContext } from "../../i18n/i18n-react";

const CustomDrawerContent = (props: any) => {
  const {LL} = useI18nContext();
  const dispatch = useAppDispatch();
  const role = "student";
  const oppositeRole = role === "student" ? "teacher" : "student";

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={`Switch to ${oppositeRole}`} onPress={() => {}} />
      <DrawerItem label={LL.nav.logOut()} onPress={() => dispatch(logOut())} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
