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

export const searchTutor = (studentRequest: string) =>
  axiosClient.post(`/tutor/search`, { studentRequest });

export const addTutorToFavorite = (tutorId: string) =>
  axiosClient.post(`/user/manageFavoriteTutor`, { tutorId });
