import type { Metadata } from "next";
import Label from "../components/ui/Label";
import Shell from "../components/pages/Shell";
import { profile } from "../data";

export const metadata: Metadata = {
  title: "Contact | Pratim Dasude",
  description: "Get in touch with Pratim Dasude.",
};

const rowClass =
  "group flex items-baseline justify-between gap-6 border-b border-line py-6 transition-colors hover:text-accent";
const valueClass = "text-xl font-light tracking-tight sm:text-3xl";

export default function ContactPage() {
  return (
    <Shell>
      <header className="pb-14 pt-14 sm:pt-20">
        <Label index="07" accent>
          Contact
        </Label>
        <h1 className="font-display mt-8 text-[clamp(2.75rem,8.5vw,8rem)]">
          Let&apos;s build something <span className="font-emph">that sees</span>.
        </h1>
        <a
          href={`mailto:${profile.email}`}
          className="font-display group mt-14 block break-words border-y border-line py-8 text-[clamp(1.6rem,5.2vw,5rem)] transition-colors hover:text-accent sm:py-12"
        >
          {profile.email}
          <span aria-hidden className="ml-4 inline-block transition-transform group-hover:translate-x-2">
            &#8599;
          </span>
        </a>
        <p className="label mt-6">The fastest way to reach me is email.</p>
      </header>

      <section aria-label="Elsewhere" className="max-w-3xl">
        <a className={rowClass} href={profile.github.href} target="_blank" rel="noopener noreferrer">
          <span className="label">GitHub</span>
          <span className={valueClass}>
            {profile.github.label} <span aria-hidden>&#8599;</span>
          </span>
        </a>
        {profile.linkedin.href ? (
          <a className={rowClass} href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
            <span className="label">LinkedIn</span>
            <span className={valueClass}>
              {profile.linkedin.label} <span aria-hidden>&#8599;</span>
            </span>
          </a>
        ) : (
          <div className="flex items-baseline justify-between gap-6 border-b border-line py-6">
            <span className="label">LinkedIn</span>
            <span className={`${valueClass} text-muted`}>{profile.linkedin.label}</span>
          </div>
        )}
        <div className="flex items-baseline justify-between gap-6 border-b border-line py-6">
          <span className="label">Location</span>
          <span className={`${valueClass} text-muted`}>{profile.location}</span>
        </div>
      </section>
    </Shell>
  );
}
