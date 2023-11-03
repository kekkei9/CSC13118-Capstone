import { ScrollView, Text, VStack, Image, Pressable } from "native-base";
import { useState } from "react";

const TOPIC_LIST = [
  "The Internet",
  "Artificial Intelligence (AI)",
  "Social Media",
  "Internet Privacy",
  "Live Streaming",
  "Coding",
  "Technology Transforming Healthcare",
  "Smart Home Technology",
  "Remote Work - A Dream Job?",
];

const TopicDetailScreen = () => {
  const [currentTopic, setCurrentTopic] = useState<number>(0);

  return (
    <ScrollView>
      <VStack flex={1} px={2.5} py={9} backgroundColor={"#fff"}>
        <Image
          source={{
            uri: "https://camblycurriculumicons.s3.amazonaws.com/5e0e8b212ac750e7dc9886ac?h=d41d8cd98f00b204e9800998ecf8427e",
          }}
          h={290}
          alt="Course Image"
        />
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Life in the Internet Age
        </Text>
        <Text mt={4} mx={8}>
          Let's discuss how technology is changing the way we live
        </Text>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          List Topics
        </Text>
        <VStack space={3.5} mt={4} mx={6}>
          {TOPIC_LIST.map((topic, index) => (
            <Pressable
              py={2.5}
              px={5}
              backgroundColor={
                currentTopic === index ? "rgba(0, 0, 0, 0.08)" : "#fff"
              }
              onPress={() => setCurrentTopic(index)}
              rounded={"2xl"}
            >
              <Text key={index} fontSize={16} fontWeight={500}>
                {index + 1}. {topic}
              </Text>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default TopicDetailScreen;
