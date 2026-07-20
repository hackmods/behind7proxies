export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  author: string;
};

export const posts: Post[] = [
  {
    slug: "ms-git-exposure",
    title: "Securing the Source: A Code Fix for Microsoft's Git Exposure",
    description:
      "How an exposed .git directory can leak source history — and a practical mitigation and history-scrubbing approach for DevOps teams.",
    date: "2025-11-12",
    readingTime: "8 min read",
    author: "Ryan Morris",
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
