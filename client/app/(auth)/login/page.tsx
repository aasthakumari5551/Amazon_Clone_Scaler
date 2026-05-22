"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginSchema } from "@/lib/validators";
import type { LoginPayload } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginPayload>({ resolver: zodResolver(loginSchema) });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--amazon-light)] px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Sign In</h1>
        <p className="mt-2 text-sm text-zinc-500">Welcome back to Amazon Clone.</p>
        <form onSubmit={handleSubmit(login)} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-zinc-600">Email</label>
            <input
              {...register("email")}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.email ? (
              <p className="text-xs text-red-600">{errors.email.message}</p>
            ) : null}
          </div>
          <div>
            <label className="text-sm text-zinc-600">Password</label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.password ? (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            ) : null}
          </div>
          <Button className="w-full bg-[var(--amazon-orange)] text-zinc-900 hover:bg-[#f6a52b]">
            Sign In
          </Button>
        </form>
        <p className="mt-6 text-xs text-zinc-500">
          New here?{" "}
          <Link href="/register" className="font-semibold text-zinc-900">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
