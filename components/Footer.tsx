import GithubIcon from "@/components/GithubIcon";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-10 sm:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <p className="font-mono text-sm text-accent">behind7proxies</p>
          <p className="text-sm text-muted">
            Dad. Geek. Programmer. Cyclist. · Ontario, Canada
          </p>
          <p className="text-xs text-muted/70">
            © {year} Ryan Morris. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/hackmods"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            aria-label="GitHub profile"
          >
            <GithubIcon className="size-4" />
            @hackmods
          </a>
        </div>
      </div>
    </footer>
  );
}
