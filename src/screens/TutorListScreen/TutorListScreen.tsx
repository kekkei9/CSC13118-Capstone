import { useNavigation } from "@react-navigation/native";
import _ from "lodash";
import {
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Input,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Tag from "../../components/Tag/Tag";
import TutorItem from "../../components/TutorItem/TutorItem";
import {
  TutorFilter,
  addTutorToFavorite,
  initTutorFilter,
  searchTutor,
} from "../../services/backend/TutorController";
import { axiosClient } from "../../services/backend/axiosClient";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { TutorListResponse } from "../../types/Response/TutorResponse";
import { TutorsStackNavigationProp } from "../../types/Route/Stack";
import { Tutor } from "../../types/Tutor";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import dayjs from "dayjs";

const PAGE_SIZE = 12;

const FILTER_SPECIALTIES = [
  "english-for-kids",
  "english-for-busniess",
  "conversational",
  "starters",
  "movers",
  "flyers",
  "ket",
  "pet",
  "ielts",
  "toefl",
  "toeic",
];

const TutorListScreen = () => {
  const toast = useToast();
  const navigation = useNavigation<TutorsStackNavigationProp>();
  const [tutorFilter, setTutorFilter] = useState<TutorFilter>(initTutorFilter);
  const [search, setSearch] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedGroups) return;
    let resultNationality: any = {};
    if (selectedGroups.includes("isVietnamese")) {
      resultNationality = { isVietNamese: true };
    }
    if (selectedGroups.includes("isForeign")) {
      if (selectedGroups.includes("isVietnamese")) {
        delete resultNationality.isVietNamese;
      } else {
        resultNationality = { ...resultNationality, isVietNamese: false };
      }
    }
    if (selectedGroups.includes("isNative")) {
      resultNationality = { ...resultNationality, isNative: true };
    }
    setTutorFilter((prev) => ({
      ...prev,
      nationality: resultNationality,
    }));
  }, [selectedGroups]);

  const { data: tutorsResponse, isLoading } = useSWR<Tutor[]>(
    `tutorList?search=${search}&tutorFilters=${Object.values(
      tutorFilter || {}
    ).join("")}`,
    async () => {
      if (!tutorFilter)
        return (
          await axiosClient.get<TutorListResponse>(
            `tutor/more?perPage=${PAGE_SIZE}&page=1`
          )
        ).data.tutors.rows;
      return (await searchTutor(tutorFilter, search, 1, PAGE_SIZE)).data.rows;
    }
  );

  //get latest schedule

  const {data: scheduleResponse} = useSWR<BaseResponseList<HistoryItemType>>("/booking/list/student?page=1&perPage10&inFuture=1&orderBy=meeting&sortBy=asc")
  const latestSchedule = scheduleResponse?.data.rows[0];

  const handleFavorite = async (tutorId: string) => {
    await addTutorToFavorite(tutorId);
    toast.show({
      title: "Successfully toggle favorite",
    });
  };

  const lessonTime = dayjs(latestSchedule?.scheduleDetailInfo.endPeriodTimestamp).diff(dayjs(latestSchedule?.scheduleDetailInfo.startPeriodTimestamp), "minutes")
  const hours = Math.floor(lessonTime / 60);
  const minutes = lessonTime % 60;

  const timerRef= useRef<any>(null);
  const [upcomingTimeInSeconds, setUpcomingTimeInSeconds] = useState<number>(0);
  useEffect(() => { 
    timerRef.current = setInterval(() => {
      setUpcomingTimeInSeconds(dayjs(latestSchedule?.scheduleDetailInfo.startPeriodTimestamp).diff(dayjs(), "seconds"));
    }, 500);
    return () => clearInterval(timerRef.current);
  })

  const upcomingTimeInMinutes = Math.floor(upcomingTimeInSeconds / 60);
  const upcomingTimeInHours = Math.floor(upcomingTimeInMinutes / 60);
  const displayUpcomingTime = `${upcomingTimeInHours}:${upcomingTimeInMinutes % 60}:${upcomingTimeInSeconds % 60}`;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack px={2.5} flex={1}>
        <Center
          backgroundColor={
            "linear-gradient(144deg, rgb(12, 61, 223) 0%, rgb(5, 23, 157) 100%);"
          }
          pt={4}
          pb={8}
        >
          <Text fontSize={30} mt={3} color={"white"}>
            Upcoming lesson
          </Text>
          <HStack w="full" mt={3} alignItems={"center"}>
            <Container p={2} flex={2} >
              <Text fontSize={20} color={"white"} textAlign={"center"}>
                {dayjs(latestSchedule?.scheduleDetailInfo.startPeriodTimestamp).format("ddd, DD MMM YY")}{" "}
                {dayjs(latestSchedule?.scheduleDetailInfo.startPeriodTimestamp).format("HH:mm")} - {dayjs(latestSchedule?.scheduleDetailInfo.endPeriodTimestamp).format("HH:mm")}
              </Text>
              <Text color={"#ffff00"} textAlign={"center"}>(starts in {displayUpcomingTime})</Text>
            </Container>
            <Button
              fontSize={16}
              flex={3}
              height={12}
              flexShrink={0}
              onPress={() => navigation.navigate("Dial" as never)}
              rounded={"full"}
            >
              Enter lesson room
            </Button>
          </HStack>
          <Text fontSize={16} color={"white"} mt={2}>
            Total lesson time is {hours} hours {minutes} minutes 
          </Text>
        </Center>
        <VStack py={8} px={5} space={5}>
          <Text fontWeight={700} fontSize={29}>
            Find a tutor
          </Text>
          <Input
            flex={1}
            placeholder="Enter tutor name..."
            value={search}
            onChangeText={setSearch}
          />
          <VStack space={2.5}>
            <Checkbox.Group
              accessibilityLabel="choose values"
              onChange={setSelectedGroups}
              value={selectedGroups}
            >
              <HStack space={2} mb={2}>
                <Checkbox flex={1} value="isVietnamese">
                  Vietnamese Tutor
                </Checkbox>
                <Checkbox flex={1} value="isForeign">
                  Foreign Tutor
                </Checkbox>
              </HStack>
              <HStack space={2}>
                <Checkbox flex={1} value="isNative">
                  Native English Tutor
                </Checkbox>
              </HStack>
            </Checkbox.Group>
            <Flex wrap="wrap" flexDirection="row" w="full">
              <Tag
                content={"All"}
                checked={tutorFilter?.specialties.length === 0}
                onPress={() =>
                  setTutorFilter((prev) => ({
                    ...(prev || initTutorFilter),
                    specialties: [],
                  }))
                }
              />
              {FILTER_SPECIALTIES.map((specialty, index) => (
                <Tag
                  key={index}
                  content={_.startCase(specialty.replace(/-/g, " "))}
                  checked={tutorFilter?.specialties.includes(specialty)}
                  onPress={() =>
                    setTutorFilter((prev) => ({
                      ...prev,
                      specialties: [specialty],
                    }))
                  }
                />
              ))}
            </Flex>
            <Button
              onPress={() => {
                setTutorFilter(initTutorFilter);
                setSelectedGroups([]);
                setSearch("");
              }}
              variant={"outline"}
              rounded={"full"}
              borderColor={"#1890ff"}
              alignItems={"center"}
              justifyContent={"center"}
              w={120}
              py={1}
              px={4}
            >
              <Text color={"#1890ff"}>Reset Filters</Text>
            </Button>
          </VStack>
          <Text fontSize={20} fontWeight={600} my={1.5}>
            Recommended Tutors
          </Text>
          {isLoading ? (
            <>
              {[...Array(3)].map((_, index) => (
                <Center w="100%" key={index}>
                  <VStack
                    w="90%"
                    maxW="400"
                    borderWidth="1"
                    space={8}
                    overflow="hidden"
                    rounded="md"
                    _dark={{
                      borderColor: "coolGray.500",
                    }}
                    _light={{
                      borderColor: "coolGray.200",
                    }}
                  >
                    <Skeleton h="40" />
                    <Skeleton.Text px="4" />
                    <Skeleton
                      px="4"
                      my="4"
                      rounded="md"
                      startColor="primary.100"
                    />
                  </VStack>
                </Center>
              ))}
            </>
          ) : null}

          {tutorsResponse?.map((tutor) => (
            <TutorItem
              onPress={() =>
                navigation.navigate("Tutor Detail", { tutorId: tutor.id })
              }
              tutor={tutor}
              onPressFavorite={() => handleFavorite(tutor.id)}
              key={tutor.id}
            />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default TutorListScreen;
