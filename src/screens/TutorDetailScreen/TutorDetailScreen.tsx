import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text, VStack, HStack, Button, Image, ScrollView } from "native-base";
import { SvgUri } from "react-native-svg";
import Video from "react-native-video";
import Tag from "../../components/Tag/Tag";

const TutorDetailScreen = () => {
  return (
    <ScrollView>
      <VStack px={6} py={9}>
        <HStack space={5}>
          <Image
            source={{
              uri: "https://api.app.lettutor.com/avatar/83802576-70fe-4394-b27a-3d9e8b50f1b7avatar1649512219387.jpg",
            }}
            w={"110px"}
            h={"110px"}
            rounded={"full"}
            alt="Teacher Image"
          />
          <VStack>
            <Text fontWeight={600} fontSize={22}>
              April Baldo
            </Text>
            <HStack space={1} alignItems={"center"}>
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={index}
                  color="#F6D714"
                  size={12}
                />
              ))}
              <Text italic>(23)</Text>
            </HStack>
            <HStack space={2}>
              <SvgUri
                uri="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/ph.svg"
                width={22}
                height={22}
              />
              <Text color={"#0B2239"}>Philippines (the)</Text>
            </HStack>
          </VStack>
        </HStack>
        <Text numberOfLines={4} opacity={0.6} mt={2}>
          Hello! My name is April Baldo, you can just call me Teacher April. I
          am an English teacher and currently teaching in senior high school. I
          have been teaching grammar and literature for almost 10 years. I am
          fond of reading and teaching literature as one way of knowing one’s
          beliefs and culture. I am friendly and full of positivity. I love
          teaching because I know each student has something to bring on.
          Molding them to become an individual is a great success.
        </Text>
        <HStack space={5} mt={4}>
          <Button flex={1}>Favorite</Button>
          <Button flex={1}>Report</Button>
        </HStack>
        {/* <Video
        source={{
          uri: "https://sandbox.api.lettutor.com/video/f64bca88-80fb-479d-a9d1-66fd326cfa45video1641245785756.mp4",
        }} // Can be a URL or a local file.
      /> */}
        <Text fontSize={18} my={2}>
          Education
        </Text>
        <Text ml={4}>Earth, Vegeta planet</Text>
        <Text fontSize={18} my={2}>
          Languages
        </Text>
        <HStack ml={4}>
          {["English", "Japanese"].map((language, index) => (
            <Tag content={language} key={index} />
          ))}
        </HStack>
        <Text fontSize={18} my={2}>
          Specialties
        </Text>
        <HStack ml={4}>
          {["English", "Japanese"].map((specialty, index) => (
            <Tag content={specialty} key={index} />
          ))}
        </HStack>
        <Text fontSize={18} my={2}>
          Interests
        </Text>
        <Text ml={4}>
          I loved the weather, the scenery and the laid-back lifestyle of the
          locals.
        </Text>
        <Text fontSize={18} my={2}>
          Teaching experience
        </Text>
        <Text ml={4}>
          I have more than 10 years of teaching english experience
        </Text>
        <Text fontSize={18} my={2}>
          Other reviews
        </Text>
      </VStack>
    </ScrollView>
  );
};

export default TutorDetailScreen;
