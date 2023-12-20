import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/Auth";
import { loginWithEmailPassword } from "./authentication.action";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants/AuthConstant";

export type AuthenticationState = {
  data: User | null;
  status: {
    error: any;
    code?: string;
  };
};

const initialState: AuthenticationState = {
  data: null,
  status: {
    error: null,
  },
};

const profileSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logOut: (state) => {
      // since we do not have any endpoint of logOut user, we just have to clear data * tokens
      AsyncStorage.removeItem(ACCESS_TOKEN);
      AsyncStorage.removeItem(REFRESH_TOKEN);
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailPassword.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status.error = null;
      state.status.code = undefined;
    });

    builder.addCase(loginWithEmailPassword.rejected, (state, action) => {
      state.data = null;
      state.status.error = action.error;
      state.status.code = undefined;
    });

    builder.addCase(loginWithEmailPassword.pending, (state) => {
      state.data = null;
      state.status.error = null;
      state.status.code = undefined;
    });
  },
});

export const { logOut } = profileSlice.actions;

export default profileSlice.reducer;
