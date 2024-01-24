import { Text, VStack, ScrollView, View } from "native-base";
import { SvgUri } from "react-native-svg";
import BookedItem from "../../components/BookedItem";
import useSWR from "swr";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { useI18nContext } from "../../i18n/i18n-react";


const PAGE_SIZE =20;

const ScheduleScreen = () => {
  const {LL} = useI18nContext();

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
            {LL.schedule.schedule()}
          </Text>
          <VStack
            pl={2}
            borderLeftColor={"hsla(0,0%,39.2%,.2)"}
            borderLeftWidth={4}
          >
            <Text fontSize={16}>
              {LL.schedule.hereIsAList()}
            </Text>
            <Text fontSize={16}>
              {LL.schedule.youCanTrack()}
            </Text>
          </VStack>
        </VStack>
        <VStack px={7} pt={12} pb={4}>
          <Text fontWeight={700}>{LL.schedule.latestBook()}</Text>
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
