export function Section({
  id,
  title,
  lead,
  children,
  dark = false,
}: {
  id?: string;
  title?: string;
  lead?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={dark ? "bg-brand-900 text-white" : ""}
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
        {title && (
          <div className="mb-10 max-w-2xl sm:mb-14">
            <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl">{title}</h2>
            {lead && (
              <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-brand-100" : "text-muted"}`}>
                {lead}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
