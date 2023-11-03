import { Image, Pressable, Text, VStack } from "native-base";

type CourseItemProps = {
  onClick: () => void;
};

const CourseItem = ({ onClick }: CourseItemProps) => {
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
          uri: "https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e",
        }}
        h={193}
        alt="Course Image"
      />
      <VStack p={6}>
        <Text fontSize={16} fontWeight={600} mb={2}>
          Life in the Internet Age
        </Text>
        <Text fontSize={12} color={"rgb(128, 128, 128)"}>
          Let's discuss how technology is changing the way we live
        </Text>
        <Text mt={10}>Intermediate - 9 Lessons</Text>
      </VStack>
    </Pressable>
  );
};

export default CourseItem;
