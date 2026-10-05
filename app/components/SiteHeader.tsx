"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, profile } from "../data";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#091310]/75 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="font-mono text-sm uppercase tracking-[0.25em] text-emerald-200">
          {profile.name}
        </Link>

        <button
          type="button"
          className="rounded-full border border-white/10 px-4 py-2 text-sm text-stone-200 md:hidden"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-2 border-b border-white/10 bg-[#091310] px-6 py-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm transition ${
                isActive(link.href)
                  ? "bg-emerald-300/15 text-emerald-100"
                  : "text-stone-300 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
