// types/auth.types.ts

export interface User {
  id: number;
  firstName: string;
  middleName?: string;
  lastName?: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  passwordChangedAt?: string | null;
  emailVerificationToken?: string | null;
  passwordResetToken?: string | null;
}

export type UserRole = "student" | "admin" | "teacher";

// Request types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

// Response types
export interface AuthSuccessResponse {
  status: "success";
  message: string;
  data: User;
  token?: string;
}

export interface ValidationErrorResponse {
  status: "fail";
  message: string;
  errors: Record<string, string>;
}

export interface GeneralErrorResponse {
  status: "fail" | "error";
  message: string;
}

export interface SimpleAPIResponse {
  status: "succes" | "fail";
  message: string;
}

export interface forgotPasswordRequest {
  email: string;
}

export interface ResetPasswordPayload {
  resetToken: string;
  password: string;
}

export type AuthErrorResponse = ValidationErrorResponse | GeneralErrorResponse;

// Redux state types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  errors: Record<string, string>;
  message: string | null;
}

// Form error types
export interface FormErrors {
  [key: string]: string;
}

// API response wrapper
export interface ApiResponse<T> {
  status: "success" | "fail" | "error";
  message: string;
  data?: T;
  errors?: Record<string, string>;
}
