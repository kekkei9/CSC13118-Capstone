import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/AuthConstant";
import { AuthResponse } from "../../types/Response/AuthResponse";

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
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

export const refreshAccessToken = async () => {
  const currentRefreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  if (!currentRefreshToken) throw new Error("Refresh token not found");
  const { data: response } = await axiosClient.post<AuthResponse>(
    "/auth/refresh-token",
    {
      refreshToken: currentRefreshToken,
      timezone: 7,
    }
  );

  const refreshResult = response.tokens.access.token;
  await AsyncStorage.setItem(ACCESS_TOKEN, refreshResult);
  return refreshResult;
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
