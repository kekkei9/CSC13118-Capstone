import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/Auth";
import { loginWithEmailPassword } from "./authentication.action";

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
  reducers: {},
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

export default profileSlice.reducer;
