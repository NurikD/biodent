import type { Metadata, Viewport } from "next";
import { Onest } from "next/font/google";
import { clinic } from "@/config/clinic";
import "./globals.css";

const onest = Onest({
  subsets: ["cyrillic", "latin"],
  variable: "--font-onest",
  display: "swap",
});

const title = `${clinic.name} — ${clinic.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(clinic.site),
  title,
  description: clinic.heroSubtitle,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: clinic.name,
    title,
    description: clinic.heroSubtitle,
  },
  // Safari сам делает ссылками телефоны и адреса и ломает этим вёрстку.
  formatDetection: { telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#12403a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={onest.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
