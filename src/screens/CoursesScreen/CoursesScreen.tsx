import { Text, VStack, HStack } from "native-base";
import CourseItem from "../../components/CourseItem";
import { useNavigation } from "@react-navigation/native";

const CoursesScreen = () => {
  const navigation = useNavigation();

  return (
    <VStack>
      <HStack>
        <Text>Image</Text>
        <VStack>
          <Text>Discover Courses</Text>
          <Text>Input Search</Text>
        </VStack>
      </HStack>
      <Text>
        LiveTutor has built the most quality, methodical and scientific courses
        in the fields of life for those who are in need of improving their
        knowledge of the fields.
      </Text>
      <Text>3 kinds of input</Text>
      <Text>Tabs</Text>
      {/* type -> courses */}
      {[...Array(5)].map((_) => (
        <CourseItem
          onClick={() => navigation.navigate("CourseDetail" as never)}
        />
      ))}
      {/* Courses List */}
    </VStack>
  );
};

export default CoursesScreen;
