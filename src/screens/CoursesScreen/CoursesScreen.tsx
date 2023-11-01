import { Text, VStack, HStack } from "native-base";

const CoursesScreen = () => {
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
      {/* Courses List */}
    </VStack>
  );
};

export default CoursesScreen;
