import { Tutor } from "../../../types/Tutor";
import { axiosClient } from "../axiosClient";

export const writeReviewForATutor = (
  bookingId: string,
  userId: string,
  rating: number,
  content: string
) =>
  axiosClient.post(`/user/feedbackTutor`, {
    bookingId,
    userId,
    rating,
    content,
  });

export type TutorFilter = {
  specialties: string[];
  date: null;
  nationality: Record<string, boolean>;
  tutoringTimeAvailable: any[];
};

export const initTutorFilter = {
  specialties: [],
  date: null,
  nationality: {},
  tutoringTimeAvailable: [null, null],
};

export const searchTutor = (
  filters: TutorFilter,
  search: string,
  page: number,
  perPage: number
) =>
  axiosClient.post<{ count: number; rows: Tutor[] }>(`/tutor/search`, {
    filters,
    search,
    page,
    perPage,
  });

export const addTutorToFavorite = (tutorId: string) =>
  axiosClient.post(`/user/manageFavoriteTutor`, { tutorId });
