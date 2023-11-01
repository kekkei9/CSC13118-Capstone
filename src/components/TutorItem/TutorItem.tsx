import { HStack, VStack, Text, Flex, Button } from "native-base";

type TutorItemProps = {
  onClick: () => void;
};

const TutorItem = ({ onClick }: TutorItemProps) => {
  return (
    <VStack onPointerDown={onClick}>
      <HStack>
        <VStack>
          <Text>img</Text>
          <Text>country</Text>
          <Text>star</Text>
        </VStack>
        <Text>heart</Text>
      </HStack>
      <Flex wrap="wrap" w="full">
        <Text>English for kids</Text>
        <Text>English for kids</Text>
        <Text>English for kids</Text>
        <Text>English for kids</Text>
        <Text>English for kids</Text>
        <Text>English for kids</Text>
      </Flex>
      <Text numberOfLines={4}>
        I was a customer service sales executive for 3 years before I become an
        ESL teacher I am trained to deliver excellent service to my clients so I
        can help you with business English dealing with customers or in
        sales-related jobs and a lot more, I also love to teach beginner,
        intermediate and advance I speak slowly and clearly so that the student
        can easily follow my instructions and pronunciation. In my class, I want
        environment-friendly fun and engaging I have many activities designed to
        help your enthusiasm in learning the language. I'm so excited to meet
        you in one of my classes let us have fun while learning English. See you
        there.
      </Text>
      <Button alignSelf={"end"}>Book</Button>
    </VStack>
  );
};

export default TutorItem;
