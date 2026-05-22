"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import type { LoginPayload, RegisterPayload } from "@/types/auth.types";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAuth, logout: clearAuth } = useAuthStore();

  const login = async (payload: LoginPayload) => {
    try {
      const response = await authService.login(payload);
      setAuth(response.user, response.token);
      const redirect = searchParams.get("redirect");
      router.push(redirect || "/");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  const register = async (payload: RegisterPayload) => {
    try {
      await authService.register(payload);
      await login({ email: payload.email, password: payload.password });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Registration failed");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      clearAuth();
      router.push("/");
    }
  };

  return { login, register, logout };
};
