import { User } from "../../../types/Auth";
import { axiosClient } from "../axiosClient";

export const changeUserPassword = (password: string, newPassword: string) =>
  axiosClient.post("/auth/change-password", { password, newPassword });

export const getUserInformation = () => axiosClient.get("/user/me");

export const updateUserInformation = (user: User) =>
  axiosClient.put("/user/info", user);

export const updateUserAvatar = (avatar: Blob) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  console.log(formData);

  return axiosClient.post("/user/uploadAvatar", formData);
}

export const registerToBecomeTeacher = (teacherForm: FormData) =>
  axiosClient.post("/tutor/register", teacherForm);
