import axiosInstance from "../../services/axiosInstance.ts";
import type { ApiResponse } from "../../types/auth.types.ts";
import type { Institution } from "../../types/institute.types.ts";

export const InstitutionAPI = {
  async getInstitutionByCode(institutecode: string): Promise<ApiResponse<Institution>> {
    const response = await axiosInstance.get<ApiResponse<Institution>>(
      `/api/institute/code/${institutecode}`
    );
    return response.data;
  }
};
