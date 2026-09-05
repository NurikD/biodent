import { clinic } from "@/config/clinic";
import { Icon } from "./Icon";

/**
 * Адрес, режим и телефон над шапкой. Не sticky: два закреплённых яруса
 * съедали бы 116px из 844 на мобильном экране. Уезжает при скролле,
 * закреплённой остаётся только шапка.
 */
export function TopBar() {
  return (
    <div className="border-b border-hairline bg-canvas">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-2.5 text-[13px] sm:px-8">
        <div className="flex min-w-0 items-center gap-4 text-muted sm:gap-6">
          <span className="flex min-w-0 items-center gap-1.5">
            <Icon name="pin" className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{clinic.address}</span>
          </span>
          <span className="hidden shrink-0 items-center gap-1.5 sm:flex">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {clinic.hours}
          </span>
        </div>

        <a
          href={`tel:+${clinic.phoneRaw}`}
          className="flex shrink-0 items-center gap-1.5 hover:text-brand-700"
        >
          <Icon name="phone" className="h-3.5 w-3.5 text-brand-700" />
          {clinic.phone}
        </a>
      </div>
    </div>
  );
}
