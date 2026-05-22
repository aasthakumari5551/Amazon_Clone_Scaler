"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <p className="text-sm text-zinc-600">{error.message || "Unable to load"}</p>
      <button
        onClick={reset}
        className="rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white"
      >
        Retry
      </button>
    </div>
  );
};

export default Error;
