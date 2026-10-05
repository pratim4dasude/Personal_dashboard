import Link from "next/link";
import { profile } from "../data";

export default function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-16 lg:px-10">
        <p className="label">Next step</p>
        <Link
          href="/contact"
          className="group mt-4 block font-display text-[clamp(2.5rem,8vw,7rem)] text-fg transition hover:text-accent"
        >
          Let&apos;s build something <span className="font-emph">that sees.</span>
          <span className="ml-3 inline-block transition group-hover:translate-x-2">&#8599;</span>
        </Link>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {profile.name} &middot; {profile.location}
          </p>
          <div className="flex gap-6">
            <a className="transition hover:text-accent" href={`mailto:${profile.email}`}>
              Email
            </a>
            <a className="transition hover:text-accent" href={profile.github.href} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {profile.linkedin.href && (
              <a className="transition hover:text-accent" href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
