import { clinic, copy, waLink } from "@/config/clinic";

export function Hero() {
  const hasMedia = Boolean(clinic.heroVideo || clinic.heroPoster);

  return (
    <section
      id="top"
      className={`relative isolate overflow-hidden bg-brand-900 text-white ${
        clinic.heroPoster ? "bg-cover bg-center" : ""
      }`}
      style={clinic.heroPoster ? { backgroundImage: `url(${clinic.heroPoster})` } : undefined}
    >
      {/*
        Отрицательный z-index внутри isolate: видео ложится поверх зелёного фона
        секции, но под текст. Постер — фоном самой секции, поэтому виден и пока
        видео грузится, и когда оно скрыто из-за prefers-reduced-motion.
      */}
      {clinic.heroVideo && (
        <video
          className="hero-video absolute inset-0 -z-10 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={clinic.heroPoster || undefined}
          aria-hidden="true"
        >
          <source src={clinic.heroVideo} type="video/mp4" />
        </video>
      )}

      {hasMedia && <div className="absolute inset-0 -z-10 bg-brand-900/75" />}

      <div className="mx-auto max-w-5xl px-5 pb-14 pt-16 sm:px-8 sm:pb-0 sm:pt-24">
        <p className="text-sm text-brand-100">{clinic.tagline}</p>
        <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] tracking-tight sm:text-6xl">
          {clinic.heroTitle}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-100 sm:text-lg">
          {clinic.heroSubtitle}
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#booking"
            className="rounded-full bg-white px-7 py-3.5 text-center text-base text-brand-900 hover:bg-brand-100"
          >
            {copy.hero.ctaPrimary}
          </a>
          <a
            href={waLink}
            className="rounded-full border border-white/25 px-7 py-3.5 text-center text-base hover:bg-white/10"
          >
            {copy.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/*
        На мобильном непрозрачный фон перекрывает видео, и цифры читаются как
        часть страницы, а не баннера — иначе ролик занимает почти весь экран.
        От `sm` фон прозрачный и блок снова часть тёмного hero.
      */}
      <div className="relative bg-canvas text-ink sm:bg-transparent sm:text-white">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:pb-24 sm:pt-16">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 sm:border-t sm:border-white/15 sm:pt-10">
            {clinic.heroStats.map((s) => (
              <div key={s.label}>
                <dt className="text-xl tracking-tight sm:text-2xl">{s.value}</dt>
                <dd className="mt-1 text-sm text-muted sm:text-brand-100">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
