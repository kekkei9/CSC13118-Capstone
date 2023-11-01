import { Button, Center, HStack, Text, VStack } from "native-base";
import TutorItem from "../../components/TutorItem/TutorItem";
import { NavigationState, useNavigation } from "@react-navigation/native";

const TutorListScreen = () => {
  const navigation = useNavigation();

  return (
    <Center>
      <Center>
        <Text>Upcoming lesson</Text>
        <HStack>
          <Text>Sun, 05 Nov 23 18:00 - 18:25</Text>
          <Button>Enter lesson room</Button>
        </HStack>
        <Text>Total lesson time is 515 hours 0 minutes</Text>
      </Center>
      <VStack>
        <Text>Find a tutor</Text>
        {/* select section */}
        <Text>Recommended Tutors</Text>
        {[...Array(5)].map((_) => (
          <TutorItem
            onClick={() => navigation.navigate("TutorDetail" as never)}
          />
        ))}
      </VStack>
    </Center>
  );
};

export default TutorListScreen;
