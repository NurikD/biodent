import { clinic, waLink } from "@/config/clinic";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Logo variant="light" />
          <p className="mt-3 text-sm text-brand-100">{clinic.address}</p>
        </div>
        <div className="flex gap-6 text-sm text-brand-100">
          <a href={waLink} className="hover:text-white">WhatsApp</a>
          <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Instagram
          </a>
          <a href={clinic.map2gis} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            2ГИС
          </a>
        </div>
      </div>
    </footer>
  );
}
