import { createAsyncThunk } from "@reduxjs/toolkit";
import { logInByEmailPassword } from "../../services/backend/AuthController";
import { User } from "../../types/Auth";

export const loginWithEmailPassword = createAsyncThunk<User, any>(
  "authentication/loginWithEmailPassword",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const { email, password } = payload;
      const response = await logInByEmailPassword(email, password);
      console.log(response.data);
      if (!response) return thunkAPI.rejectWithValue("User not exist");
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
