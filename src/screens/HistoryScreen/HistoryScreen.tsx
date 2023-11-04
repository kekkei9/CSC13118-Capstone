import { ScrollView, Text, VStack } from "native-base";
import { SvgUri } from "react-native-svg";
import BookedItem from "../../components/BookedItem";
import HistoryItem from "../../components/HistoryItem";

const HistoryScreen = () => {
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
            History
          </Text>
          <VStack
            pl={2}
            borderLeftColor={"hsla(0,0%,39.2%,.2)"}
            borderLeftWidth={4}
          >
            <Text fontSize={16}>
              The following is a list of lessons you have attended
            </Text>
            <Text fontSize={16}>
              You can review the details of the lessons you have attended
            </Text>
          </VStack>
        </VStack>
        <VStack px={7} space={6} mt={6}>
          {[...Array(5)].map((_, index) => (
            <HistoryItem key={index} />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default HistoryScreen;
