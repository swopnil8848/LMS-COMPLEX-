import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  loginAPI,
  signupAPI,
  type AuthCredentials,
  type AuthResponse,
  type signUpResponse,
  type SignupUser,
} from "./authApi";

// Thunks
export const loginUser = createAsyncThunk<AuthResponse, AuthCredentials>(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await loginAPI(credentials);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const signupUser = createAsyncThunk<signUpResponse, SignupUser>(
  "auth/signupUser",
  async (data, thunkAPI) => {
    try {
      return await signupAPI(data);
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

// State type
interface AuthState {
  user: SignupUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface signupState extends signUpResponse {
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.user = action.payload.data;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signupUser.fulfilled,
        (state, action: PayloadAction<signUpResponse>) => {
          state.loading = false;
          state.user = action.payload.data.data;
        }
      )
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
