"use client";

import { create } from "zustand";
import type { User } from "@/types/auth.types";

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  setAuth: (user: User, token?: string | null) => void;
  setAuthLoading: (value: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  (set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isAuthLoading: true,
    setAuth: (user, token) => {
      set({ user, token: token ?? null, isAuthenticated: true, isAuthLoading: false });
    },
    setAuthLoading: (value) => {
      set({ isAuthLoading: value });
    },
    logout: () => {
      set({ user: null, token: null, isAuthenticated: false, isAuthLoading: false });
    }
  })
);
