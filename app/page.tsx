import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProject from "@/components/FeaturedProject";
import { featuredProject } from "@/lib/projects";
import { posts, formatPostDate } from "@/lib/posts";

export default function HomePage() {
  const recentPost = posts[0];

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-8">
      {/* Hero */}
      <section className="flex min-h-[70vh] flex-col justify-center py-16 sm:py-24">
        <p className="animate-fade-up font-mono text-sm tracking-wide text-accent">
          behind7proxies
        </p>
        <h1 className="animate-fade-up-delay-1 mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Ryan Morris
        </h1>
        <p className="animate-fade-up-delay-2 mt-4 max-w-lg text-xl text-muted sm:text-2xl">
          Dad. Geek. Programmer. Cyclist.
        </p>
        <p className="animate-fade-up-delay-2 mt-5 max-w-xl text-base leading-relaxed text-muted">
          I build open-source tools, kid-safe learning apps, and infrastructure
          integrations from Ontario, Canada — keeping things clean, practical,
          and a little bit playful.
        </p>
        <div className="animate-fade-up-delay-3 mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            View Projects
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/40 hover:text-accent"
          >
            Read Blog
          </Link>
        </div>
      </section>

      {/* Featured Work */}
      <section className="pb-20" aria-labelledby="featured-heading">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2
              id="featured-heading"
              className="text-2xl font-semibold tracking-tight text-foreground"
            >
              Featured Work
            </h2>
            <p className="mt-2 text-sm text-muted">
              The flagship project I&apos;m shipping right now.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-muted transition-colors hover:text-accent sm:inline-flex sm:items-center sm:gap-1"
          >
            All projects
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>
        <FeaturedProject project={featuredProject} />
      </section>

      {/* Recent Writings */}
      <section className="pb-24" aria-labelledby="writings-heading">
        <div className="mb-8">
          <h2
            id="writings-heading"
            className="text-2xl font-semibold tracking-tight text-foreground"
          >
            Recent Writings
          </h2>
          <p className="mt-2 text-sm text-muted">
            Technical notes on security, DevOps, and open source.
          </p>
        </div>
        <Link
          href={`/blog/${recentPost.slug}`}
          className="group block rounded-xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover sm:p-8"
        >
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
            <time dateTime={recentPost.date}>
              {formatPostDate(recentPost.date)}
            </time>
            <span aria-hidden>·</span>
            <span>{recentPost.readingTime}</span>
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {recentPost.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {recentPost.description}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
            Read article
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </span>
        </Link>
      </section>
    </div>
  );
}
