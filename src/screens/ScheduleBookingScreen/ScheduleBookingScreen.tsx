import { Button, Center, HStack, Text, TextArea, VStack, View, useToast } from "native-base";
import { useAppSelector } from "../../redux/store";
import { useState } from "react";
import { useI18nContext } from "../../i18n/i18n-react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { TutorStackParamList, TutorsStackNavigationProp } from "../../types/Route/Stack";
import { bookAClass } from "../../services/backend/ScheduleController";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const ScheduleBookingScreen = () => {
    const {LL} = useI18nContext();
    const toast = useToast();
    const navigation = useNavigation<TutorsStackNavigationProp>();
    const user = useAppSelector((state) => state.authentication.data);
    const { params } = useRoute<RouteProp<TutorStackParamList, "Schedule Booking">>();
    
    const [success, setSuccess] = useState<boolean>(false);
    const [note, setNote] = useState<string>("");

    const handleBook = async () => {
        console.log([params.scheduleDetailId], note)
        try {
            const result = await bookAClass([params.scheduleDetailId], note);
            if (result.status === 200) {
                toast.show({
                    title: "Success",
                    placement: "top",
                });
                setSuccess(true);
            }
        } catch (error) {
            console.log(error)
            toast.show({
                title: "Error",
                placement: "top",
            });
        }
    } 

    return ( <VStack px={8} space={4}>
        { success ? 
        <Center p={6}>
            <FontAwesomeIcon icon={faCheckCircle} color="#52c41a" size={72}/>
            <Text mt={6} fontSize={24}>Booking success</Text>
            <Text mt={2} textAlign={"center"} color={"rgba(0,0,0,.45)"}>
                Check your mail's inbox to see detail order
            </Text>
            <Button
                onPress={() => {
                    navigation.goBack();
                }}
                mt={3}
                alignSelf={"flex-end"}
                variant={"outline"}
            >
                Done
            </Button>
        </Center>
        : 
        <>
            <Text>Booking details</Text>
            <VStack>
                <Text>Booking Time</Text>
                <View>
                    <Text>11:00 - 11:25 Tuesday, 30 January 2024</Text>
                </View>
            </VStack>
            <VStack>
                <HStack justifyContent={"space-between"}>
                    <Text>Balance</Text>
                    <Text>You have {(Number(user?.walletInfo.amount) || 0) / 100000} lessons left</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                    <Text>Price</Text>
                    <Text>1 lesson</Text>
                </HStack>
            </VStack>
            <VStack>
                <Text>Notes</Text>
                <View>
                    <TextArea autoCompleteType={undefined} value={note} onChangeText={setNote}/>
                </View>
            </VStack>
            <HStack space={2} alignSelf={"flex-end"}>
                <Button 
                    onPress={() => navigation.goBack()}
                    variant={"outline"}
                >
                    {LL.ui.cancel()}
                </Button>
                <Button
                    onPress={handleBook}
                >
                    {LL.tutorList.book()}
                </Button>
            </HStack>
        </>}
    </VStack>);
}
 
export default ScheduleBookingScreen;