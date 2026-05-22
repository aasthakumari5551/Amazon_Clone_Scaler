import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/auth.types";
import { api } from "./api";

export const authService = {
  register: (payload: RegisterPayload) => api.post<{ user: AuthResponse["user"] }>("/auth/register", payload),
  login: (payload: LoginPayload) => api.post<AuthResponse>("/auth/login", payload),
  me: () => api.get<{ user: AuthResponse["user"] }>("/auth/me"),
  logout: () => api.post<{ message: string }>("/auth/logout")
};
