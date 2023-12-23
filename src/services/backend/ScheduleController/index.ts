//@ts-ignore

import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosClient } from "../axiosClient";
import { ACCESS_TOKEN } from "../../../constants/AuthConstant";
import { BaseResponse, BaseResponseList } from "../../../types/Response/BaseResponse";
import { TutorSchedule } from "../../../types/Schedule";

// --------------------------GET DATA ---------------------------

export const getOwnSchedule = () => axiosClient.post(`/schedule`);

export const getScheduleByTutorId = (tutorId: string) =>
  axiosClient.post<BaseResponse<TutorSchedule[]>>("/schedule", { tutorId });

// --------------------------POST ACTIONS ---------------------------

export const bookAClass = (scheduleDetailIds: string[], note: string) =>
  axiosClient.post("/booking", { scheduleDetailIds, note });

export const cancelABookedClass = async (scheduleDetailIds: string) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);

  if (!token) return;
  axiosClient.delete("/booking", {
    data: { scheduleDetailIds },
    headers: { Authorization: token },
  });
};

export const updateStudentRequest = (
  bookedId: string,
  studentRequest: string
) =>
  axiosClient.post(`/booking/student-request/${bookedId}`, { studentRequest });
