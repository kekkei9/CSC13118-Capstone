import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faBook, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  ScrollView,
  Text,
  VStack,
  Image,
  Button,
  HStack,
  Pressable,
} from "native-base";
import TopicItem from "../../components/TopicItem";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false} px={6} py={8}>
      <VStack pb={20}>
        <VStack
          overflow={"hidden"}
          shadow={3}
          backgroundColor={"white"}
          rounded={"2xl"}
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
            <Button mt={4}>Discover</Button>
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
          Our world is rapidly changing thanks to new technology, and the
          vocabulary needed to discuss modern life is evolving almost daily. In
          this course you will learn the most up-to-date terminology from
          expertly crafted lessons as well from your native-speaking tutor.
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faQuestionCircle} color="#C75340" />
          <Text fontSize={16} fontWeight={500}>
            What will you be able to do
          </Text>
        </HStack>
        <Text ml={6} mt={2}>
          You will learn vocabulary related to timely topics like remote work,
          artificial intelligence, online privacy, and more. In addition to
          discussion questions, you will practice intermediate level speaking
          tasks such as using data to describe trends.
        </Text>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Experience Level
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faUserPlus} color="#4464B8" />
          <Text fontSize={16} fontWeight={500}>
            Intermediate
          </Text>
        </HStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Course Length
        </Text>
        <HStack space={2} alignItems={"center"} mt={4}>
          <FontAwesomeIcon icon={faBook} color="#4464B8" />
          <Text fontSize={16} fontWeight={500}>
            9 topics
          </Text>
        </HStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          List Topics
        </Text>
        <VStack space={3.5} mt={4}>
          {TOPIC_LIST.map((topic, index) => (
            <Pressable
              p={4}
              backgroundColor={"rgba(232, 232, 232, 0.106)"}
              borderColor={"rgba(215, 215, 215, 0.44)"}
              borderWidth={2}
              onPress={() => navigation.navigate("Topic Detail" as never)}
              rounded={"sm"}
            >
              <Text key={index} fontSize={16} fontWeight={500}>
                {index + 1}. {topic}
              </Text>
            </Pressable>
          ))}
        </VStack>
        <Text fontSize={22} fontWeight={600} mt={8} ml={6}>
          Suggested Tutors
        </Text>
        <HStack mt={4} ml={3}>
          <Text>Keegan </Text>
          <Text color="#1890ff">More Info</Text>
        </HStack>
      </VStack>
    </ScrollView>
  );
};

export default CourseDetailScreen;
