import axiosInstance from "../../services/axiosInstance";

// types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupUser {
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: number; email: string };
  token: string;
}

// login
export const loginAPI = async ({
  email,
  password,
}: AuthCredentials): Promise<AuthResponse> => {
  await new Promise((res) => setTimeout(res, 500)); // simulate delay
  return {
    user: { id: 1, email },
    token: "mock-token-123",
  };
};

// signup
export const signupAPI = async (data: SignupUser): Promise<AuthResponse> => {
  const response = await axiosInstance.post<AuthResponse>("/auth/signup", data);
  return response.data;
};
