import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import {
  faCircleExclamation,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { RouteProp, useRoute } from "@react-navigation/native";
import ISO6391 from "iso-639-1";
import _ from "lodash";
import {
  Button,
  Container,
  HStack,
  Image,
  ScrollView,
  Text,
  VStack,
  useToast,
} from "native-base";
import useSWR from "swr";
import RatingDisplay from "../../components/RatingDisplay";
import Tag from "../../components/Tag/Tag";
import { countryNameMapper } from "../../constants/CountryConstant";
import BookingTable from "../../containers/BookingTable";
import { addTutorToFavorite } from "../../services/backend/TutorController";
import { BaseResponseList } from "../../types/Response/BaseResponse";
import { TutorStackParamList } from "../../types/Route/Stack";
import { Feedback, TutorDetail } from "../../types/Tutor";
import { timeDiff } from "../../utils/date";
import { useI18nContext } from "../../i18n/i18n-react";

//to fetch all tutors
const PAGE_SIZE = 100;

const TutorDetailScreen = () => {
  const toast = useToast();
  const {LL} = useI18nContext();
  const { params } = useRoute<RouteProp<TutorStackParamList, "Tutor Detail">>();

  const { data: tutor, mutate: mutateTutor } = useSWR<TutorDetail>(
    `/tutor/${params.tutorId}`
  );

  const { data: tutorFeedbacks } = useSWR<BaseResponseList<Feedback>>(`/feedback/v2/${params.tutorId}?perPage=${PAGE_SIZE}&page=1`);

  if (!tutor) return null;

  // TODO:: Remove slice in feedbacks

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack px={6} py={9}>
        <HStack space={5}>
          <Image
            source={{
              uri: tutor?.User.avatar || "",
            }}
            w={"110px"}
            h={"110px"}
            rounded={"full"}
            alt="Teacher Image"
            fallbackElement={
              <Container
                backgroundColor={"rgb(178, 54, 131)"}
                rounded={"full"}
                alignItems={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                w={110}
                h={110}
              >
                <Text fontSize={44} color={"white"}>
                  {tutor?.User.name
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")}
                </Text>
              </Container>
            }
          />
          <VStack>
            <Text fontWeight={600} fontSize={22}>
              {tutor?.User.name}
            </Text>
            <HStack space={1} alignItems={"center"}>
              <RatingDisplay numberOfStars={tutor?.avgRating || 0} />
              <Text italic>({tutor?.totalFeedback})</Text>
            </HStack>
            <HStack space={2}>
              {tutor?.User.country ? (
                <Image
                  source={{
                    uri: `https://flagcdn.com/48x36/${tutor.User.country?.toLowerCase()}.png`,
                  }}
                  width={22}
                  height={22}
                  alt="Country Flag"
                  style={{ objectFit: "contain" }}
                />
              ) : null}
              <Text color={"#0B2239"}>
                {
                  countryNameMapper[
                    tutor?.User.country as keyof typeof countryNameMapper
                  ]
                }
              </Text>
            </HStack>
          </VStack>
        </HStack>
        <Text opacity={0.6} mt={2}>
          {tutor?.bio}
        </Text>
        <HStack space={5} mt={4}>
          <Button
            flex={1}
            leftIcon={
              <FontAwesomeIcon
                icon={tutor.isFavorite ? faHeartSolid : faHeartRegular}
                color={tutor.isFavorite ? "#FF6251" : "#1890ff"}
                size={20}
              />
            }
            bg={"transparent"}
            alignItems={"center"}
            justifyContent={"center"}
            onPress={async () => {
              await addTutorToFavorite(tutor.User.id);
              toast.show({
                title: "Successfully toggle favorite",
              });
              mutateTutor();
            }}
            _pressed={{
              bg: "transparent",
            }}
          >
            <Text color={tutor.isFavorite ? "#FF6251" : "#1890ff"}>
              {LL.tutorDetail.favorite()}
            </Text>
          </Button>
          <Button
            flex={1}
            leftIcon={
              <FontAwesomeIcon
                icon={faCircleExclamation}
                color={"#1890ff"}
                size={20}
              />
            }
            bg={"transparent"}
            alignItems={"center"}
            justifyContent={"center"}
            _pressed={{
              bg: "transparent",
            }}
          >
            <Text color={"#1890ff"}>
              {LL.ui.report()}
            </Text>
          </Button>
        </HStack>
        {/* <Video
          source={{
            uri: "https://sandbox.api.lettutor.com/video/f64bca88-80fb-479d-a9d1-66fd326cfa45video1641245785756.mp4",
          }} // Can be a URL or a local file.
        /> */}
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.education()}
        </Text>
        <Text ml={4}>{tutor.education}</Text>
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.languages()}
        </Text>
        <HStack ml={4}>
          {tutor.languages.split(",").map((language, index) => (
            <Tag content={ISO6391.getName(language)} key={index} checked />
          ))}
        </HStack>
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.specialties()}
        </Text>
        <HStack ml={4}>
          {tutor.specialties.split(",").map((specialty, index) => (
            <Tag
              content={_.startCase(specialty.replace(/-/g, " "))}
              checked
              key={index}
            />
          ))}
        </HStack>
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.interests()}
        </Text>
        <Text ml={4}>{tutor.interests}</Text>
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.teachingExperience()}
        </Text>
        <Text ml={4}>{tutor.experience}</Text>
        <Text fontSize={18} my={2}>
          {LL.tutorDetail.otherReviews()}
        </Text>
        <VStack>
          {tutorFeedbacks?.data.rows.slice(0,10)?.map((feedback) => (
            <HStack py={4} key={feedback.id} space={3}>
              <Image 
                source={{
                  uri: feedback.firstInfo.avatar || "",
                }}
                width={8}
                height={8}
                rounded={"full"}
                alt="User Image"
              />
              <VStack space={1}>
                <HStack space={2}>
                  <Text>{feedback.firstInfo.name}</Text>
                  <Text>{timeDiff(feedback.createdAt)}</Text>
                </HStack>
                <HStack space={2}>
                  <RatingDisplay numberOfStars={feedback.rating}/>
                </HStack>
                <Text>{feedback.content}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>
        <BookingTable tutorId={params.tutorId} />
      </VStack>
    </ScrollView>
  );
};

export default TutorDetailScreen;
