import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/Auth";
import { loginWithEmailPassword } from "./authentication.action";

export type AuthenticationState = {
  data: {
    user: User | null;
  };
  status: {
    error: any;
    code?: string;
  };
};

const initialState: AuthenticationState = {
  data: {
    user: null,
  },
  status: {
    error: null,
  },
};

const profileSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginWithEmailPassword.fulfilled, (state, action) => {
      state.data.user = action.payload;
      state.status.error = null;
      state.status.code = undefined;
    });

    builder.addCase(loginWithEmailPassword.rejected, (state, action) => {
      state.data.user = null;
      state.status.error = action.error;
      state.status.code = undefined;
    });

    builder.addCase(loginWithEmailPassword.pending, (state) => {
      state.data.user = null;
      state.status.error = null;
      state.status.code = undefined;
    });
  },
});

export default profileSlice.reducer;
