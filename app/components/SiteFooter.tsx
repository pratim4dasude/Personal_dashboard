import Link from "next/link";
import { navLinks, profile } from "../data";

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-stone-400 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
        </p>
        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
          <a className="transition hover:text-white" href={profile.github.href} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
