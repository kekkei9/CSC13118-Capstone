import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { VStack, Text, HStack, Image, Flex } from "native-base";
import { SvgUri } from "react-native-svg";
import RatingDisplay from "../RatingDisplay";

const HistoryItem = () => {
  return (
    <VStack
      backgroundColor={"rgb(241, 241, 241)"}
      background={
        "linear-gradient(to right, rgb(234, 235, 239), rgb(236, 236, 239), rgb(238, 238, 240), rgb(239, 239, 240), rgb(241, 241, 241));"
      }
      p={4}
    >
      <Text fontSize={24} fontWeight={700}>
        Sat, 04 Nov 23
      </Text>
      <Text>1 lesson</Text>
      <HStack backgroundColor={"white"} space={3} mt={6} p={3}>
        <Image
          source={{
            uri: "https://api.app.lettutor.com/avatar/83802576-70fe-4394-b27a-3d9e8b50f1b7avatar1649512219387.jpg",
          }}
          w={"68px"}
          h={"68px"}
          rounded={"full"}
          alt="Teacher Image"
        />
        <VStack>
          <Text>Keegan</Text>
          <HStack space={2}>
            <SvgUri
              uri="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/tn.svg"
              width={22}
              height={22}
            />
            <Text>Tunisia</Text>
          </HStack>
          <HStack space={2}>
            <FontAwesomeIcon icon={faComment} color="#1890ff" />
            <Text color={"#1890ff"}>Direct Mesage</Text>
          </HStack>
        </VStack>
      </HStack>
      <Text fontSize={20} py={3} px={5} bg={"white"} w={"full"} mt={8}>
        Lesson Time: 13:30 - 13:55
      </Text>
      <VStack backgroundColor={"white"} mt={6}>
        <Text px={4} py={3}>
          No request for lesson
        </Text>
        <Text
          borderColor={"rgb(217, 217, 217)"}
          borderTopWidth={1}
          borderBottomWidth={1}
          px={4}
          py={3}
        >
          Tutor haven't review yet
        </Text>
        <Flex
          wrap="wrap"
          flexDirection={"row"}
          justifyContent={"space-between"}
          px={4}
          py={3}
        >
          <HStack alignItems={"center"}>
            <Text mr={2}>Rating: </Text>
            <RatingDisplay numberOfStars={5} />
          </HStack>
          <HStack space={2}>
            <Text color={"#1890ff"}>Edit</Text>
            <Text color={"#1890ff"}>Report</Text>
          </HStack>
        </Flex>
      </VStack>
    </VStack>
  );
};

export default HistoryItem;
