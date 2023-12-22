import {
  faCalendarDays,
  faHeart as faHeartRegular,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import _ from "lodash";
import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
  useToast,
} from "native-base";
import { countryNameMapper } from "../../constants/CountryConstant";
import { Tutor } from "../../types/Tutor";
import RatingDisplay from "../RatingDisplay";
import Tag from "../Tag/Tag";

type TutorItemProps = {
  tutor: Tutor;
  onPress: () => void;
  onPressFavorite: () => void;
};

const TutorItem = ({
  tutor: {
    avatar,
    name,
    country,
    bio,
    rating,
    specialties,
    isFavoriteTutor,
    id,
  },
  onPress,
  onPressFavorite,
}: TutorItemProps) => {
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
                uri: avatar || "",
              }}
              w={"70px"}
              h={"70px"}
              rounded={"full"}
              alt="Teacher Image"
              fallbackElement={
                <Container
                  backgroundColor={"rgb(178, 54, 131)"}
                  rounded={"full"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  textAlign={"center"}
                  w={70}
                  h={70}
                >
                  <Text fontSize={36} color={"white"}>
                    {name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .join("")}
                  </Text>
                </Container>
              }
            />
          </Pressable>
          <Text fontWeight={600} fontSize={22}>
            {name}
          </Text>
          <HStack space={2}>
            {country ? (
              <Image
                source={{
                  uri: `https://flagcdn.com/48x36/${country?.toLowerCase()}.png`,
                }}
                width={22}
                height={22}
                alt="Country Flag"
                style={{ objectFit: "contain" }}
              />
            ) : null}
            <Text color={"#0B2239"}>
              {countryNameMapper[country as keyof typeof countryNameMapper]}
            </Text>
          </HStack>
          <HStack space={1}>
            <RatingDisplay numberOfStars={rating} />
          </HStack>
        </VStack>
        <Pressable onPress={onPressFavorite}>
          <FontAwesomeIcon
            icon={isFavoriteTutor ? faHeartSolid : faHeartRegular}
            color={isFavoriteTutor ? "#FF6251" : "#1890ff"}
            size={26}
          />
        </Pressable>
      </HStack>
      <Flex wrap="wrap" flexDirection="row" w="full" mt={5}>
        {specialties.split(",").map((specialty, index) => (
          <Tag
            key={index}
            content={_.startCase(specialty.replace(/-/g, " "))}
            checked
          />
        ))}
      </Flex>
      <Text numberOfLines={4} opacity={0.6}>
        {bio}
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
