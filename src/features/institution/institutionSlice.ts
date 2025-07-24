// features/institution/institutionSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InstitutionAPI } from "./institutionApi";
import type { Institution } from "../../types/institute.types";
import type { ApiResponse } from "../../types/auth.types";

// Thunk to fetch institution by code
export const getInstitutionByCode = createAsyncThunk<
  ApiResponse<Institution>,
  string,
  { rejectValue: ApiResponse<Institution> }
>("institution/getByCode", async (code, { rejectWithValue }) => {
  try {
    return await InstitutionAPI.getInstitutionByCode(code);
  } catch (error: any) {
    const errorData = error.response?.data;
    return rejectWithValue({
      status: errorData?.status || "fail",
      message: errorData?.message || "Failed to fetch institution",
      errors: errorData?.errors || {},
    });
  }
});

// Define the slice state
interface InstitutionState {
  institution: Institution | null;
  loading: boolean;
  message: string | null;
  errors: Record<string, string>;
}

const initialState: InstitutionState = {
  institution: null,
  loading: false,
  message: null,
  errors: {},
};

const institutionSlice = createSlice({
  name: "institution",
  initialState,
  reducers: {
    clearInstitution: (state) => {
      state.institution = null;
      state.message = null;
      state.errors = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInstitutionByCode.pending, (state) => {
        state.loading = true;
        state.message = null;
        state.errors = {};
      })
      .addCase(getInstitutionByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.institution = action.payload.data || null;
        state.message = action.payload.message;
      })
      .addCase(getInstitutionByCode.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Fetch failed";
        state.errors = action.payload?.errors || {};
      });
  },
});

export const { clearInstitution } = institutionSlice.actions;
export default institutionSlice.reducer;
