import { AuthResponse } from "../../../types/Response/AuthResponse";
import { BaseResponse } from "../../../types/Response/BaseResponse";
import { axiosClient } from "../axiosClient";

// ---------------------------SIGN UP---------------------------

export const signUpByEmailPassword = (email: string, password: string) =>
  axiosClient.post("/auth/register", { email, password, source: null });

export const signUpByPhonePassword = (phone: string, password: string) =>
  axiosClient.post("/auth/phone-register", { phone, password, source: null });

// ---------------------------LOG IN---------------------------

export const logInByEmailPassword = (email: string, password: string) =>
  axiosClient.post<AuthResponse>("/auth/login", { email, password });

export const logInByPhonePassword = (phone: string, password: string) =>
  axiosClient.post("/auth/phone-login", { phone, password });

export const logInByGoogle = (accessToken: string) =>
  axiosClient.post("/auth/google", { access_token: accessToken });

export const logInByFacebook = (accessToken: string) =>
  axiosClient.post("/auth/facebook", { access_token: accessToken });

// ---------------------------VERIFY---------------------------

export const verifyAccount = (token: string) =>
  axiosClient.get(`/auth/verifyAccount?token=${token}`);

export const activatePhoneWithOTP = (phone: string, otp: string) =>
  axiosClient.post("/verify/phone-auth-verify/activate", { phone, otp });

export const resendPhoneOTP = (phone: string) =>
  axiosClient.post("/verify/phone-auth-verify/create", { phone });

// ---------------------------FORGOT PASSWORD---------------------------

export const sendForgotPasswordEmail = (email: string) =>
  axiosClient.post<BaseResponse<{}>>("/user/forgotPassword", { email });
