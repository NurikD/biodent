import { copy, waLink } from "@/config/clinic";

export function WhatsAppFab() {
  return (
    <a
      href={waLink}
      aria-label={copy.fab.aria}
      className="fixed bottom-5 right-5 z-40 rounded-full bg-brand-600 px-5 py-3.5 text-sm text-white shadow-lg sm:hidden"
    >
      {copy.fab.label}
    </a>
  );
}
