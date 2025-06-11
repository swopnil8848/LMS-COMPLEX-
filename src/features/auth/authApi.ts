import axiosInstance from "../../services/axiosInstance";

// types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupUser {
  // id: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  data: SignupUser;
  token: string;
  status: string;
}

export interface signUpResponse {
  data: {
    data: SignupUser;
    message: string;
    status: string;
  };
}

// login
export const loginAPI = async ({
  email,
  password,
}: AuthCredentials): Promise<AuthResponse> => {
  await new Promise((res) => setTimeout(res, 500)); // simulate delay
  const response = await axiosInstance.post<AuthResponse>("/api/auth/login", {
    email,
    password,
  });

  return response.data;
};

// signup
export const signupAPI = async (data: SignupUser): Promise<signUpResponse> => {
  const response = await axiosInstance.post<signUpResponse>(
    "/api/auth/signup",
    data
  );

  console.log("response from signup:: ", response);
  return response.data;
};
