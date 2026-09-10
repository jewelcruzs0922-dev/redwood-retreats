"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <div className="text-center">
        <h2 className="font-serif text-3xl font-bold mb-4">Something went wrong</h2>
        <p className="text-text-muted mb-8">We apologize for the inconvenience.</p>
        <button
          onClick={reset}
          className="bg-accent px-8 py-3 text-sm font-semibold tracking-wider text-bg uppercase hover:bg-ember transition-colors"
          style={{ borderRadius: "14px 4px 14px 4px" }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
