import type { ReactNode } from "react";

// Силуэт зуба — основа половины иконок, поэтому вынесен отдельно.
// Занимает почти всю ширину 24×24: в узком варианте на 24px превращался в кашу.
const TOOTH =
  "M12 3.2c-4 0-7 2.3-7 5.8 0 2 .8 3.5 1.3 5.3.5 1.8.6 3.9.9 5.3.2 1.2 1.2 1.7 2 1.3.8-.4 1-1.4 1.2-2.6.2-1.3.5-2.5 1.6-2.5s1.4 1.2 1.6 2.5c.2 1.2.4 2.2 1.2 2.6.8.4 1.8-.1 2-1.3.3-1.4.4-3.5.9-5.3.5-1.8 1.3-3.3 1.3-5.3 0-3.5-3-5.8-7-5.8z";

const icons: Record<string, ReactNode> = {
  // Преимущества
  shield: (
    <>
      <path d="M12 3l7 3v5.4c0 4.1-2.9 7.5-7 8.6-4.1-1.1-7-4.5-7-8.6V6l7-3z" />
      <path d="M9.2 11.8l2 2 3.6-3.6" />
    </>
  ),
  zoom: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.3 15.3L20 20" />
    </>
  ),
  scan: (
    <>
      <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5" />
      <path d="M15.5 4H18a2 2 0 0 1 2 2v2.5" />
      <path d="M20 15.5V18a2 2 0 0 1-2 2h-2.5" />
      <path d="M8.5 20H6a2 2 0 0 1-2-2v-2.5" />
      <path d="M4.5 12h15" />
    </>
  ),
  pulse: <path d="M3 12h3.8l2.4-6.2 4 12.4 2.4-6.2H21" />,

  // Контактная полоса
  phone: (
    <path d="M6.5 3.5h3.2l1.6 4-2.1 1.5a12.5 12.5 0 0 0 5.8 5.8l1.5-2.1 4 1.6v3.2a1.9 1.9 0 0 1-2.1 1.9C11.8 18.8 5.2 12.2 4.6 5.6A1.9 1.9 0 0 1 6.5 3.5z" />
  ),
  pin: (
    <>
      <path d="M12 21s7-5.4 7-11.2A7 7 0 0 0 5 9.8C5 15.6 12 21 12 21z" />
      <circle cx="12" cy="9.8" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 1.9" />
    </>
  ),

  // Услуги
  tooth: <path d={TOOTH} />,
  implant: (
    <>
      <path d="M6.4 3.8h11.2l-1.3 5.7c-.2 1-1.1 1.8-2.2 1.8H9.9c-1.1 0-2-.8-2.2-1.8L6.4 3.8z" />
      <path d="M12 11.3v9.2" />
      <path d="M9.3 14.2h5.4M9.3 17.3h5.4" />
    </>
  ),
  // Коронка — тот же зуб плюс поясок сверху, иначе читалась просто как арка.
  crown: (
    <>
      <path d={TOOTH} />
      <path d="M6 9.6h12" />
    </>
  ),
  // Зубная дуга, а не брекеты: три скобы на дуге в 28px слипались в пятно.
  braces: (
    <>
      <path d="M4 7.4c0 6.3 3.6 10.6 8 10.6s8-4.3 8-10.6" />
      <path d="M7.9 7.4c0 4.2 1.8 6.9 4.1 6.9s4.1-2.7 4.1-6.9" />
      <path d="M4 7.4h3.9M16.1 7.4H20" />
    </>
  ),
  extract: (
    <>
      <g transform="translate(-2 2.6) scale(0.74)">
        <path d={TOOTH} vectorEffect="non-scaling-stroke" />
      </g>
      <path d="M18.6 9.2V3.4" />
      <path d="M16.5 5.5l2.1-2.1 2.1 2.1" />
    </>
  ),
  kids: (
    <>
      <g transform="translate(-2.2 2.4) scale(0.76)">
        <path d={TOOTH} vectorEffect="non-scaling-stroke" />
      </g>
      <path d="M18 8.8c-3.6-2.6-4.4-4.3-3.2-5.5 1-1 2.4-.5 3.2.7.8-1.2 2.2-1.7 3.2-.7 1.2 1.2.4 2.9-3.2 5.5z" />
    </>
  ),
  brush: (
    <>
      <path d="M3 15h9" />
      <path d="M12 13.4h5.6a1.6 1.6 0 0 1 0 3.2H12z" />
      <path d="M13.4 13.4V10.8M15.6 13.4V10.8M17.8 13.4V10.8" />
    </>
  ),
  moon: <path d="M20 14.4A8.4 8.4 0 1 1 9.6 4a6.6 6.6 0 0 0 10.4 10.4z" />,
};

export function Icon({ name, className }: { name?: string; className?: string }) {
  const shape = name ? icons[name] : undefined;
  if (!shape) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {shape}
    </svg>
  );
}
