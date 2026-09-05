"use client";

import { useState } from "react";
import { clinic, copy, waLink } from "@/config/clinic";

type State = "idle" | "sending" | "ok" | "error";

export function Booking() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();

    const next: Record<string, string> = {};
    if (!name) next.name = copy.booking.errorName;
    if (phone.replace(/\D/g, "").length < 9) next.phone = copy.booking.errorPhone;
    setErrors(next);
    if (Object.keys(next).length) return;

    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          service: fd.get("service"),
          comment: fd.get("comment"),
        }),
      });
      setState(res.ok ? "ok" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "ok") {
    return (
      <section id="booking" className="bg-brand-100">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-8 sm:py-28">
          <h2 className="text-3xl tracking-tight sm:text-4xl">{copy.booking.successTitle}</h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
            {copy.booking.successText}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="bg-brand-100">
      <div className="mx-auto grid max-w-5xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
        <div>
          <h2 className="text-3xl leading-tight tracking-tight sm:text-4xl">
            {copy.booking.title}
          </h2>
          <p className="mt-4 leading-relaxed text-muted">{copy.booking.lead}</p>
          <p className="mt-8 text-[15px] text-muted">
            {copy.booking.altPrefix}{" "}
            <a href={waLink} className="text-brand-700 underline underline-offset-4">
              {copy.booking.altWhatsapp}
            </a>{" "}
            {copy.booking.altPhone}{" "}
            <a href={`tel:+${clinic.phoneRaw}`} className="text-brand-700 underline underline-offset-4">
              {clinic.phone}
            </a>
          </p>
        </div>

        <form onSubmit={submit} noValidate className="space-y-5">
          <Field label={copy.booking.fieldName} error={errors.name}>
            <input
              name="name"
              autoComplete="name"
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3.5 outline-none focus:border-brand-600"
            />
          </Field>

          <Field label={copy.booking.fieldPhone} error={errors.phone}>
            <input
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder={clinic.phone}
              className="w-full rounded-xl border border-hairline bg-surface px-4 py-3.5 outline-none focus:border-brand-600"
            />
          </Field>

          <Field label={copy.booking.fieldService}>
            <select
              name="service"
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-hairline bg-surface px-4 py-3.5 outline-none focus:border-brand-600"
            >
              <option value="">{copy.booking.servicePlaceholder}</option>
              {clinic.services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
            </select>
          </Field>

          <Field label={copy.booking.fieldComment}>
            <textarea
              name="comment"
              rows={3}
              className="w-full resize-none rounded-xl border border-hairline bg-surface px-4 py-3.5 outline-none focus:border-brand-600"
            />
          </Field>

          <button
            type="submit"
            disabled={state === "sending"}
            className="w-full rounded-full bg-brand-900 px-6 py-4 text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {state === "sending" ? copy.booking.submitting : copy.booking.submit}
          </button>

          {state === "error" && (
            <p className="text-sm text-red-700">{copy.booking.errorSend}</p>
          )}

          <p className="text-xs leading-relaxed text-muted">{copy.booking.consent}</p>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-700">{error}</span>}
    </label>
  );
}
