import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { posts, formatPostDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog / Docs",
  description:
    "Technical write-ups by Ryan Morris on security, DevOps, and open source.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
      <header className="mb-12 max-w-2xl animate-fade-up">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Blog / Docs
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Technical write-ups, incident notes, and practical fixes from the
          trenches.
        </p>
      </header>

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.slug} className="animate-fade-up-delay-1">
            <Link
              href={`/blog/${post.slug}`}
              className="group block rounded-xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
                <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                {post.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-sm text-accent">
                Read article
                <ArrowRight
                  className="size-3.5 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
