import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, VStack, Image, Pressable } from "native-base";
import { useEffect, useState } from "react";
import { CourseStackParamList, CoursesStackNavigationProp } from "../../types/Route/Stack";
import useSWR from "swr";
import { BaseResponse } from "../../types/Response/BaseResponse";
import { Course } from "../../types/Course";

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

const ExploreCourseScreen = () => {
  const [currentTopicId, setCurrentTopicId] = useState<string>(""); 
  const { params } = useRoute<RouteProp<CourseStackParamList, "Explore Course">>()

  useEffect(() => {
    setCurrentTopicId(params.topicId)
  }, [params.topicId])

  const {data: courseResponse} = useSWR<BaseResponse<Course>>(`/course/${params.courseId}`)

  return (
    <ScrollView>
      <VStack flex={1} px={2.5} py={9} backgroundColor={"#fff"}>
        <Image
          source={{
            uri: courseResponse?.data.imageUrl,
          }}
          h={290}
          alt="Course Image"
        />
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          {courseResponse?.data.name}
        </Text>
        <Text mt={4} mx={8}>
          {courseResponse?.data.description}
        </Text>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          List Topics
        </Text>
        <VStack space={3.5} mt={4} mx={6}>
          {courseResponse?.data.topics.map((topic, index) => (
            <Pressable
              py={2.5}
              px={5}
              backgroundColor={
                currentTopicId === topic.id ? "rgba(0, 0, 0, 0.08)" : "#fff"
              }
              onPress={() => setCurrentTopicId(topic.id)}
              rounded={"2xl"}
              key={topic.id}
            >
              <Text fontSize={16} fontWeight={500}>
                {index + 1}. {topic.name}
              </Text>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ExploreCourseScreen;