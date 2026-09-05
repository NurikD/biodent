import { NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const clean = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30);
  const service = clean(body.service, 100);
  const comment = clean(body.comment, 1000);

  if (!name || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "name and phone required" }, { status: 400 });
  }

  const text = [
    "Новая заявка с сайта",
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Услуга: ${service || "не выбрана"}`,
    comment ? `Комментарий: ${comment}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  // Без токена заявка просто пишется в лог — удобно, пока бот не создан.
  if (!TOKEN || !CHAT_ID) {
    console.log(text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text }),
  });

  if (!res.ok) {
    console.error("telegram failed", await res.text());
    return NextResponse.json({ error: "delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
