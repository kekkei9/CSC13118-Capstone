import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { ScrollView, Text, VStack, Image, Pressable, View } from "native-base";
import { useEffect, useState } from "react";
import { CourseStackParamList, CoursesStackNavigationProp } from "../../types/Route/Stack";
import useSWR from "swr";
import { BaseResponse } from "../../types/Response/BaseResponse";
import { Course } from "../../types/Course";
import { useI18nContext } from "../../i18n/i18n-react";
import PDFReader from 'rn-pdf-reader-js'

const ExploreCourseScreen = () => {
  const {LL} = useI18nContext();
  const [currentTopicId, setCurrentTopicId] = useState<string>(""); 
  const { params } = useRoute<RouteProp<CourseStackParamList, "Explore Course">>()

  useEffect(() => {
    setCurrentTopicId(params.topicId)
  }, [params.topicId])

  const {data: courseResponse} = useSWR<BaseResponse<Course>>(`/course/${params.courseId}`)

  const pdfUrl = courseResponse?.data.topics.find(topic => topic.id === currentTopicId)?.nameFile;
  console.log(pdfUrl)

  return (
    <ScrollView>
      <VStack 
        flex={1} px={2.5} py={9} 
        _light={{ backgroundColor: "white" }}
        _dark={{ backgroundColor: "gray.700" }}
      >
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
          {LL.courses.listTopics()}
        </Text>
        <VStack space={3.5} mt={4} mx={6}>
          {courseResponse?.data.topics.map((topic, index) => (
            <Pressable
              py={2.5}
              px={5}
              _light={{backgroundColor:
                currentTopicId === topic.id ? "rgba(0, 0, 0, 0.08)" : "#fff"
              }}
              _dark={{backgroundColor: 
                currentTopicId === topic.id ? "rgba(255, 255, 255, 0.08)" : "#000"
              }}
              onPress={() => setCurrentTopicId(topic.id)}
              rounded={"2xl"}
              key={topic.id}
            >
              <Text fontSize={16} fontWeight={500}>
                {index + 1}. {topic.name}
              </Text>
            </Pressable>
          ))}
          { pdfUrl ?
            <View>
            <PDFReader
              source={{
                uri: pdfUrl,
              }}
              style={{
                width: "100%",
                height: 800,
              }}
            />
          </View>
          : null }
          
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ExploreCourseScreen;
