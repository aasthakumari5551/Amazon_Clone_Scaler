"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { registerSchema } from "@/lib/validators";
import type { RegisterPayload } from "@/types/auth.types";
import { useAuth } from "@/hooks/useAuth";

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterPayload & { confirmPassword: string }>({
    resolver: zodResolver(registerSchema)
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-(--amazon-light) px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8">
        <h1 className="text-2xl font-semibold text-zinc-900">Create Account</h1>
        <p className="mt-2 text-sm text-zinc-500">Start your Amazon Clone journey.</p>
        <form onSubmit={handleSubmit((data) => registerUser(data))} className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-zinc-600">Full Name</label>
            <input
              {...register("fullName")}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.fullName ? (
              <p className="text-xs text-red-600">{errors.fullName.message}</p>
            ) : null}
          </div>
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
          <div>
            <label className="text-sm text-zinc-600">Confirm Password</label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
          <Button className="w-full bg-(--amazon-orange) text-zinc-900 hover:bg-[#f6a52b]">
            Create Account
          </Button>
        </form>
        <p className="mt-6 text-xs text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-zinc-900">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
