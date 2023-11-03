import { Text, VStack, HStack, ScrollView, Image } from "native-base";
import CourseItem from "../../components/CourseItem";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";

const CoursesScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView px={10} py={9}>
      <HStack space={6}>
        <SvgUri
          uri="https://sandbox.app.lettutor.com/static/media/course.0bf1bb71.svg"
          width={100}
          height={100}
        />
        <VStack>
          <Text fontSize={24} fontWeight={600}>
            Discover Courses
          </Text>
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
    </ScrollView>
  );
};

export default CoursesScreen;
