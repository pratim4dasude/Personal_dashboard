"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Primary navigation. Keep in sync with sitemap via app/data.ts navLinks.
const links = [
  { n: "01", label: "About", href: "/about" },
  { n: "02", label: "Experience", href: "/experience" },
  { n: "03", label: "Projects", href: "/projects" },
  { n: "04", label: "Publications", href: "/publications" },
  { n: "05", label: "Open Source", href: "/open-source" },
  { n: "06", label: "Skills", href: "/skills" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link href="/" className="font-mono text-sm uppercase tracking-[0.18em] text-fg" onClick={() => setOpen(false)}>
          Pratim<span className="text-accent">/</span>Dasude
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`font-mono text-[11px] uppercase tracking-[0.18em] transition ${
                isActive(l.href) ? "text-accent" : "text-muted hover:text-fg"
              }`}
            >
              <span className="mr-2 opacity-60">{l.n}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden border border-line-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg transition hover:border-accent hover:text-accent sm:inline-block"
          >
            Get in touch &#8599;
          </Link>
          <button
            type="button"
            className="border border-line-strong px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-bg px-6 py-4 lg:hidden">
          <ul className="space-y-1">
            {[...links, { n: "07", label: "Contact", href: "/contact" }].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-baseline gap-4 border-b border-line py-3 ${
                    isActive(l.href) ? "text-accent" : "text-fg"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{l.n}</span>
                  <span className="text-2xl font-light tracking-tight">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
