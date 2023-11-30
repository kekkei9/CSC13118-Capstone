import { Container, Text } from "native-base";

type TagProps = {
  content: string;
};

const Tag = ({ content }: TagProps) => {
  return (
    <Container
      mr={2}
      mb={2}
      backgroundColor={"rgb(221, 234, 255)"}
      py={1.5}
      px={3}
      rounded={"full"}
    >
      <Text color={"rgb(0, 113, 240)"}>{content}</Text>
    </Container>
  );
};

export default Tag;
