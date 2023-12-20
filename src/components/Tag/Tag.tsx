import { Pressable, Text } from "native-base";

type TagProps = {
  content: string;
  checked?: boolean;
  onPress?: () => void;
};

const Tag = ({ content, checked, onPress }: TagProps) => {
  return (
    <Pressable
      mr={2}
      mb={2}
      backgroundColor={checked ? "rgb(221, 234, 255)" : "rgb(228, 230, 235)"}
      py={1.5}
      px={3}
      rounded={"full"}
      onPress={onPress}
    >
      <Text color={checked ? "rgb(0, 113, 240)" : "rgb(100, 100, 100)"}>
        {content}
      </Text>
    </Pressable>
  );
};

export default Tag;
