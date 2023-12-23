import { Image, Pressable, Text, VStack } from "native-base";
import { Course } from "../../types/Course";
import { levelLabelMapper } from "../../constants/LevelConstant";

type CourseItemProps = {
  course: Course;
  onClick: () => void;
};

const CourseItem = ({ course, onClick }: CourseItemProps) => {
  return (
    <Pressable
      onPress={onClick}
      rounded={"2xl"}
      overflow={"hidden"}
      shadow={3}
      backgroundColor={"white"}
    >
      <Image
        source={{
          uri: course.imageUrl,
        }}
        h={193}
        alt="Course Image"
      />
      <VStack p={6}>
        <Text fontSize={16} fontWeight={600} mb={2}>
          {course.name}
        </Text>
        <Text fontSize={12} color={"rgb(128, 128, 128)"}>
          {course.description}
        </Text>
        <Text mt={10}>{levelLabelMapper[course.level as keyof typeof levelLabelMapper]} - {course.topics.length} Lessons</Text>
      </VStack>
    </Pressable>
  );
};

export default CourseItem;
