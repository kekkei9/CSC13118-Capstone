import { createSlice } from "@reduxjs/toolkit";

type AuthenticationProps = {
  isAuth: boolean;
  role?: "teacher" | "student";
};

const initialState: AuthenticationProps = {
  isAuth: false,
};

const profileSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loginByEmailPassword: (state, action) => {
      const { email, password } = action.payload;

      if (email === "teacher@lettutor.com" && password === "123456")
        return {
          isAuth: true,
          role: "teacher",
        };
      if (email === "student@lettutor.com" && password === "123456")
        return {
          isAuth: true,
          role: "student",
        };
    },
    logOut: () => {
      return {
        isAuth: false,
      };
    },
  },
});

export const { loginByEmailPassword, logOut } = profileSlice.actions;

export default profileSlice.reducer;
