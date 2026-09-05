import { clinic, copy } from "@/config/clinic";
import { Section } from "./Section";

export function Faq() {
  return (
    <Section id="faq" title={copy.faq.title}>
      <div className="divide-y divide-hairline border-y border-hairline">
        {clinic.faq.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg tracking-tight">
              {f.q}
              <span className="shrink-0 text-muted transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
