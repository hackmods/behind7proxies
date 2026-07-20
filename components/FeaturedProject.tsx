import { ArrowUpRight, Gamepad2 } from "lucide-react";
import type { Project } from "@/lib/projects";

type FeaturedProjectProps = {
  project: Project;
};

export default function FeaturedProject({ project }: FeaturedProjectProps) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-border bg-surface/80 transition-all duration-300 hover:border-accent/50"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(61,255,154,0.1), transparent 55%)",
        }}
        aria-hidden
      />
      <div className="relative grid gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto] md:items-end md:gap-10 md:p-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
            <Gamepad2 className="size-3.5" aria-hidden />
            Featured
          </div>
          <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {project.title}
          </h3>
          <p className="max-w-xl text-base leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded border border-border px-2.5 py-1 font-mono text-xs text-accent/90"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="inline-flex items-center gap-2 self-start font-mono text-sm text-accent transition-transform duration-300 group-hover:translate-x-0.5 md:self-end">
          Visit axoalley.com
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </a>
  );
}
