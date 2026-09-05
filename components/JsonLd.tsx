import { clinic, waLink } from "@/config/clinic";

/**
 * Schema.org для поиска и карточки организации.
 * Врачей сюда не отдаём, пока в конфиге заглушки «Имя Фамилия».
 */
export function JsonLd() {
  const id = `${clinic.site}/#clinic`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Dentist",
        "@id": id,
        name: clinic.name,
        description: clinic.heroSubtitle,
        url: clinic.site,
        telephone: `+${clinic.phoneRaw}`,
        ...(clinic.email ? { email: clinic.email } : {}),
        ...(clinic.photo ? { image: `${clinic.site}${clinic.photo}` } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: clinic.address,
          addressLocality: clinic.city,
          addressCountry: clinic.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: clinic.geo.lat,
          longitude: clinic.geo.lng,
        },
        openingHours: clinic.openingHours,
        sameAs: [clinic.instagram, clinic.map2gis, waLink],
        availableService: clinic.services.map((s) => ({
          "@type": "MedicalProcedure",
          name: s.title,
          description: s.short,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${clinic.site}/#faq`,
        mainEntity: clinic.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
