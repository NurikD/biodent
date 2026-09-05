import { clinic, copy } from "@/config/clinic";
import { Icon } from "./Icon";
import { Section } from "./Section";

export function Advantages() {
  return (
    <Section id="about" title={copy.advantages.title}>
      <div className="grid gap-px overflow-hidden rounded-2xl bg-hairline sm:grid-cols-2">
        {clinic.advantages.map((a) => (
          <div key={a.title} className="bg-surface p-7 sm:p-9">
            <Icon name={a.icon} className="mb-4 h-7 w-7 text-brand-700" />
            <h3 className="text-lg tracking-tight">{a.title}</h3>
            <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{a.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
