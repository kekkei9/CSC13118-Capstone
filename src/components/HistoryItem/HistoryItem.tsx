import { faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import dayjs from "dayjs";
import { Flex, HStack, Image, Text, VStack } from "native-base";
import { countryNameMapper } from "../../constants/CountryConstant";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { timeDiff } from "../../utils/date";
import RatingDisplay from "../RatingDisplay";
import { useI18nContext } from "../../i18n/i18n-react";

type HistoryItemProps = {
  historyItem: HistoryItemType;
}

const HistoryItem = ({historyItem}: HistoryItemProps) => {
  const {LL} = useI18nContext();
  
  const {scheduleInfo} = historyItem.scheduleDetailInfo;
  const {tutorInfo, endTimestamp, startTime, endTime} = scheduleInfo

  return (
    <VStack
      _light={{backgroundColor: "rgb(241, 241, 241)"}}
      _dark={{backgroundColor: "rgb(20, 20, 20)"}}
      // background={
      //   "linear-gradient(to right, rgb(234, 235, 239), rgb(236, 236, 239), rgb(238, 238, 240), rgb(239, 239, 240), rgb(241, 241, 241));"
      // }
      p={4}
    >
      <Text fontSize={24} fontWeight={700}>
        {dayjs(endTimestamp).format("ddd, DD MMM YY")}
      </Text>
      <Text>{timeDiff(dayjs(endTimestamp).toISOString())}</Text>
      <HStack
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}}
        space={3} mt={6} p={3}
      >
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
            <Text color={"#1890ff"}>{LL.history.directMessage()}</Text>
          </HStack>
        </VStack>
      </HStack>
      <Text fontSize={20} py={3} px={5} w={"full"} mt={8}
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}}
      >
        {LL.history.lessonTime()}: {startTime} - {endTime}
      </Text>
      <VStack
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}}
        mt={6}
      >
        <Text px={4} py={3}>
          {historyItem.studentRequest || LL.history.noRequestForLesson()}
        </Text>
        <Text
          borderColor={"rgb(217, 217, 217)"}
          borderTopWidth={1}
          borderBottomWidth={1}
          px={4}
          py={3}
        >
          {LL.history.tutorHaventReviewYet()}
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
          <Text color={"#1890ff"}>{LL.ui.addARating()}</Text>
          <Text color={"#1890ff"}>{LL.ui.report()}</Text>
        </Flex> : null}
      </VStack>
    </VStack>
  );
};

export default HistoryItem;
