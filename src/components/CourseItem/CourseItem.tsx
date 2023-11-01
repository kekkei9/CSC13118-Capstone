import { Text, VStack } from "native-base";

type CourseItemProps = {
  onClick: () => void;
};

const CourseItem = ({ onClick }: CourseItemProps) => {
  return (
    <VStack onPointerDown={onClick}>
      <Text>EHE</Text>
    </VStack>
  );
};

export default CourseItem;
