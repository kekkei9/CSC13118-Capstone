import useSWR from "swr";
import { getScheduleByTutorId } from "../../services/backend/ScheduleController";
import dayjs, { Dayjs } from "dayjs";
import { Button, Center, Column, HStack, Row, Text, VStack } from "native-base";
import { validTimestamp } from "../../constants/ScheduleConstant";
import { useEffect, useState } from "react";
import { TutorSchedule } from "../../types/Schedule";
import { useAppSelector } from "../../redux/store";

type BookingTableProps = {
    tutorId: string;
}

const BookingTable = ({tutorId}: BookingTableProps) => {
    const user = useAppSelector((state) => state.authentication.data);
    
    const currentDate = dayjs().hour(0).minute(0).second(0).millisecond(0);
    const [tutorSchedule, setTutorSchedule] = useState<TutorSchedule[]>([]);
    const [displayDates, setDisplayDates] = useState<Dayjs[]>([
        currentDate,
        currentDate.add(1, "day"),
        currentDate.add(2, "day")
    ]);
    const [displayMatrix, setDisplayMatrix] = useState<Record<string, Record<string, TutorSchedule>> | undefined>();
    const [isLoaded, setIsLoaded] = useState<boolean>(false);

    useEffect(() => {  
        const fetchSchedule = async () => {
            const { data: response } = await getScheduleByTutorId(tutorId);
            setTutorSchedule(response.data);
        }
        fetchSchedule();
     }, [tutorId])

     useEffect(() => {
        if (!tutorSchedule.length) return;
        setIsLoaded(false);
        let matrix: Record<string, Record<string, TutorSchedule>> = displayMatrix || {};
        for (const displayDate of displayDates) {
            for (const time of validTimestamp) {
                if (matrix[time.start]) continue;
                const foundDateInSchedule = tutorSchedule.find((schedule) => schedule.startTimestamp === dayjs(displayDate.format("MM-DD-YYYY") + " " + time.start + ":00", "MM-DD-YYYY HH:mm:ss").unix() * 1000);
                if (foundDateInSchedule) {
                    if (!matrix[time.start]) {
                        matrix[time.start] = {};
                    } 
                    matrix[time.start][displayDate.format("MM-DD-YYYY")] = foundDateInSchedule;
                }
            }
        }
        setDisplayMatrix(matrix);
        setIsLoaded(true);
     }, [tutorSchedule, displayDates])

    const handleChangeDateScope = (type: "INCR" | "DECR") => {
        const newDisplayDates = displayDates.map((date) => date.add(type === "INCR"?3:-3, "day"));
        setDisplayDates(newDisplayDates);
    }

    return ( <VStack>
        <HStack mb={3} space={2}>
            <Button onPress={() => handleChangeDateScope("DECR")} disabled={!isLoaded}>Prev</Button>
            <Button onPress={() => handleChangeDateScope("INCR")} disabled={!isLoaded}>Next</Button>
        </HStack>
        <Row>
            <Column flex={1} borderWidth={1} borderColor={"#f5f5f5"} bg={"rgb(249,249,249)"} alignItems={"center"} justifyContent={"center"} px={4}
            ></Column>
            {displayDates.map((displayDate, index) => 
                <Column flex={1} borderWidth={1} borderColor={"#f5f5f5"} alignItems={"center"} justifyContent={"center"} py={4} key={index}>
                    <Center>
                        <Text>{displayDate.format("DD/MM")}</Text>  
                        <Text>{displayDate.format("ddd")}</Text>
                    </Center>
                </Column>
            )}
        </Row>
        {isLoaded ? validTimestamp.map((time, index) =><Row key={index}>
            <Column flex={1} borderWidth={1} borderColor={"#f5f5f5"} bg={"rgb(249,249,249)"} alignItems={"center"} justifyContent={"center"}
            px={4} py={2}><Text fontWeight={"semibold"}>{time.start} - {time.end}</Text></Column>
            {displayDates.map((displayDate, index) => 
                {
                    const foundDateInSchedule = displayMatrix?.[time.start]?.[displayDate.format("MM-DD-YYYY")]
                    const isMyBooking = foundDateInSchedule?.scheduleDetails?.[0].bookingInfo?.[0]?.userId === user?.id 
                    return (
                    <Column flex={1} borderWidth={1} borderColor={"#f5f5f5"} alignItems={"center"} justifyContent={"center"} key={index}>
                        { !!foundDateInSchedule ? 
                            <>
                                {foundDateInSchedule.isBooked ?
                                    <Text color={isMyBooking? "rgb(46,204,113)": "#1A1A1A"}>{isMyBooking? "Booked" : "Reserved"}</Text>:
                                    <Button px={4} py={0} rounded={"full"}>Book</Button>}
                            </>
                        : null}
                    </Column>)
                }
            )}
        </Row>) : null}
    </VStack> );
}
 
export default BookingTable;