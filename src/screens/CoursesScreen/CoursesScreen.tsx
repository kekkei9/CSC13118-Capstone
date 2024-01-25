import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Flex,
  HStack,
  Input,
  Select,
  Text,
  VStack,
  useColorModeValue
} from "native-base";
import React, { useEffect, useRef, useState } from "react";
import { Animated, FlatList, Pressable, useWindowDimensions } from "react-native";
import { SvgUri } from "react-native-svg";
import { SceneMap, TabView } from "react-native-tab-view";
import useSWR from "swr";
import { useI18nContext } from "../../i18n/i18n-react";
import { Course } from "../../types/Course";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { CoursesStackNavigationProp } from "../../types/Route/Stack";
import _ from "lodash";
import CourseItem from "../../components/CourseItem";
import * as WebBrowser from 'expo-web-browser';

function VirtualizedView({
  children,
  getRef, ...props
}: { children?: any, getRef?: any } & any) {
  const {data, renderItem, ...otherProps} = props
  const flatListRef = useRef();

  useEffect(() => {
    if (getRef && flatListRef.current)
    getRef(flatListRef.current)
  }, [flatListRef]);


  function header() {
    return <React.Fragment>{children}</React.Fragment>;
  }

  return (
    <FlatList
      ref={flatListRef}
      data={[]}
      ListEmptyComponent={null}
      renderItem={null}
      ListHeaderComponent={header()}
      {...otherProps}
    />
  );
}

const renderScene = SceneMap({
  course: () => <></>,
  "e-book": () => <></>,
  "interactive-e-book": () => <></>,
});

const CoursesScreen = () => {
  const {LL} = useI18nContext();
  const layout = useWindowDimensions();

  const [search, setSearch] = useState<string>("");
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState<{ key: string; title: string }[]>([
    {
      key: "course",
      title: "Course",
    },
    {
      key: "e-book",
      title: "E-Book",
    },
    {
      key: "interactive-e-book",
      title: "Interactive E-book",
    },
  ]);
  const navigation = useNavigation<CoursesStackNavigationProp>();

  const renderTabBar = (props: any) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route: any, i: number) => {
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

  const currentRoute = routes[index].key;

  const { data: coursesList } = useSWR<BaseResponseList<Course>>(
    `/${currentRoute}?page=1&size=${currentRoute === "course" ? 100 : 10}&q=${search}`
  );

  return (
    <VirtualizedView>
      <VStack px={10} py={9} flex={1}>
        <HStack space={6}>
          <SvgUri
            uri="https://sandbox.app.lettutor.com/static/media/course.0bf1bb71.svg"
            width={100}
            height={100}
          />
          <VStack flex={1}>
            <Text fontSize={24} fontWeight={600}>
              {LL.courses.discoverCourses()}
            </Text>
            <Input placeholder="Course" w={"full"} value={search} onChangeText={setSearch}/>
          </VStack>
        </HStack>
        <Text my={4}>
          {LL.courses.liveTutorHasBuilt()}
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
        <TabView
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
        <VStack pt={8} space={16}>
          {_.entries(_.groupBy(coursesList?.data.rows, "categories[0].title")).map(([category, courses])  => (
            <VStack justifyContent={"center"} key={category} space={8}>
              <Text fontSize={28} fontWeight={500}>
                {category}
              </Text>
              {courses.map((course) => (
                <CourseItem
                  course={course} 
                  onClick={() => {
                    if (currentRoute === "course") {
                      navigation.navigate("Course Detail", {courseId: course.id})
                      return;
                    }
                    WebBrowser.openBrowserAsync(course.fileUrl || "https://expo.dev");
                  }}
                  key={course.id}
                />
              ))}
            </VStack>
          ))}
        </VStack>
      </VStack>
    </VirtualizedView>
  );
};

export default CoursesScreen;
