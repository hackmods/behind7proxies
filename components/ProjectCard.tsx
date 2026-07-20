import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const label = project.externalLabel ?? "View on GitHub";

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-hover"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <ArrowUpRight
          className="size-4 shrink-0 text-muted transition-colors group-hover:text-accent"
          aria-hidden
        />
      </div>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
        {project.description}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        {project.tech.map((tag) => (
          <span
            key={tag}
            className="rounded border border-border px-2 py-0.5 font-mono text-xs text-accent/90"
          >
            {tag}
          </span>
        ))}
        <span className="ml-auto font-mono text-xs text-muted opacity-0 transition-opacity group-hover:opacity-100">
          {label}
        </span>
      </div>
    </a>
  );
}
