import { Image, Pressable, Text, VStack } from "native-base";
import { Course } from "../../types/Course";
import { levelLabelMapper } from "../../constants/LevelConstant";
import _ from "lodash";
import { useI18nContext } from "../../i18n/i18n-react";

type CourseItemProps = {
  course: Course;
  onClick: () => void;
};

const CourseItem = ({ course, onClick }: CourseItemProps) => {
  const {LL} = useI18nContext();

  return (
    <Pressable
      onPress={onClick}
      rounded={"2xl"}
      shadow={3}
      _light={{ backgroundColor: "white" }}
      _dark={{ backgroundColor: "gray.700" }}
    >
      <Image
        roundedTop={"2xl"}
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
        <Text mt={10}>{levelLabelMapper[course.level as keyof typeof levelLabelMapper]} - {course.topics.length} {_.startCase(LL.ui.lessons())}</Text>
      </VStack>
    </Pressable>
  );
};

export default CourseItem;
