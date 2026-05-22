"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";

const NavbarUser = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link href="/login" className="text-sm hover:text-(--amazon-orange)">
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="hidden sm:inline">Hi, {user?.fullName}</span>
      <button onClick={logout} className="text-xs uppercase tracking-wide text-zinc-200">
        Sign Out
      </button>
    </div>
  );
};

export default NavbarUser;
