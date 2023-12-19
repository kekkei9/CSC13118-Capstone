import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import https from "https";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/AuthConstant";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Response } from "../../types/Response";

export interface RequestOptions {
  redirectOn401?: boolean;
}

export const axiosConfigs: RequestOptions = { redirectOn401: true };
interface CustomAxiosInstance extends AxiosInstance {
  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<R>;

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<R>;

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig & RequestOptions
  ): Promise<R>;
}

export const axiosClient: CustomAxiosInstance = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

export const refreshAccessToken = async () => {
  const { data: refreshResult } = await axiosClient.post<
    Response<Omit<LoginData, "refreshToken">>
  >("/dev/auth/refresh_token", {
    refreshToken: await AsyncStorage.getItem(REFRESH_TOKEN),
  });
  await AsyncStorage.setItem(
    ACCESS_TOKEN,
    refreshResult?.data?.accessToken || ""
  );
  return refreshResult?.data?.accessToken;
};

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN);
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalConfig = error.config;
    if (error?.response?.status === 401) {
      try {
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + access_token;
        return axiosClient(originalConfig);
      } catch (error: any) {
        if (originalConfig.redirectOn401) {
          console.log("redirectOn401, redirect to login");
          //   const redirectUrl = Router.query.redirect || Router.asPath;
          //   Router.push({
          //     pathname: "/auth/signin",
          //     query: { redirect: redirectUrl },
          //   });
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export const fetcher = async (url: string, options?: RequestOptions) =>
  axiosClient.get(url, { ...axiosConfigs, ...options }).then((res) => res.data);
