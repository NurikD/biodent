import { clinic, copy, yearsWord } from "@/config/clinic";
import { Section } from "./Section";

export function Doctors() {
  return (
    <Section id="doctors" title={copy.doctors.title} lead={copy.doctors.lead}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {clinic.doctors.map((d, i) => (
          <div key={i}>
            <div className="aspect-[4/5] w-full rounded-xl bg-hairline" />
            <h3 className="mt-4 text-lg tracking-tight">{d.name}</h3>
            <p className="mt-1 text-[15px] text-muted">{d.role}</p>
            <p className="mt-2 text-sm text-brand-700">
              {copy.doctors.experience} {d.years} {yearsWord(d.years)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
