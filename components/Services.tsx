"use client";

import { useEffect, useRef, useState } from "react";
import { clinic, copy, waLink, type Service } from "@/config/clinic";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Services() {
  const [active, setActive] = useState<Service | null>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("keydown", onKey);

    const scroll = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = scroll;
      trigger.current?.focus();
    };
  }, [active]);

  return (
    <Section id="services" title={copy.services.title} lead={copy.services.lead}>
      <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2">
        {clinic.services.map((s) => (
          <button
            key={s.slug}
            onClick={(e) => {
              trigger.current = e.currentTarget;
              setActive(s);
            }}
            className="group bg-surface p-7 text-left hover:bg-brand-100/50 sm:p-8"
          >
            <Icon name={s.icon} className="mb-4 h-7 w-7 text-brand-700" />
            <h3 className="text-lg tracking-tight">{s.title}</h3>
            <p className="mt-2 text-[15px] text-muted">{s.short}</p>
            {clinic.showPrices && s.price && (
              <p className="mt-3 text-[15px] text-brand-700">{s.price}</p>
            )}
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
          onClick={() => setActive(null)}
        >
          <div
            ref={dialog}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="w-full max-w-lg rounded-t-2xl bg-surface p-7 outline-none sm:rounded-2xl sm:p-9"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl tracking-tight">{active.title}</h3>
              <button
                onClick={() => setActive(null)}
                aria-label={copy.services.close}
                className="-mr-1 -mt-1 p-2 text-muted hover:text-ink"
              >
                ✕
              </button>
            </div>
            <p className="mt-4 leading-relaxed text-muted">{active.full}</p>
            <a
              href={waLink}
              className="mt-7 block rounded-full bg-brand-900 px-6 py-3.5 text-center text-white hover:bg-brand-700"
            >
              {copy.services.modalCta}
            </a>
          </div>
        </div>
      )}
    </Section>
  );
}
