import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TeacherDrawer from "../../Drawers/TeacherDrawer";
import StudentDrawer from "../../Drawers/StudentDrawer/StudentDrawer";
import { useAppSelector } from "../../../redux/store";

const Stack = createStackNavigator();

const UserStack = () => {
  const { role } = useAppSelector((state) => state.authentication);

  return <>{role === "student" ? <StudentDrawer /> : <TeacherDrawer />}</>;
};

export default UserStack;
