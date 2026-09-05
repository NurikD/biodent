import Image from "next/image";
import { clinic } from "@/config/clinic";

// Высота отрисовки: 28px на мобилке, 36px от sm. Файл отдаём втрое крупнее,
// чтобы на ретине не мылился мелкий подзаголовок «PLUS».
const INTRINSIC_HEIGHT = 108;

export function Logo({
  variant,
  priority = false,
  className = "",
}: {
  variant: "light" | "dark";
  priority?: boolean;
  className?: string;
}) {
  const src = clinic.logo?.[variant];

  // Шаблон поедет к другим клиникам, у половины логотипа не будет.
  if (!src) {
    return <span className="text-lg tracking-tight">{clinic.name}</span>;
  }

  return (
    <Image
      src={src}
      alt={clinic.name}
      width={Math.round(INTRINSIC_HEIGHT * clinic.logo.ratio)}
      height={INTRINSIC_HEIGHT}
      priority={priority}
      className={`h-7 w-auto sm:h-9 ${className}`}
    />
  );
}
