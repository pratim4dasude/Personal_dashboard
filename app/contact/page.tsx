import type { Metadata } from "next";
import { Card } from "../components/Card";
import PageHeader from "../components/PageHeader";
import { profile } from "../data";

export const metadata: Metadata = {
  title: "Contact | Pratim Dasude",
  description: "Get in touch with Pratim Dasude.",
};

const link = "text-emerald-100 transition hover:text-white";

export default function ContactPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-8">
      <PageHeader label="Contact" title="Let&apos;s talk" intro="The fastest way to reach me is email." />
      <Card>
        <ul className="space-y-4 text-lg">
          <li>
            <a className={link} href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </li>
          <li>
            <a className={link} href={profile.github.href} target="_blank" rel="noopener noreferrer">
              {profile.github.label}
            </a>
          </li>
          <li>
            {profile.linkedin.href ? (
              <a className={link} href={profile.linkedin.href} target="_blank" rel="noopener noreferrer">
                {profile.linkedin.label}
              </a>
            ) : (
              <span className="text-stone-300">{profile.linkedin.label}</span>
            )}
          </li>
        </ul>
      </Card>
    </main>
  );
}
