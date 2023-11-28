import { createSlice } from "@reduxjs/toolkit";

type AuthenticationProps = {
  isAuth: boolean;
};

const initialState: AuthenticationProps = {
  isAuth: false,
};

const profileSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginByUsernamePassword: () => {
      return {
        isAuth: true,
      };
    },
    logOut: () => {
      return {
        isAuth: false,
      };
    },
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
