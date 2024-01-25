import { ScrollView, Text, VStack } from "native-base";
import { SvgUri } from "react-native-svg";
import HistoryItem from "../../components/HistoryItem";
import useSWR from "swr";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { HistoryItem as HistoryItemType } from "../../types/Schedule";
import { useI18nContext } from "../../i18n/i18n-react";

const PAGE_SIZE = 20;

const HistoryScreen = () => {
  const {LL} = useI18nContext();

  const {data: historyResponse} = useSWR<BaseResponseList<HistoryItemType>>(`/booking/list/student?page=1&perPage${PAGE_SIZE}0&inFuture=0&orderBy=meeting&sortBy=desc`)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack px={2.5} py={9} flex={1}>
        <VStack px={7}>
          <SvgUri
            uri="https://sandbox.app.lettutor.com/static/media/history.1e097d10.svg"
            width={120}
            height={120}
          />
          <Text fontWeight={600} fontSize={30} mb={3}>
            {LL.history.history()}
          </Text>
          <VStack
            pl={2}
            borderLeftColor={"hsla(0,0%,39.2%,.2)"}
            borderLeftWidth={4}
          >
            <Text fontSize={16}>
              {LL.history.theFollowingIsAList()}
            </Text>
            <Text fontSize={16}>
              {LL.history.youCanReview()}
            </Text>
          </VStack>
        </VStack>
        <VStack px={7} space={6} mt={6}>
          {historyResponse?.data.rows.map((historyItem) => (
            <HistoryItem historyItem={historyItem} key={historyItem.id} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default HistoryScreen;
