import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Text, VStack, HStack, Image, Button, useToast } from "native-base";
import { SvgUri } from "react-native-svg";
import { HistoryItem } from "../../types/Schedule";
import dayjs from "dayjs";
import { countryNameMapper } from "../../constants/CountryConstant";
import { useI18nContext } from "../../i18n/i18n-react";
import { cancelABookedClass } from "../../services/backend/ScheduleController";

type BookeditemType = {
  scheduleItem: HistoryItem;
  mutate?: () => void
}

const BookedItem = ({scheduleItem, mutate}: BookeditemType) => {
  const toast = useToast();
  const navigation = useNavigation();
  const {LL} = useI18nContext();

  const {scheduleInfo} = scheduleItem.scheduleDetailInfo;
  const {tutorInfo, startTimestamp, startTime, endTime} = scheduleInfo

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
        {dayjs(startTimestamp).format("ddd, DD MMM YY")}
      </Text>
      <Text>1 {LL.ui.lesson()}</Text>
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
            <Text color={"#1890ff"}>Direct Mesage</Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}} 
        mt={6} px={5} pt={3} pb={1.5}
      >
        <HStack alignItems={"center"} mb={4}>
          <Text flex={1} fontSize={20}>
            {startTime} - {endTime}
          </Text>
          { dayjs(startTimestamp).diff(dayjs(), "hour") > 2 ?
            <Button 
              onPress={async () => {
                try {
                  const result = await cancelABookedClass(scheduleItem.id, {
                    cancelReasonId: 2,
                    note: "111"
                  })
                  mutate?.()
                  if (result?.status === 200) {
                    toast.show({
                      title: "Success",
                    })
                  }
                } catch (error) {
                  console.log(error)
                  toast.show({
                    title: "Error",
                  })
                }
              }}
            >
              {LL.ui.cancel()}
            </Button> :
            null
          }
        </HStack>
        <VStack borderWidth={1} borderColor={"#d9d9d9"}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            _light={{backgroundColor: "#fafafa"}}
            _dark={{backgroundColor: "#303030"}}
            px={4}
            py={3}
          >
            <HStack alignItems={"center"} space={1.5} flex={1}>
              <FontAwesomeIcon icon={faChevronDown} size={12} />
              <Text>{LL.schedule.requestForLesson()}</Text>
            </HStack>
            <Text color="rgb(0, 113, 240)" flex={1} textAlign={"right"}>{LL.schedule.editRequest()}</Text>
          </HStack>
          <Text p={4} color={!!scheduleItem.studentRequest ? "inherit" : "#8399a7"}>
            {LL.schedule.currentlyThereIsNoRequest()}
          </Text>
        </VStack>
      </VStack>
      <Button mt={4} onPress={() => navigation.navigate("Dial" as never)}>
        {LL.schedule.goToMeeting()}
      </Button>
    </VStack>
  );
};

export default BookedItem;
