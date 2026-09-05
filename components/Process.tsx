import { clinic, copy } from "@/config/clinic";
import { Section } from "./Section";

export function Process() {
  return (
    <Section id="process" dark title={copy.process.title} lead={copy.process.lead}>
      {/*
        Номер и линия в одной строке: цифра становится якорем последовательности,
        а линии выстраиваются в общий ряд и читаются как шкала шагов.
      */}
      <ol className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {clinic.process.map((p, i) => (
          <li key={p.title}>
            <div className="flex items-center gap-4">
              <span className="text-3xl leading-none tracking-tight text-brand-600">
                {i + 1}
              </span>
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <h3 className="mt-6 text-lg tracking-tight">{p.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-brand-100">{p.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
