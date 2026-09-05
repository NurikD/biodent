import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { clinic } from "@/config/clinic";

// satori не умеет тянуть файлы по пути — логотип встраиваем как data-URI.
// Картинка собирается на билде, поэтому чтение с диска здесь безопасно.
const logo = (() => {
  if (!clinic.logo?.light) return null;
  try {
    const file = join(process.cwd(), "public", clinic.logo.light);
    return `data:image/png;base64,${readFileSync(file).toString("base64")}`;
  } catch {
    return null;
  }
})();

export const alt = `${clinic.name} — ${clinic.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const heading = clinic.tagline;
const footer = `${clinic.phone}   ${clinic.address}`;

/**
 * Google отдаёт woff2 современным браузерам, а satori умеет только ttf/otf/woff —
 * отсюда старый User-Agent. `text=` возвращает подмножество ровно с нужными
 * глифами: и кириллица гарантированно на месте, и файл маленький.
 */
async function loadOnest(text: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=Onest:wght@${weight}&text=${encodeURIComponent(text)}`,
    { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64)" } },
  ).then((r) => r.text());

  const url = css.match(/src:\s*url\((.+?)\)/)?.[1];
  if (!url) throw new Error("Onest: не нашёл ссылку на файл шрифта");
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  let fonts;
  try {
    const [regular, semibold] = await Promise.all([
      loadOnest(footer, 400),
      loadOnest(clinic.name + heading, 600),
    ]);
    fonts = [
      { name: "Onest", data: regular, weight: 400 as const, style: "normal" as const },
      { name: "Onest", data: semibold, weight: 600 as const, style: "normal" as const },
    ];
  } catch {
    // Шрифт не скачался — рисуем дефолтным. Картинка хуже, но билд не падает.
    fonts = undefined;
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12403A",
          color: "#FFFFFF",
          fontFamily: "Onest",
          padding: 80,
        }}
      >
        {logo ? (
          <img
            src={logo}
            width={Math.round(68 * clinic.logo.ratio)}
            height={68}
            alt=""
          />
        ) : (
          <div style={{ fontSize: 40, fontWeight: 600 }}>{clinic.name}</div>
        )}

        <div
          style={{
            fontSize: 76,
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 900,
          }}
        >
          {heading}
        </div>

        <div style={{ display: "flex", gap: 32, fontSize: 28, color: "#E1F5EE" }}>
          <span>{clinic.phone}</span>
          <span>{clinic.address}</span>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
