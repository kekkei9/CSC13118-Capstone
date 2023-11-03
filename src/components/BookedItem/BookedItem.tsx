import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, HStack, Image, Button } from "native-base";
import { SvgUri } from "react-native-svg";

const BookedItem = () => {
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
      <VStack backgroundColor={"white"} mt={6} px={5} pt={3} pb={1.5}>
        <HStack alignItems={"center"} mb={4}>
          <Text flex={1} fontSize={20}>
            18:00 - 18:25
          </Text>
          <Button>Cancel</Button>
        </HStack>
        <VStack borderWidth={1} borderColor={"#d9d9d9"}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            backgroundColor={"#fafafa"}
            px={4}
            py={3}
          >
            <HStack alignItems={"center"} space={1.5}>
              <FontAwesomeIcon icon={faChevronDown} size={12} />
              <Text>Request for lesson</Text>
            </HStack>
            <Text color="rgb(0, 113, 240)">Edit request</Text>
          </HStack>
          <Text p={4}>
            Currently there are no requests for this class. Please write down
            any requests for the teacher.
          </Text>
        </VStack>
      </VStack>
      <Button mt={4}>Go to meeting</Button>
    </VStack>
  );
};

export default BookedItem;
