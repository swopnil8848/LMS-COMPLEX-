// features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AuthAPI } from "./authApi";
import type {
  AuthState,
  LoginRequest,
  SignupRequest,
  AuthSuccessResponse,
  AuthErrorResponse,
  FormErrors,
} from "../../types/auth.types";

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  errors: {},
  message: null,
};

// Helper function to extract errors from response
const extractErrors = (errorResponse: any): FormErrors => {
  if (errorResponse?.errors && typeof errorResponse.errors === "object") {
    return errorResponse.errors;
  }
  return {};
};

// Async thunks
export const loginUser = createAsyncThunk<
  AuthSuccessResponse,
  LoginRequest,
  { rejectValue: AuthErrorResponse }
>("auth/login", async (credentials, { rejectWithValue }) => {
  try {
    return await AuthAPI.login(credentials);
  } catch (error: any) {
    const errorData = error.response?.data;
    return rejectWithValue({
      status: errorData?.status || "fail",
      message: errorData?.message || "Login failed",
      errors: errorData?.errors || {},
    });
  }
});

export const signupUser = createAsyncThunk<
  AuthSuccessResponse,
  SignupRequest,
  { rejectValue: AuthErrorResponse }
>("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    return await AuthAPI.signup(userData);
  } catch (error: any) {
    const errorData = error.response?.data;
    console.log("error data:: ", errorData);
    return rejectWithValue({
      status: errorData?.status || "fail",
      message: errorData?.message || "Signup failed",
      errors: errorData?.error || {},
    });
  }
});

export const getProfile = createAsyncThunk<
  AuthSuccessResponse,
  string,
  { rejectValue: AuthErrorResponse }
>("auth/profile", async (token, { rejectWithValue }) => {
  try {
    const response = await AuthAPI.getProfile(token);
    return {
      status: "success",
      message: "Profile loaded successfully",
      data: response.data!,
    };
  } catch (error: any) {
    const errorData = error.response?.data;
    return rejectWithValue({
      status: errorData?.status || "fail",
      message: errorData?.message || "Failed to load profile",
    });
  }
});

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.errors = {};
      state.message = null;
      localStorage.removeItem("token");
    },
    clearErrors: (state) => {
      state.errors = {};
      state.message = null;
    },
    setFieldError: (
      state,
      action: PayloadAction<{ field: string; error: string }>
    ) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    clearFieldError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.token = action.payload.token || null;
        state.message = action.payload.message;

        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Login failed";
        state.errors = extractErrors(action.payload);
      })

      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.errors = {};
        state.message = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.message = action.payload.message;
        // Note: Signup typically doesn't return a token until email is verified
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Signup failed";
        state.errors = extractErrors(action.payload);
      })

      // Profile cases
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Failed to load profile";
        // If profile load fails, user might need to login again
        if (action.payload?.status === "error") {
          state.user = null;
          state.token = null;
          localStorage.removeItem("token");
        }
      });
  },
});

export const { logout, clearErrors, setFieldError, clearFieldError } =
  authSlice.actions;
export default authSlice.reducer;
