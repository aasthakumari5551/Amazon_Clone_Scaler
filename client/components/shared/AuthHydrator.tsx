"use client";

import { useEffect } from "react";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

const AuthHydrator = () => {
  const { setAuth, setAuthLoading, logout } = useAuthStore();

  useEffect(() => {
    let isMounted = true;

    const hydrate = async () => {
      setAuthLoading(true);
      try {
        const response = await authService.me();
        if (isMounted) {
          setAuth(response.user, null);
        }
      } catch {
        if (isMounted) {
          logout();
        }
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }
    };

    hydrate();

    return () => {
      isMounted = false;
    };
  }, [setAuth, setAuthLoading, logout]);

  return null;
};

export default AuthHydrator;
