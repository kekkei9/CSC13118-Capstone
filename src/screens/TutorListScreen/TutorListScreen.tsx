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
  Text,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Tag from "../../components/Tag/Tag";
import TutorItem from "../../components/TutorItem/TutorItem";
import {
  TutorFilter,
  initTutorFilter,
  searchTutor,
} from "../../services/backend/TutorController";
import { axiosClient } from "../../services/backend/axiosClient";
import { TutorListResponse } from "../../types/Response/TutorResponse";
import { Tutor } from "../../types/Tutor";

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
  const [tutorFilter, setTutorFilter] = useState<TutorFilter>(initTutorFilter);
  const [search, setSearch] = useState<string>("");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
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
    console.log(resultNationality);
    setTutorFilter((prev) => ({
      ...prev,
      nationality: resultNationality,
    }));
  }, [selectedGroups]);

  const { data: tutorsResponse } = useSWR<Tutor[]>(
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
          <HStack w="full" mt={3}>
            <Container p={2}>
              <Text fontSize={20} color={"white"}>
                Sun, 05 Nov 23 18:00 - 18:25
              </Text>
              <Text color={"#ffff00"}>(starts in 16:06:41)</Text>
            </Container>
            <Button
              fontSize={16}
              flex={1}
              flexShrink={0}
              onPress={() => navigation.navigate("Dial" as never)}
            >
              Enter lesson room
            </Button>
          </HStack>
          <Text fontSize={16} color={"white"} mt={2}>
            Total lesson time is 515 hours 0 minutes
          </Text>
        </Center>
        <VStack py={8} px={5} space={5}>
          <Text fontWeight={700} fontSize={29}>
            Find a tutor
          </Text>
          <VStack space={2.5}>
            <Checkbox.Group
              accessibilityLabel="choose values"
              onChange={setSelectedGroups}
            >
              <HStack space={2} mb={2}>
                <Input
                  flex={1}
                  placeholder="Enter tutor name..."
                  value={search}
                  onChangeText={setSearch}
                />
                <Checkbox flex={1} value="isVietnamese">
                  Vietnamese Tutor
                </Checkbox>
              </HStack>
              <HStack space={2}>
                <Checkbox flex={1} value="isForeign">
                  Foreign Tutor
                </Checkbox>
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

          {tutorsResponse?.map((tutor) => (
            <TutorItem
              onPress={() => navigation.navigate("Tutor Detail" as never)}
              tutor={tutor}
              key={tutor.id}
            />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default TutorListScreen;
