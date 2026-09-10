"use client";

export function WaveDivider({ flip, to = "var(--color-bg-warm)" }: { flip?: boolean; to?: string }) {
  return (
    <div className="relative h-20 -mt-20 overflow-hidden pointer-events-none z-10" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#e8913a" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#f5c842" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#e8913a" stopOpacity="0.08" />
          </linearGradient>
        </defs>
        <path
          d="M0 40C180 70 360 10 540 40C720 70 900 15 1080 40C1260 65 1380 30 1440 40V80H0V40Z"
          fill={to}
        />
        <path
          d="M0 42C180 72 360 12 540 42C720 72 900 17 1080 42C1260 67 1380 32 1440 42"
          stroke="url(#waveGrad)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

export function WarmDivider({ flip, color = "var(--color-bg)" }: { flip?: boolean; color?: string }) {
  return (
    <div className="relative h-16 -mt-16 overflow-hidden pointer-events-none" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0 40C240 80 480 0 720 40C960 80 1200 0 1440 40V80H0V40Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

export function AFrameShape({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M100 0L200 160H0L100 0Z"
        fill="currentColor"
        fillOpacity="0.05"
      />
      <path
        d="M100 10L185 155H15L100 10Z"
        stroke="currentColor"
        strokeOpacity="0.1"
        strokeWidth="0.5"
        fill="none"
      />
      <path
        d="M100 30L165 145H35L100 30Z"
        stroke="currentColor"
        strokeOpacity="0.08"
        strokeWidth="0.5"
        fill="none"
      />
    </svg>
  );
}

export function WarmGlow({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: "600px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(232, 145, 58, 0.06) 0%, transparent 70%)",
      }}
    />
  );
}
