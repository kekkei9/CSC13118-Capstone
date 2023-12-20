import { Tutor } from "../Tutor";

export type TutorListResponse = {
  tutors: {
    count: number;
    rows: Tutor[];
  };
  favoriteTutor: Tutor[];
};
