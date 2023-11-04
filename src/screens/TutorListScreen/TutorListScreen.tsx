import {
  Button,
  Center,
  Container,
  HStack,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import TutorItem from "../../components/TutorItem/TutorItem";
import { useNavigation } from "@react-navigation/native";

const TutorListScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack px={2.5} flex={1}>
        <Center
          backgroundColor={
            "linear-gradient(144deg, rgb(12, 61, 223) 0%, rgb(5, 23, 157) 100%);"
          }
          pt={4}
          pb={8}
        >
          <Text fontSize={30} mt={3} color={"white"}>
            Upcoming lesson
          </Text>
          <HStack w="full" mt={3}>
            <Container p={2}>
              <Text fontSize={20} color={"white"}>
                Sun, 05 Nov 23 18:00 - 18:25
              </Text>
              <Text color={"#ffff00"}>(starts in 16:06:41)</Text>
            </Container>
            <Button
              fontSize={16}
              flex={1}
              flexShrink={0}
              onPress={() => navigation.navigate("Dial" as never)}
            >
              Enter lesson room
            </Button>
          </HStack>
          <Text fontSize={16} color={"white"} mt={2}>
            Total lesson time is 515 hours 0 minutes
          </Text>
        </Center>
        <VStack py={8} px={5} space={5}>
          <Text fontWeight={700} fontSize={29}>
            Find a tutor
          </Text>
          {/* select section */}
          <Text fontSize={20} fontWeight={600} my={1.5}>
            Recommended Tutors
          </Text>
          {[...Array(5)].map((_, index) => (
            <TutorItem
              onPress={() => navigation.navigate("Tutor Detail" as never)}
              key={index}
            />
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  );
};

export default TutorListScreen;
