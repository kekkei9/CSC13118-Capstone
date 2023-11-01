import { Text, VStack } from "native-base";

const ScheduleScreen = () => {
  return (
    <VStack>
      <Text>Image</Text>
      <Text>Schedule</Text>
      <VStack>
        <Text>Here is a list of the sessions you have booked</Text>
        <Text>
          You can track when the meeting starts, join the meeting with one click
          or can cancel the meeting before 2 hours
        </Text>
      </VStack>
      <Text>Latest book</Text>
      <Text>Table</Text>
      <Text>Booked Table</Text>
    </VStack>
  );
};

export default ScheduleScreen;
