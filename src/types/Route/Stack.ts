import { Course } from './../Course';
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StudentDrawerParamList } from "./Drawer";

// -----------------------------TUTORS STACK-------------------------------------

export type TutorStackParamList = {
  "Tutor List": undefined;
  "Tutor Detail": { tutorId: string };
};

export type TutorsStackNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<StudentDrawerParamList, "Tutors">,
  StackNavigationProp<TutorStackParamList>
>;

// -----------------------------COURSES STACK-------------------------------------

export type CourseStackParamList = {
  "Course List": undefined;
  "Course Detail": { courseId: string };
  "Explore Course": { courseId: string, topicId: string };
}

export type CoursesStackNavigationProp = CompositeNavigationProp<
  DrawerNavigationProp<StudentDrawerParamList, "Courses">,
  StackNavigationProp<CourseStackParamList>
>;