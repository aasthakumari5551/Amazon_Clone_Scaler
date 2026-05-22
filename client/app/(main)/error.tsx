"use client";

import ErrorBanner from "@/components/shared/ErrorBanner";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="space-y-4">
      <ErrorBanner message={error.message || "Something went wrong"} />
      <button
        onClick={reset}
        className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-semibold text-white"
      >
        Try again
      </button>
    </div>
  );
};

export default Error;
