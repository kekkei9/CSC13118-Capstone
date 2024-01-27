import { axiosConfigs } from './../axiosClient';
import { User } from "../../../types/Auth";
import { axiosClient } from "../axiosClient";

export const changeUserPassword = (password: string, newPassword: string) =>
  axiosClient.post("/auth/change-password", { password, newPassword });

export const getUserInformation = () => axiosClient.get("/user/me");

export const updateUserInformation = (user: User) =>
  axiosClient.put("/user/info", user);

export const updateUserAvatar = (formData: FormData) => {
  return axiosClient.post("/user/uploadAvatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const registerToBecomeTeacher = (teacherForm: FormData) =>
  axiosClient.post("/tutor/register", teacherForm);
