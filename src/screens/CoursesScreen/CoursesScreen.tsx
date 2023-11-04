import {
  Text,
  VStack,
  HStack,
  ScrollView,
  Input,
  Select,
  Flex,
  Center,
  Box,
  useColorModeValue,
  View,
} from "native-base";
import CourseItem from "../../components/CourseItem";
import { useNavigation } from "@react-navigation/native";
import { SvgUri } from "react-native-svg";
import { Animated, Dimensions, Pressable, StatusBar } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";
import { useState } from "react";

const FirstRoute = () => (
  <VStack flex={1} my="4">
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
    <Text>This is Tab 1</Text>
  </VStack>
);

const SecondRoute = () => (
  <Center flex={1} my="4">
    This is Tab 2
  </Center>
);

const ThirdRoute = () => (
  <Center flex={1} my="4">
    This is Tab 3
  </Center>
);

const initialLayout = {
  width: Dimensions.get("window").width,
};
const renderScene = SceneMap({
  course: FirstRoute,
  ebook: SecondRoute,
  interactiveEbook: ThirdRoute,
});

const CoursesScreen = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<{ key: string; title: string }[]>([
    {
      key: "course",
      title: "Course",
    },
    {
      key: "ebook",
      title: "E-Book",
    },
    {
      key: "interactiveEbook",
      title: "Interactive E-book",
    },
  ]);
  const navigation = useNavigation();

  const renderTabBar = (props: any) => {
    const inputRange = props.navigationState.routes.map(
      (x: any, i: number) => i
    );
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: any) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color =
            index === i
              ? useColorModeValue("#000", "#e5e5e5")
              : useColorModeValue("#1f2937", "#a1a1aa");
          const borderColor =
            index === i
              ? "cyan.500"
              : useColorModeValue("coolGray.200", "gray.400");
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              alignItems="center"
              p="3"
              key={i}
            >
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}
              >
                <Animated.Text
                  style={{
                    color,
                  }}
                >
                  {route.title}
                </Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack px={10} py={9} flex={1}>
        <HStack space={6}>
          <SvgUri
            uri="https://sandbox.app.lettutor.com/static/media/course.0bf1bb71.svg"
            width={100}
            height={100}
          />
          <VStack flex={1}>
            <Text fontSize={24} fontWeight={600}>
              Discover
            </Text>
            <Text fontSize={24} fontWeight={600}>
              Courses
            </Text>
            <Input placeholder="Course" w={"full"} />
          </VStack>
        </HStack>
        <Text my={4}>
          LiveTutor has built the most quality, methodical and scientific
          courses in the fields of life for those who are in need of improving
          their knowledge of the fields.
        </Text>
        <Flex
          w={"full"}
          wrap="wrap"
          flexDirection={"row"}
          justifyContent={"space-between"}
        >
          {["Select level", "Select category", "Sort by level"].map(
            (placeholder, index) => (
              <Select key={index} w={150} mb={2} placeholder={placeholder} />
            )
          )}
        </Flex>
        <Flex flex={1} flexDirection={"row"}>
          <TabView
            navigationState={{
              index,
              routes,
            }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout}
            style={{
              marginTop: StatusBar.currentHeight,
            }}
          />
        </Flex>
        <VStack pt={8} space={16}>
          {/* Categories -> Courses */}
          {[...Array(3)].map((_, index) => (
            <VStack justifyContent={"center"} key={index} space={8}>
              <Text fontSize={28} fontWeight={500}>
                English For Traveling
              </Text>
              {[...Array(5)].map((_, index) => (
                <CourseItem
                  onClick={() => navigation.navigate("Course Detail" as never)}
                  key={index}
                />
              ))}
            </VStack>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default CoursesScreen;
