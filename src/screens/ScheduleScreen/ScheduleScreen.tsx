import { Text, VStack, ScrollView, View } from "native-base";
import { SvgUri } from "react-native-svg";
import BookedItem from "../../components/BookedItem";
import useSWR from "swr";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";


const PAGE_SIZE =20;

const ScheduleScreen = () => {
  const {data: scheduleResponse} = useSWR<BaseResponseList<HistoryItemType>>(`/booking/list/student?page=1&perPage${PAGE_SIZE}0&inFuture=1&orderBy=meeting&sortBy=desc`)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} px={2.5} py={9}>
        <VStack px={7}>
          <SvgUri
            uri="https://sandbox.app.lettutor.com/static/media/calendar-check.7cf3b05d.svg"
            width={120}
            height={120}
          />
          <Text fontWeight={600} fontSize={30} mb={3}>
            Schedule
          </Text>
          <VStack
            pl={2}
            borderLeftColor={"hsla(0,0%,39.2%,.2)"}
            borderLeftWidth={4}
          >
            <Text fontSize={16}>
              Here is a list of the sessions you have booked
            </Text>
            <Text fontSize={16}>
              You can track when the meeting starts, join the meeting with one
              click or can cancel the meeting before 2 hours
            </Text>
          </VStack>
        </VStack>
        <VStack px={7} pt={12} pb={4}>
          <Text fontWeight={700}>Latest book</Text>
        </VStack>
        <VStack px={7} space={6}>
          {scheduleResponse?.data.rows.map((scheduleItem) => (
            <BookedItem scheduleItem={scheduleItem} key={scheduleItem.id} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ScheduleScreen;
