import { Text, VStack, ScrollView, View } from "native-base";
import { SvgUri } from "react-native-svg";
import BookedItem from "../../components/BookedItem";
import useSWR from "swr";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { useI18nContext } from "../../i18n/i18n-react";
import Pagination from "../../components/Pagination";
import { useState } from "react";
import _ from "lodash";
import { validTimestamp } from "../../constants/ScheduleConstant";

const PAGE_SIZE = 20;

const ScheduleScreen = () => {
  const {LL} = useI18nContext();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const findIndexTimeStamp = (history: HistoryItemType) => {
    return validTimestamp.findIndex((time) => time.start === history.scheduleDetailInfo.scheduleInfo.startTime && time.end === history.scheduleDetailInfo.scheduleInfo.endTime);
}

  const {data: scheduleResponse, mutate} = useSWR<BaseResponseList<HistoryItemType>>(`/booking/list/student?page=${currentPage}&perPage=${PAGE_SIZE}&inFuture=1&orderBy=meeting&sortBy=asc`)
  let toBeDisplayed = [];
  let tempArr: (HistoryItemType)[] = [];
  let prev: HistoryItemType | undefined = undefined;
  for (const schedule of scheduleResponse?.data.rows||[]) {
    if (schedule.scheduleDetailInfo.scheduleInfo.tutorId === prev?.scheduleDetailInfo.scheduleInfo.tutorId &&
      findIndexTimeStamp(schedule) === findIndexTimeStamp(prev) + 1
      ) {
        tempArr.push(schedule);
    } else {
      if (tempArr.length > 0) {
        toBeDisplayed.push(tempArr);
      }
      tempArr = [schedule];
    }
    prev = schedule
  }
  if (tempArr.length > 0) {
    toBeDisplayed.push(tempArr);
  }

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
          {toBeDisplayed.map((scheduleItems) =>  (
            <BookedItem scheduleItems={scheduleItems} key={scheduleItems[0].id} mutate={mutate} />
          ))}
          <Pagination 
              maxBulletNumber={5} 
              total={(scheduleResponse?.data.count || 0) / PAGE_SIZE} 
              value={currentPage} 
              onChange={setCurrentPage}
          />
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default ScheduleScreen;
