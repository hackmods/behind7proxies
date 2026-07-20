import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPost, formatPostDate } from "@/lib/posts";

const post = getPost("ms-git-exposure")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.description,
  authors: [{ name: post.author }],
};

export default function MsGitExposurePage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
      <Link
        href="/blog"
        className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-3.5" aria-hidden />
        Back to Blog
      </Link>

      <header className="mb-12 animate-fade-up border-b border-border pb-10">
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base text-muted">
          By{" "}
          <span className="text-foreground">{post.author}</span>
        </p>
      </header>

      <div className="prose-article animate-fade-up-delay-1">
        <h2>Introduction</h2>
        <p>
          In late 2025, security researchers and defenders took note of a
          high-profile reminder: even mature organizations can accidentally
          leave source control artifacts reachable from the public internet.
          Reports around Microsoft-related Git exposure renewed attention on a
          class of misconfiguration that is old, well-understood, and still
          surprisingly common — a publicly accessible{" "}
          <code>.git</code> directory on a production web host.
        </p>
        <p>
          This write-up frames the incident in practical terms: what was
          exposed, why it matters, and how teams can detect, contain, and harden
          against the same failure mode. The sections below are structured as a
          working note for DevOps and open-source maintainers; treat the code
          samples as a starting template, not a one-click runbook for every
          environment.
        </p>

        <h2>The Vulnerability</h2>
        <p>
          A Git working tree stores repository metadata under{" "}
          <code>.git/</code>. When that directory (or its objects, refs, and
          packfiles) is served by the web server — for example because a static
          site root was pointed at a clone, or because access controls failed to
          deny <code>/.git/*</code> — an attacker can reconstruct source history
          without ever authenticating to the private remote.
        </p>
        <p>Typical signals include:</p>
        <ul>
          <li>
            HTTP <code>200</code> responses for paths like{" "}
            <code>/.git/HEAD</code>, <code>/.git/config</code>, or{" "}
            <code>/.git/logs/HEAD</code>
          </li>
          <li>
            Downloadable object stores under{" "}
            <code>/.git/objects/</code> and pack indexes under{" "}
            <code>/.git/objects/pack/</code>
          </li>
          <li>
            Leaked remotes, author emails, and historical secrets that were
            committed then &quot;removed&quot; in later commits but remain in
            history
          </li>
        </ul>
        <p>
          Once the object graph is retrieved, tools such as{" "}
          <code>git clone --mirror</code>-style reconstructions (or dedicated
          dump utilities) can rebuild a usable repository. The blast radius is
          not limited to current HEAD — deleted credentials, internal hostnames,
          and unpublished features may all still live in older commits.
        </p>

        <h2>The Code Fix</h2>
        <p>
          Mitigation has two tracks: <strong>stop the leak</strong> at the edge,
          and <strong>assume compromise of history</strong> if the directory was
          reachable. Below is a placeholder hardening + scrub sketch you can
          adapt for nginx, Apache, or your CDN — then follow with secret
          rotation and history rewriting where needed.
        </p>
        <pre>
          <code>{`#!/usr/bin/env bash
# Placeholder mitigation sketch — adapt to your stack.
# 1) Deny .git at the web edge
# 2) Confirm the path is gone
# 3) Rotate any secrets that may have lived in history
# 4) Optionally rewrite/scrub history on the canonical remote

set -euo pipefail

# --- Edge deny (nginx example fragment) ---
# location ~ /\\.git {
#   deny all;
#   return 404;
# }

SITE_URL="\${SITE_URL:-https://example.com}"

echo "[*] Checking for exposed .git/HEAD..."
status="$(curl -s -o /dev/null -w "%{http_code}" "\${SITE_URL}/.git/HEAD" || true)"
if [[ "\$status" == "200" ]]; then
  echo "[!] .git appears reachable (HTTP \$status). Block at the reverse proxy ASAP."
  exit 1
fi
echo "[+] .git/HEAD not publicly readable (HTTP \$status)."

# --- Local clone hygiene (run only on a throwaway clone) ---
# git filter-repo --invert-paths --path path/to/leaked-secret.env
# # or BFG: java -jar bfg.jar --delete-files '*.pem'
# git push --force --all origin
# git push --force --tags origin

echo "[*] Rotate API keys, tokens, and credentials that ever appeared in history."
echo "[*] Audit CI/CD and hosting configs so deploy artifacts never include .git."
`}</code>
        </pre>
        <p>
          After edge rules are live, verify with an external checker (or a
          simple curl from outside your VPN). If reconstruction was possible,
          treat historical secrets as burned: rotate tokens, invalidate keys,
          and document the incident for your security process. History rewriting
          is disruptive — coordinate with every fork and clone before force
          pushing.
        </p>

        <h2>Takeaways</h2>
        <ul>
          <li>
            Deploy artifacts should never include a{" "}
            <code>.git</code> directory; build from clean exports or shallow
            clones that are discarded after the build.
          </li>
          <li>
            Default-deny sensitive paths at the reverse proxy and CDN, not only
            in application code.
          </li>
          <li>
            &quot;We deleted the file in a later commit&quot; is not remediation —
            Git history remembers.
          </li>
          <li>
            Continuous scanning for exposed{" "}
            <code>.git</code>, backup files, and env dumps belongs in the same
            bucket as dependency and secret scanning.
          </li>
          <li>
            For the open-source community: public demos and static hosts are
            frequent foot-guns — add a pre-deploy checklist and fail the
            pipeline if <code>.git</code> is present in the publish directory.
          </li>
        </ul>
        <p>
          Exposure incidents will keep recurring as long as Git metadata and web
          roots share a filesystem. The fix is boring by design: deny the path,
          assume history leaked, rotate, and automate the check so the next
          deploy cannot quietly reopen the door.
        </p>
      </div>
    </article>
  );
}
