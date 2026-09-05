import { clinic, copy } from "@/config/clinic";
import { Section } from "./Section";

export function Reviews() {
  if (!clinic.reviews.length) return null;

  return (
    <Section id="reviews" title={copy.reviews.title}>
      <div className="grid gap-6 sm:grid-cols-2">
        {clinic.reviews.map((r, i) => (
          <figure key={i} className="rounded-2xl bg-surface p-7 sm:p-8">
            <blockquote className="leading-relaxed">{r.text}</blockquote>
            <figcaption className="mt-5 text-sm text-muted">
              {r.author} · {r.source}
            </figcaption>
          </figure>
        ))}
      </div>
      <a
        href={clinic.reviews2gis}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-block text-[15px] text-brand-700 underline underline-offset-4"
      >
        {copy.reviews.cta}
      </a>
    </Section>
  );
}
