"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { checkoutSchema } from "@/lib/validators";
import type { PlaceOrderPayload } from "@/types/order.types";

type AddressFormProps = {
  onSubmit: (data: PlaceOrderPayload) => void;
  isSubmitting: boolean;
};

const AddressForm = ({ onSubmit, isSubmitting }: AddressFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PlaceOrderPayload>({ resolver: zodResolver(checkoutSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="text-sm text-zinc-600">Full Name</label>
        <input
          {...register("shippingName")}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        {errors.shippingName ? (
          <p className="text-xs text-red-600">{errors.shippingName.message}</p>
        ) : null}
      </div>
      <div>
        <label className="text-sm text-zinc-600">Address</label>
        <input
          {...register("shippingAddress")}
          className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
        />
        {errors.shippingAddress ? (
          <p className="text-xs text-red-600">{errors.shippingAddress.message}</p>
        ) : null}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <label className="text-sm text-zinc-600">City</label>
          <input
            {...register("shippingCity")}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.shippingCity ? (
            <p className="text-xs text-red-600">{errors.shippingCity.message}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm text-zinc-600">State</label>
          <input
            {...register("shippingState")}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.shippingState ? (
            <p className="text-xs text-red-600">{errors.shippingState.message}</p>
          ) : null}
        </div>
        <div>
          <label className="text-sm text-zinc-600">PIN</label>
          <input
            {...register("shippingPin")}
            className="mt-1 w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          {errors.shippingPin ? (
            <p className="text-xs text-red-600">{errors.shippingPin.message}</p>
          ) : null}
        </div>
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-[var(--amazon-orange)] text-zinc-900 hover:bg-[#f6a52b]"
      >
        Place Order
      </Button>
    </form>
  );
};

export default AddressForm;
