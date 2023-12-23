import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Text, VStack, HStack, Image, Button } from "native-base";
import { SvgUri } from "react-native-svg";
import { HistoryItem } from "../../types/Schedule";
import dayjs from "dayjs";
import { countryNameMapper } from "../../constants/CountryConstant";

type BookeditemType = {
  scheduleItem: HistoryItem;
}

const BookedItem = ({scheduleItem}: BookeditemType) => {
  const navigation = useNavigation();

  const {scheduleInfo} = scheduleItem.scheduleDetailInfo;
  const {tutorInfo, startTimestamp, startTime, endTime} = scheduleInfo

  return (
    <VStack
      backgroundColor={"rgb(241, 241, 241)"}
      background={
        "linear-gradient(to right, rgb(234, 235, 239), rgb(236, 236, 239), rgb(238, 238, 240), rgb(239, 239, 240), rgb(241, 241, 241));"
      }
      p={4}
    >
      <Text fontSize={24} fontWeight={700}>
        {dayjs(startTimestamp).format("ddd, DD MMM YY")}
      </Text>
      <Text>1 lesson</Text>
      <HStack backgroundColor={"white"} space={3} mt={6} p={3}>
        <Image
          source={{
            uri: tutorInfo.avatar,
          }}
          w={"68px"}
          h={"68px"}
          rounded={"full"}
          alt="Teacher Image"
        />
        <VStack>
          <Text>{tutorInfo.name}</Text>
          <HStack space={2}>
            {tutorInfo.country ? (
              <Image
                source={{
                  uri: `https://flagcdn.com/48x36/${tutorInfo.country?.toLowerCase()}.png`,
                }}
                width={22}
                height={22}
                alt="Country Flag"
                style={{ objectFit: "contain" }}
              />
            ) : null}
            <Text>{countryNameMapper[tutorInfo.country as keyof typeof countryNameMapper]}</Text>
          </HStack>
          <HStack space={2}>
            <FontAwesomeIcon icon={faComment} color="#1890ff" />
            <Text color={"#1890ff"}>Direct Mesage</Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack backgroundColor={"white"} mt={6} px={5} pt={3} pb={1.5}>
        <HStack alignItems={"center"} mb={4}>
          <Text flex={1} fontSize={20}>
            {startTime} - {endTime}
          </Text>
          <Button>Cancel</Button>
        </HStack>
        <VStack borderWidth={1} borderColor={"#d9d9d9"}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            backgroundColor={"#fafafa"}
            px={4}
            py={3}
          >
            <HStack alignItems={"center"} space={1.5} flex={1}>
              <FontAwesomeIcon icon={faChevronDown} size={12} />
              <Text>Request for lesson</Text>
            </HStack>
            <Text color="rgb(0, 113, 240)" flex={1} textAlign={"right"}>Edit request</Text>
          </HStack>
          <Text p={4} color={!!scheduleItem.studentRequest ? "inherit" : "#8399a7"}>
            Currently there are no requests for this class. Please write down
            any requests for the teacher.
          </Text>
        </VStack>
      </VStack>
      <Button mt={4} onPress={() => navigation.navigate("Dial" as never)}>
        Go to meeting
      </Button>
    </VStack>
  );
};

export default BookedItem;
