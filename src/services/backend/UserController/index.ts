import { axiosClient } from "../axiosClient";

export const changeUserPassword = (password: string, newPassword: string) =>
  axiosClient.post("/auth/change-password", { password, newPassword });

export const getUserInformation = () => axiosClient.get("/user/me");

export const updateUserInformation = (user: User) =>
  axiosClient.put("/user/info", user);

export const registerToBecomeTeacher = (teacherForm: FormData) =>
  axiosClient.post("/tutor/register", teacherForm);
