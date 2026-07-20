import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Open-source projects by Ryan Morris — educational apps, MCP servers, automation scripts, and more.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl animate-fade-up">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Projects
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Open-source work spanning kid-safe learning platforms, AI tooling,
          union communications, and ops automation.
        </p>
      </header>

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li
            key={project.title}
            className={
              i === 0
                ? "animate-fade-up-delay-1"
                : i < 3
                  ? "animate-fade-up-delay-2"
                  : "animate-fade-up-delay-3"
            }
          >
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </div>
  );
}
