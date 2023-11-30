import {
  HStack,
  VStack,
  Text,
  Flex,
  Button,
  Pressable,
  Image,
  Container,
} from "native-base";
import { SvgUri } from "react-native-svg";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays, faHeart } from "@fortawesome/free-regular-svg-icons";
import Tag from "../Tag/Tag";

type TutorItemProps = {
  onPress: () => void;
};

const TutorItem = ({ onPress }: TutorItemProps) => {
  return (
    <VStack
      p={5}
      shadow="2"
      backgroundColor={"#fff"}
      rounded={"3xl"}
      w={"full"}
    >
      <HStack>
        <VStack flex={1}>
          <Pressable alignSelf={"center"} onPress={onPress}>
            <Image
              source={{
                uri: "https://api.app.lettutor.com/avatar/83802576-70fe-4394-b27a-3d9e8b50f1b7avatar1649512219387.jpg",
              }}
              w={"70px"}
              h={"70px"}
              rounded={"full"}
              alt="Teacher Image"
            />
          </Pressable>
          <Text fontWeight={600} fontSize={22}>
            April Baldo
          </Text>
          <HStack space={2}>
            <SvgUri
              uri="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ph.svg"
              width={22}
              height={22}
            />
            <Text color={"#0B2239"}>Philippines (the)</Text>
          </HStack>
          <HStack space={1}>
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                icon={faStar}
                key={index}
                color="#F6D714"
                size={12}
              />
            ))}
          </HStack>
        </VStack>
        <FontAwesomeIcon icon={faHeart} color="rgb(0, 113, 240)" size={26} />
      </HStack>
      <Flex wrap="wrap" flexDirection="row" w="full" mt={5}>
        {["English for Business", "IELTS", "PET", "KET"].map((tag, index) => (
          <Tag key={index} content={tag} />
        ))}
      </Flex>
      <Text numberOfLines={4} opacity={0.6}>
        Hello! My name is April Baldo, you can just call me Teacher April. I am
        an English teacher and currently teaching in senior high school. I have
        been teaching grammar and literature for almost 10 years. I am fond of
        reading and teaching literature as one way of knowing one’s beliefs and
        culture. I am friendly and full of positivity. I love teaching because I
        know each student has something to bring on. Molding them to become an
        individual is a great success.
      </Text>
      <HStack w={"full"} display={"flex"} justifyContent={"flex-end"}>
        <Button
          mt={8}
          onPress={onPress}
          leftIcon={
            <FontAwesomeIcon icon={faCalendarDays} color="#1890ff" size={14} />
          }
          variant={"outline"}
          rounded={"full"}
          borderColor={"#1890ff"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Text color={"#1890ff"}>Book</Text>
        </Button>
      </HStack>
    </VStack>
  );
};

export default TutorItem;
