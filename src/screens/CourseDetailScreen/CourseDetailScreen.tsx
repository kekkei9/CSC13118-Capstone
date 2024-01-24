import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faBook, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import {
  Button,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import useSWR from "swr";
import { Course } from "../../types/Course";
import { BaseResponse } from "../../types/Response/BaseResponse";
import { CourseStackParamList, CoursesStackNavigationProp } from "../../types/Route/Stack";
import { levelLabelMapper } from "../../constants/LevelConstant";

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

const CourseDetailScreen = () => {
  const navigation = useNavigation<CoursesStackNavigationProp>();

  const { params } = useRoute<RouteProp<CourseStackParamList, "Course Detail">>()

  const {data: courseResponse} = useSWR<BaseResponse<Course>>(`/course/${params.courseId}`)

  return (
    <ScrollView showsVerticalScrollIndicator={false} px={6} py={8}>
      <VStack pb={20}>
        <VStack
          overflow={"hidden"}
          shadow={3}
          _light={{ backgroundColor: "white" }}
          _dark={{ backgroundColor: "gray.700" }}
          rounded={"2xl"}
        >
          <Image
            source={{
              uri: courseResponse?.data.imageUrl,
            }}
            h={193}
            alt="Course Image"
          />
          <VStack p={6}>
            <Text fontSize={16} fontWeight={600} mb={2}>
              {courseResponse?.data.name}
            </Text>
            <Text fontSize={12} color={"rgb(128, 128, 128)"}>
              {courseResponse?.data.description}
            </Text>
            <Button
              mt={4}
              onPress={() => navigation.navigate("Explore Course", {courseId: params.courseId, topicId: courseResponse?.data.topics[0].id || ""})}
            >
              Discover
            </Button>
          </VStack>
        </VStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Overview
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faQuestionCircle} color="#C75340" />
          <Text fontSize={16} fontWeight={500}>
            Why take this course
          </Text>
        </HStack>
        <Text ml={6} mt={2}>
          {courseResponse?.data.reason}
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faQuestionCircle} color="#C75340" />
          <Text fontSize={16} fontWeight={500}>
            What will you be able to do
          </Text>
        </HStack>
        <Text ml={6} mt={2}>
          {courseResponse?.data.purpose}
        </Text>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Experience Level
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faUserPlus} color="#4464B8" />
          <Text fontSize={16} fontWeight={500}>
            {levelLabelMapper[courseResponse?.data.level as keyof typeof levelLabelMapper]}
          </Text>
        </HStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Course Length
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faBook} color="#4464B8" />
          <Text fontSize={16} fontWeight={500}>
            {courseResponse?.data.topics.length} topics
          </Text>
        </HStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          List Topics
        </Text>
        <VStack space={3.5} mt={4}>
          {courseResponse?.data.topics.map((topic, index) => (
            <Pressable
              p={4}
              backgroundColor={"rgba(232, 232, 232, 0.106)"}
              borderColor={"rgba(215, 215, 215, 0.44)"}
              borderWidth={2}
              onPress={() => navigation.navigate("Explore Course", {courseId: params.courseId, topicId: topic.id})}
              rounded={"sm"}
              key={index}
            >
              <Text fontSize={16} fontWeight={500}>
                {index + 1}. {topic.name}
              </Text>
            </Pressable>
          ))}
        </VStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Suggested Tutors
        </Text>
        <VStack mt={4} ml={3}>
          {courseResponse?.data.users?.map((user, index) => 
          (<HStack>
            <Text>{user.name} </Text>
            {/* <Text color="#1890ff">More Info</Text> */}
          </HStack>))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CourseDetailScreen;
