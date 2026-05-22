"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { User } from "@/types/auth.types";

const AUTH_TOKEN_KEY = "auth_token";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setAuth: (user, token) => {
        document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/`;
        set({ user, token, isAuthenticated: true });
      },
      logout: () => {
        document.cookie = `${AUTH_TOKEN_KEY}=; path=/; max-age=0`;
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: "amazon-auth",
      storage: createJSONStorage(() => localStorage)
    }
  )
);
