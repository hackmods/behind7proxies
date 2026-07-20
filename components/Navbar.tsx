"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog/Docs" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4 sm:px-8"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="font-mono text-sm font-medium tracking-tight text-accent transition-opacity hover:opacity-80"
          onClick={() => setOpen(false)}
        >
          behind7proxies
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`relative text-sm transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100 ${
                  isActive(link.href)
                    ? "text-foreground after:scale-x-100"
                    : "text-muted"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/hackmods"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-muted transition-colors hover:text-foreground md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-border/60 bg-background/95 px-5 py-4 md:hidden"
        >
          <ul className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block py-2 text-base ${
                    isActive(link.href) ? "text-accent" : "text-muted"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="https://github.com/hackmods"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 py-2 text-base text-muted"
                onClick={() => setOpen(false)}
              >
                <GithubIcon className="size-4" />
                GitHub
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
