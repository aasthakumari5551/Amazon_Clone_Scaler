"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";

const NavbarUser = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <Link href="/login" className="leading-tight">
        <div className="text-[10px] text-zinc-300">Hello, sign in</div>
        <div className="flex items-center gap-1 text-xs font-semibold text-white">
          Account & Lists
          <ChevronDown className="h-3 w-3" />
        </div>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <button onClick={logout} className="leading-tight text-left">
        <div className="text-[10px] text-zinc-300">Hello, {user?.fullName ?? "Account"}</div>
        <div className="flex items-center gap-1 text-xs font-semibold text-white">
          Account & Lists
          <ChevronDown className="h-3 w-3" />
        </div>
      </button>
    </div>
  );
};

export default NavbarUser;
