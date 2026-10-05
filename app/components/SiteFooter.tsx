import Link from "next/link";
import { profile } from "../data";

const linkClass = "transition-colors hover:text-accent";

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-4 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>
          &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.location}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link className={linkClass} href="/contact">
            Contact
          </Link>
          <a className={linkClass} href={`mailto:${profile.email}`}>
            Email
          </a>
          <a className={linkClass} href={profile.github.href} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {profile.linkedin.href && (
            <a className={linkClass} href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          )}
        </nav>
      </div>
    </footer>
  );
}
