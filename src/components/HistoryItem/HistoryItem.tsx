import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import { Flex, HStack, Image, Text, VStack } from "native-base";
import { countryNameMapper } from "../../constants/CountryConstant";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { timeDiff } from "../../utils/date";
import RatingDisplay from "../RatingDisplay";

type HistoryItemProps = {
  historyItem: HistoryItemType;
}

const HistoryItem = ({historyItem}: HistoryItemProps) => {
  const {scheduleInfo} = historyItem.scheduleDetailInfo;
  const {tutorInfo, endTimestamp, startTime, endTime} = scheduleInfo


  return (
    <VStack
      backgroundColor={"rgb(241, 241, 241)"}
      background={
        "linear-gradient(to right, rgb(234, 235, 239), rgb(236, 236, 239), rgb(238, 238, 240), rgb(239, 239, 240), rgb(241, 241, 241));"
      }
      p={4}
    >
      <Text fontSize={24} fontWeight={700}>
        {dayjs(endTimestamp).format("ddd, DD MMM YY")}
      </Text>
      <Text>{timeDiff(dayjs(endTimestamp).toISOString())}</Text>
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
      <Text fontSize={20} py={3} px={5} bg={"white"} w={"full"} mt={8}>
        Lesson Time: {startTime} - {endTime}
      </Text>
      <VStack backgroundColor={"white"} mt={6}>
        <Text px={4} py={3}>
          {historyItem.studentRequest || "No request for lesson"}
        </Text>
        <Text
          borderColor={"rgb(217, 217, 217)"}
          borderTopWidth={1}
          borderBottomWidth={1}
          px={4}
          py={3}
        >
          Tutor haven't review yet
        </Text>
        {historyItem.feedbacks.map(({rating, id}) => (<Flex
          wrap="wrap"
          flexDirection={"row"}
          justifyContent={"space-between"}
          px={4}
          py={3}
          key={id}
        >
          <HStack alignItems={"center"}>
            <Text mr={2}>Rating: </Text>
            <RatingDisplay numberOfStars={rating} />
          </HStack>
          <HStack space={2}>
            <Text color={"#1890ff"}>Edit</Text>
            <Text color={"#1890ff"}>Report</Text>
          </HStack>
        </Flex>))}
        {historyItem.feedbacks.length === 0  ? 
          <Flex
          wrap="wrap"
          flexDirection={"row"}
          justifyContent={"space-between"}
          px={4}
          py={3}
        >
          <Text color={"#1890ff"}>Add a Rating</Text>
          <Text color={"#1890ff"}>Report</Text>
        </Flex> : null   }
      </VStack>
    </VStack>
  );
};

export default HistoryItem;
