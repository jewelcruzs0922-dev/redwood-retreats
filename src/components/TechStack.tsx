"use client";

const techs = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Turbopack",
  "Vercel",
];

export default function TechStack() {
  return (
    <section className="py-12 bg-bg">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-16 text-center">
        <span className="text-[10px] font-medium tracking-[0.3em] text-text-muted/50 uppercase mb-4 block">
          Built With
        </span>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {techs.map((tech) => (
            <span
              key={tech}
              className="border border-accent/10 bg-bg-card px-4 py-2 text-[10px] font-medium tracking-[0.15em] text-text-muted uppercase transition-colors duration-300 hover:border-accent/30 hover:text-accent"
              style={{ borderRadius: "8px 2px 8px 2px" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
