export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="text-xs tracking-[0.3em] text-text-muted uppercase">Loading</span>
      </div>
    </div>
  );
}
