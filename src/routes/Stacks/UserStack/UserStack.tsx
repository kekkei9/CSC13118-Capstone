import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherDrawer from "../../Drawers/TeacherDrawer";
import StudentDrawer from "../../Drawers/StudentDrawer/StudentDrawer";
import { useAppSelector } from "../../../redux/store";

const Stack = createStackNavigator();

const UserStack = () => {
  const user = useAppSelector((state) => state.authentication.data);

  return (
    <>
      {user?.roles.includes("teacher") ? <TeacherDrawer /> : <StudentDrawer />}
    </>
  );
};

export default UserStack;
