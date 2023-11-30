import { createSlice } from "@reduxjs/toolkit";

type AuthenticationProps = {
  isAuth: boolean;
  role?: "teacher" | "student";
};

const initialState: AuthenticationProps = {
  //TODO: change to false
  isAuth: true,
  role: "student",
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
    setRole: (state, action) => {
      return {
        ...state,
        role: action.payload,
      };
    },
  },
});

export const { loginByEmailPassword, logOut, setRole } = profileSlice.actions;

export default profileSlice.reducer;
