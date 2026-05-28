"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-base">
      <div className="text-center space-y-4 p-8 rounded-2xl border border-red-900/30 bg-surface max-w-md">
        <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
          <span className="text-red-400 text-lg">!</span>
        </div>
        <h2 className="font-syne font-bold text-text">Connection Failed</h2>
        <p className="font-mono text-xs text-text-dim leading-relaxed">
          {error.message.includes("Supabase")
            ? "Could not connect to the database. Check your environment variables."
            : "Something went wrong loading the dashboard."}
        </p>
        <button
          onClick={reset}
          className="mt-2 px-4 py-2 rounded-lg border border-border text-text-dim font-mono text-xs hover:border-accent/30 hover:text-accent transition-all duration-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
