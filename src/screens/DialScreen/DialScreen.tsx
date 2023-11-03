import {
  faEllipsis,
  faHand,
  faMicrophone,
  faPhone,
  faShareFromSquare,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, HStack, Container } from "native-base";

const DialScreen = () => {
  return (
    <VStack
      alignItems={"center"}
      justifyContent={"center"}
      w={"full"}
      h={"full"}
      backgroundColor={"#474747"}
      position={"relative"}
    >
      <Container
        backgroundColor={"rgb(178, 54, 131)"}
        rounded={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        textAlign={"center"}
        w={200}
        h={200}
      >
        <Text fontSize={96} color={"white"}>
          P
        </Text>
      </Container>

      <HStack
        position={"absolute"}
        bottom={4}
        backgroundColor={"#000"}
        p={1.5}
        rounded={"md"}
        space={2}
      >
        {[faMicrophone, faVideo, faShareFromSquare, faHand, faEllipsis].map(
          (faIcon, index) => (
            <Container
              w={12}
              h={12}
              alignItems={"center"}
              justifyContent={"center"}
              key={index}
            >
              <FontAwesomeIcon icon={faIcon} color="white" />
            </Container>
          )
        )}
        <Container
          w={12}
          h={12}
          backgroundColor={"#E70013"}
          alignItems={"center"}
          justifyContent={"center"}
          rounded={"md"}
        >
          <FontAwesomeIcon icon={faPhone} color="white" />
        </Container>
      </HStack>
    </VStack>
  );
};

export default DialScreen;
