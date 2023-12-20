import { faCalendarDays, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import _ from "lodash";
import {
  Button,
  Flex,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "native-base";
import { countryNameMapper } from "../../constants/CountryConstant";
import { Tutor } from "../../types/Tutor";
import Tag from "../Tag/Tag";

type TutorItemProps = {
  tutor: Tutor;
  onPress: () => void;
};

const TutorItem = ({
  tutor: { avatar, name, country, bio, rating, specialties },
  onPress,
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
                uri: avatar,
              }}
              w={"70px"}
              h={"70px"}
              rounded={"full"}
              alt="Teacher Image"
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
            {[...Array(Math.floor(rating))].map((_, index) => (
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
        {specialties.split(",").map((specialty, index) => (
          <Tag
            key={index}
            content={_.startCase(specialty.replace(/-/g, " "))}
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
