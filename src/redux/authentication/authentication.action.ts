import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInByEmailPassword } from "../../services/backend/AuthController";
import { User } from "../../types/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/AuthConstant";

export const loginWithEmailPassword = createAsyncThunk<User, any>(
  "authentication/loginWithEmailPassword",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const { email, password } = payload;
      const { data: response } = await logInByEmailPassword(email, password);
      if (!response) return thunkAPI.rejectWithValue("User not exist");
      const {
        user,
        tokens: { access, refresh },
      } = response;
      //store tokens to storage so that we can use it next time
      await AsyncStorage.setItem(ACCESS_TOKEN, access.token);
      await AsyncStorage.setItem(REFRESH_TOKEN, refresh.token);

      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
