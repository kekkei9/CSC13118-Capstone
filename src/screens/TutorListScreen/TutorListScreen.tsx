import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import _ from "lodash";
import {
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  HStack,
  Image,
  Input,
  ScrollView,
  Skeleton,
  Text,
  VStack,
  useToast,
} from "native-base";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import Pagination from "../../components/Pagination";
import Tag from "../../components/Tag/Tag";
import TutorItem from "../../components/TutorItem/TutorItem";
import {
  TutorFilter,
  addTutorToFavorite,
  initTutorFilter,
  searchTutor,
} from "../../services/backend/TutorController";
import { BaseResponse, BaseResponseList } from "../../types/Response/BaseResponse";
import { TutorsStackNavigationProp } from "../../types/Route/Stack";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { Tutor } from "../../types/Tutor";
import { useI18nContext } from "../../i18n/i18n-react";

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
  const {LL} = useI18nContext();
  const navigation = useNavigation<TutorsStackNavigationProp>();
  const [tutorFilter, setTutorFilter] = useState<TutorFilter>(initTutorFilter);
  const [search, setSearch] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const { data: tutorsResponse, isLoading, mutate } = useSWR<{ count: number; rows: Tutor[] }>(
    `tutorList?search=${search}&page=${currentPage}&tutorFilters=${Object.values(
      tutorFilter || {}
    ).join("")}`,
    () => searchTutor(tutorFilter, search, currentPage, PAGE_SIZE).then((res) => res.data)
  );

  //get latest schedule

  const {data: scheduleResponse} = useSWR<BaseResponseList<HistoryItemType>>("/booking/list/student?page=1&perPage=10&inFuture=1&orderBy=meeting&sortBy=asc")
  const {data: totalResponse} = useSWR<{total: Number}>("/call/total")
  const latestSchedule = scheduleResponse?.data.rows[1]

  const handleFavorite = async (tutorId: string) => {
    const result = await addTutorToFavorite(tutorId);
    if (result.status !== 200) return;
    mutate();
    toast.show({
      title: "Successfully toggle favorite",
    });
  };

  const hours = Math.floor((totalResponse?.total || 0) / 60);
  const minutes = (totalResponse?.total || 0) % 60;

  const timerRef= useRef<any>(null);
  const [upcomingTimeInSeconds, setUpcomingTimeInSeconds] = useState<number>(0);
  useEffect(() => { 
    timerRef.current = setInterval(() => {
      setUpcomingTimeInSeconds(dayjs(latestSchedule?.scheduleDetailInfo.startPeriodTimestamp).diff(dayjs(), "seconds"));
    }, 500);
    return () => clearInterval(timerRef.current);
  })

  const upcomingTimeInMinutes =upcomingTimeInSeconds>0? Math.floor(upcomingTimeInSeconds / 60): Math.floor(Math.abs(upcomingTimeInSeconds) / 60);
  const upcomingTimeInHours = upcomingTimeInMinutes >0 ? Math.floor(upcomingTimeInMinutes / 60): Math.floor(Math.abs(upcomingTimeInMinutes) / 60);
  const displayUpcomingTime = `${upcomingTimeInHours}:${upcomingTimeInMinutes % 60}:${Math.abs(upcomingTimeInSeconds) % 60}`;

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
            {LL.tutorList.upcomingLesson()}
          </Text>
          <HStack w="full" mt={3} alignItems={"center"}>
            <Container p={2} flex={2} >
              {
                latestSchedule ?
                <Text fontSize={20} color={"white"} textAlign={"center"}>
                {dayjs(latestSchedule?.scheduleDetailInfo.scheduleInfo.startTimestamp).format("ddd, DD MMM YY")}{" "}
                {dayjs(latestSchedule?.scheduleDetailInfo.scheduleInfo.startTimestamp).format("HH:mm")} - {dayjs(latestSchedule?.scheduleDetailInfo.scheduleInfo.endTimestamp).format("HH:mm")}
              </Text>
              : null
              }
             {
              upcomingTimeInSeconds > 0 ?
              <Text color={"#ffff00"} textAlign={"center"}>
              ({LL.tutorList.startsIn()} {displayUpcomingTime})
              </Text>:
              <Text color={"#90ee90"} textAlign={"center"}>
              ({LL.tutorList.startsIn()} {displayUpcomingTime})
              </Text>
             }
            </Container>
            <Button
              fontSize={16}
              flex={3}
              height={12}
              flexShrink={0}
              onPress={() => navigation.navigate("Dial" as never)}
              rounded={"full"}
            >
              {LL.tutorList.enterLessonRoom()}
            </Button>
          </HStack>
          <Text fontSize={16} color={"white"} mt={2}>
            {LL.tutorList.totalLessonTimeIs()} {hours} {LL.ui.hours()} {minutes} {LL.ui.minutes()} 
          </Text>
        </Center>
        <VStack py={8} px={5} space={5}>
          <Text fontWeight={700} fontSize={29}>
            {LL.tutorList.findATutor()}
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
                  {LL.tutorList.vietnameseTutor()}
                </Checkbox>
                <Checkbox flex={1} value="isForeign">
                  {LL.tutorList.foreignTutor()}
                </Checkbox>
              </HStack>
              <HStack space={2}>
                <Checkbox flex={1} value="isNative">
                  {LL.tutorList.nativeTutor()}
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
              alignSelf={"flex-start"}
              py={1}
              px={4}
            >
              <Text color={"#1890ff"}>{LL.tutorList.resetFilters()}</Text>
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

          {tutorsResponse?.rows.map((tutor) => (
            <TutorItem
              onPress={() =>
                navigation.navigate("Tutor Detail", { tutorId: tutor.id })
              }
              tutor={tutor}
              onPressFavorite={() => handleFavorite(tutor.id)}
              key={tutor.id}
            />
           ))}
          {tutorsResponse?.rows.length === 0 ? 
              <Center>
                <Image
                  width="184"
                  height="120"
                  source={{
                    uri: "https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  }}
                  alt="No tutor found"
                  style={{ objectFit: "contain" }}
                />
                <Text>{LL.tutorList.sorryWeCantFindAnyTutors()}</Text>
            </Center>:
            <Pagination 
            maxBulletNumber={5} 
            total={(tutorsResponse?.count || 0) / PAGE_SIZE} 
            value={currentPage} 
            onChange={setCurrentPage}
          />}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default TutorListScreen;
