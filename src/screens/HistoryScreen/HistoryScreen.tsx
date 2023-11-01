import { Text, VStack } from "native-base";

const HistoryScreen = () => {
  return (
    <VStack>
      <Text>Image</Text>
      <Text>History</Text>
      <VStack>
        <Text>The following is a list of lessons you have attended</Text>
        <Text>You can review the details of the lessons you have attended</Text>
      </VStack>
      <Text>Table</Text>
    </VStack>
  );
};

export default HistoryScreen;
