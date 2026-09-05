import { clinic, copy, waLink } from "@/config/clinic";
import { Section } from "./Section";

export function Contacts() {
  return (
    <Section id="contacts" title={copy.contacts.title}>
      <dl className="grid gap-8 sm:grid-cols-2">
        <Row label={copy.contacts.phone}>
          <a href={`tel:+${clinic.phoneRaw}`} className="hover:text-brand-700">
            {clinic.phone}
          </a>
        </Row>
        <Row label={copy.contacts.whatsapp}>
          <a href={waLink} className="hover:text-brand-700">
            {copy.contacts.whatsappValue}
          </a>
        </Row>
        <Row label={copy.contacts.address}>
          {clinic.address}
          {clinic.landmark && (
            <span className="mt-1 block text-[15px] text-muted">{clinic.landmark}</span>
          )}
        </Row>
        <Row label={copy.contacts.hours}>{clinic.hours}</Row>
        {clinic.email && (
          <Row label={copy.contacts.email}>
            <a href={`mailto:${clinic.email}`} className="hover:text-brand-700">
              {clinic.email}
            </a>
          </Row>
        )}
        <Row label={copy.contacts.map}>
          <a
            href={clinic.map2gis}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-700"
          >
            {copy.contacts.mapValue}
          </a>
        </Row>
      </dl>
    </Section>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-hairline pt-4">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1.5 text-lg tracking-tight">{children}</dd>
    </div>
  );
}
