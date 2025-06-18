// api/auth.api.ts
import axiosInstance from "../../services/axiosInstance.ts";
import type {
  LoginRequest,
  SignupRequest,
  AuthSuccessResponse,
  AuthErrorResponse,
  User,
  ApiResponse,
} from "../../types/auth.types.ts";

export class AuthAPI {
  static async login(credentials: LoginRequest): Promise<AuthSuccessResponse> {
    // Simulate delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await axiosInstance.post<AuthSuccessResponse>(
      "/api/auth/login",
      credentials
    );

    return response.data;
  }

  static async signup(userData: SignupRequest): Promise<AuthSuccessResponse> {
    const response = await axiosInstance.post<AuthSuccessResponse>(
      "/api/auth/signup",
      userData
    );

    return response.data;
  }

  static async getMe(): Promise<ApiResponse<User>> {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axiosInstance.get<ApiResponse<User>>(
      "/api/auth/me",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );

    return response.data;
  }

  static async verifyEmail(token: string): Promise<ApiResponse<User>> {
    const response = await axiosInstance.post<ApiResponse<User>>(
      `/api/auth/verify-email/${token}`
    );

    return response.data;
  }
}
