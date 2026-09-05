"use client";

import { useState } from "react";
import { clinic, copy, waLink } from "@/config/clinic";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/90 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-5xl items-center justify-between px-5 sm:px-8">
        {/* Шапка светлая (bg-canvas), поэтому здесь тёмный вариант логотипа. */}
        <a href="#top" className="flex items-center" aria-label={clinic.name}>
          <Logo variant="dark" priority />
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {copy.nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={waLink}
            className="hidden rounded-full bg-brand-900 px-5 py-2.5 text-sm text-white hover:bg-brand-700 sm:inline-block"
          >
            {copy.header.cta}
          </a>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? copy.header.menuClose : copy.header.menuOpen}
            aria-expanded={open}
            className="p-2 md:hidden"
          >
            <span className="block h-px w-6 bg-ink" />
            <span className="mt-1.5 block h-px w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-hairline px-5 py-4 md:hidden">
          {copy.nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-base"
            >
              {n.label}
            </a>
          ))}
          <a href={waLink} className="mt-2 block py-3 text-base text-brand-700">
            {copy.header.ctaMobile}
          </a>
        </nav>
      )}
    </header>
  );
}
