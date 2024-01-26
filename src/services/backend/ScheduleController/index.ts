//@ts-ignore

import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosClient } from "../axiosClient";
import { ACCESS_TOKEN } from "../../../constants/AuthConstant";
import { BaseResponse, BaseResponseList } from "../../../types/Response/BaseResponse";
import { TutorSchedule } from "../../../types/Schedule";
import axios from "axios";

// --------------------------GET DATA ---------------------------

export const getOwnSchedule = () => axiosClient.post(`/schedule`);

export const getScheduleByTutorId = (tutorId: string, page: number) =>
  axiosClient.get<{message: string, scheduleOfTutor: TutorSchedule[]}>(`/schedule?tutorId=${tutorId}&page=${page}`);

// --------------------------POST ACTIONS ---------------------------

export const bookAClass = (scheduleDetailIds: string[], note: string) =>
  axiosClient.post<BaseResponse<TutorSchedule[]>>("/booking", { scheduleDetailIds, note });

export const cancelABookedClass = async (scheduleDetailId: string, cancelInfo: {
  cancelReasonId: number,
  note: string
}) => axiosClient.delete<{message: string}>("/booking/schedule-detail", {
  data: { scheduleDetailId, cancelInfo },
});

export const updateStudentRequest = (
  bookedId: string,
  studentRequest: string
) =>
  axiosClient.post(`/booking/student-request/${bookedId}`, { studentRequest });
