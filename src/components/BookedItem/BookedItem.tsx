import { faComment } from "@fortawesome/free-regular-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Text, VStack, HStack, Image, Button, useToast, Input, TextArea, Modal } from "native-base";
import { SvgUri } from "react-native-svg";
import { HistoryItem } from "../../types/Schedule";
import dayjs from "dayjs";
import { countryNameMapper } from "../../constants/CountryConstant";
import { useI18nContext } from "../../i18n/i18n-react";
import { cancelABookedClass, updateStudentRequest } from "../../services/backend/ScheduleController";
import { useState } from "react";

type BookeditemType = {
  scheduleItems: HistoryItem[];
  mutate?: () => void
}

const BookedItem = ({scheduleItems, mutate}: BookeditemType) => {
  const toast = useToast();
  const navigation = useNavigation();
  const {LL} = useI18nContext();

  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [editingStudentRequest, setEditingStudentRequest] = useState<boolean>(false);
  const [studentRequest, setStudentRequest] = useState<string>("" as never);

  const {scheduleInfo} = scheduleItems[0].scheduleDetailInfo;
  const {tutorInfo, startTimestamp, endTimestamp} = scheduleInfo

  const handleSaveRequest = (scheduleItem: HistoryItem) => {
    updateStudentRequest(scheduleItem.id, studentRequest).then(result => {
      if (result?.status === 200) {
        toast.show({
          title: "Success",
        })
      }
    }).catch(error => {
      console.log(error)
      toast.show({
        title: "Error",
      })
    })
    setEditingStudentRequest(false)}

    const handleCancel = async (scheduleItem: HistoryItem) => {
      try {
        const result = await cancelABookedClass(scheduleItem.id, {
          cancelReasonId: 2,
          note: "111"
        })
        mutate?.()
        if (result?.status === 200) {
          toast.show({
            title: "Success",
          })
        }
      } catch (error) {
        console.log(error)
        toast.show({
          title: "Error",
        })
      }
    }

  return (
    <VStack
      _light={{backgroundColor: "rgb(241, 241, 241)"}}
      _dark={{backgroundColor: "rgb(20, 20, 20)"}}
      // background={
      //   "linear-gradient(to right, rgb(234, 235, 239), rgb(236, 236, 239), rgb(238, 238, 240), rgb(239, 239, 240), rgb(241, 241, 241));"
      // }
      p={4}
    >
      <Text fontSize={24} fontWeight={700}>
        {dayjs(startTimestamp).format("ddd, DD MMM YY")}
      </Text>
      <Text>{scheduleItems.length} {LL.ui.lessons()}</Text>
      <HStack 
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}}
        space={3} mt={6} p={3}
        >
        <Image
          source={{
            uri: tutorInfo.avatar,
          }}
          w={"68px"}
          h={"68px"}
          rounded={"full"}
          alt="Teacher Image"
        />
        <VStack>
          <Text>{tutorInfo.name}</Text>
          <HStack space={2}>
            {tutorInfo.country ? (
              <Image
                source={{
                  uri: `https://flagcdn.com/48x36/${tutorInfo.country?.toLowerCase()}.png`,
                }}
                width={22}
                height={22}
                alt="Country Flag"
                style={{ objectFit: "contain" }}
              />
            ) : null}
            <Text>{countryNameMapper[tutorInfo.country as keyof typeof countryNameMapper]}</Text>
          </HStack>
          <HStack space={2}>
            <FontAwesomeIcon icon={faComment} color="#1890ff" />
            <Text color={"#1890ff"}>Direct Mesage</Text>
          </HStack>
        </VStack>
      </HStack>
      {scheduleItems.map((scheduleItem) => (
        <>
        <VStack
        _light={{backgroundColor: "white"}}
        _dark={{backgroundColor: "gray.700"}} 
        mt={6} px={5} pt={3} pb={1.5}
      >
        <HStack alignItems={"center"} mb={4}>
          <Text flex={1} fontSize={20}>
            {dayjs(startTimestamp).format("HH:mm")} - {dayjs(endTimestamp).format("HH:mm")}
          </Text>
          { dayjs(startTimestamp).diff(dayjs(), "hour") > 2 ?
            <Button 
              onPress={() => setShowCancelModal(true)}
            >
              {LL.ui.cancel()}
            </Button> :
            null
          }
        </HStack>
        <VStack borderWidth={1} borderColor={"#d9d9d9"}>
          <HStack
            alignItems={"center"}
            justifyContent={"space-between"}
            _light={{backgroundColor: "#fafafa"}}
            _dark={{backgroundColor: "#303030"}}
            px={4}
            py={3}
          >
            <HStack alignItems={"center"} space={1.5} flex={1}>
              <FontAwesomeIcon icon={faChevronDown} size={12} />
              <Text>{LL.schedule.requestForLesson()}</Text>
            </HStack>
            <Text color="rgb(0, 113, 240)" flex={1} textAlign={"right"} onPress={() => setEditingStudentRequest(true)}>{LL.schedule.editRequest()}</Text>
          </HStack>
          <TextArea p={4} color={!!scheduleItem.studentRequest ? "inherit" : "#8399a7"} autoCompleteType={undefined} 
            placeholder={LL.schedule.currentlyThereIsNoRequest()} value={studentRequest} isReadOnly={!editingStudentRequest}
            rightElement={<>{ editingStudentRequest ? <Button onPress={() => handleSaveRequest(scheduleItem)}>Save</Button> : null}</>}
            onChangeText={setStudentRequest}
          />
        </VStack>
      </VStack>
      <Modal isOpen={showCancelModal} onClose={() => setShowCancelModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{LL.ui.cancel()}</Modal.Header>
          <Modal.Body>
          <Text>Are you sure you want to cancel this booked class?</Text>
          <HStack space={3} alignSelf={"flex-end"}>
            <Button onPress={() => handleCancel(scheduleItem)}>Confirm</Button>
            <Button variant="outline" onPress={() => setShowCancelModal(false)}>
              Cancel
            </Button>
          </HStack>
        </Modal.Body>
        </Modal.Content>
        </Modal></>
      ))}
            <Button mt={4} onPress={() => navigation.navigate("Dial" as never)}>
        {LL.schedule.goToMeeting()}
      </Button>
    </VStack>
  );
};

export default BookedItem;
