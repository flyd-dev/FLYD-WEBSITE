import { NextRequest, NextResponse } from 'next/server';
import { CONTACT_TOPICS } from '@/lib/contact-topics';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Nok til skjemaet (melding inntil 5 000 tegn), ikke til å fylle funksjonen.
const MAX_BODY_BYTES = 32 * 1024;
const UPSTREAM_TIMEOUT_MS = 8_000;

const MAX_NAME = 120;
const MAX_BEDRIFT = 160;
const MAX_EMAIL = 254;
const MAX_PHONE = 40;
const MAX_SUBJECT = 80;
const MAX_MESSAGE = 5_000;
const MAX_CLICK_ID = 200;

// Per funksjonsinstans. Vercel kjører flere instanser som ikke deler minne,
// så grensen stopper bare gjentakelser som treffer samme instans. Den er ikke
// et delt vern. Ved reelt misbruk er Vercel Firewall (rate limit) riktig sted,
// uten nytt lager i denne appen.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

const ALLOWED_KEYS = [
  'name',
  'bedrift',
  'email',
  'phone',
  'subject',
  'message',
  'company',
  'gclid',
  'gbraid',
  'wbraid',
] as const;

type FieldKey = (typeof ALLOWED_KEYS)[number];
type Fields = Record<FieldKey, string>;

const TOPIC_SET = new Set<string>(CONTACT_TOPICS);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const GENERIC_ERROR = 'Noe gikk galt. Prøv igjen senere.';
const FIELD_ERROR = 'Skjemaet kunne ikke sendes. Sjekk feltene og prøv igjen.';

function json(body: { ok: true } | { ok: false; error: string }, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  const ip = first || request.ip || request.headers.get('x-real-ip')?.trim() || 'ukjent';
  return ip.slice(0, 80);
}

function withinRateLimit(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 2_000) {
    for (const [entryKey, times] of hits) {
      const live = times.filter((ts) => now - ts < WINDOW_MS);
      if (live.length === 0) hits.delete(entryKey);
      else hits.set(entryKey, live);
    }
  }
  return true;
}

async function readLimitedText(
  request: NextRequest,
): Promise<string | 'too-large' | 'unreadable'> {
  const declared = request.headers.get('content-length');
  if (declared !== null) {
    if (!/^\d+$/.test(declared) || Number(declared) > MAX_BODY_BYTES) return 'too-large';
  }
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      total += value.byteLength;
      if (total > MAX_BODY_BYTES) {
        await reader.cancel();
        return 'too-large';
      }
      chunks.push(value);
    }
  } catch {
    return 'unreadable';
  }

  const buf = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    buf.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return new TextDecoder('utf-8', { fatal: true }).decode(buf);
  } catch {
    return 'unreadable';
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function readFields(data: unknown): { ok: true; fields: Fields; honeypot: boolean } | { ok: false } {
  if (!isRecord(data)) return { ok: false };

  const companyRaw = data.company;
  if (companyRaw !== undefined && typeof companyRaw !== 'string') return { ok: false };
  if (typeof companyRaw === 'string' && companyRaw.trim().length > 0) {
    return { ok: true, fields: emptyFields(), honeypot: true };
  }

  for (const key of Object.keys(data)) {
    if (!ALLOWED_KEYS.includes(key as FieldKey)) return { ok: false };
  }

  const fields = emptyFields();
  for (const key of ALLOWED_KEYS) {
    const value = data[key];
    if (value === undefined) continue;
    if (typeof value !== 'string') return { ok: false };
    fields[key] = value.trim();
  }

  if (fields.name.length < 1 || fields.name.length > MAX_NAME) return { ok: false };
  if (fields.bedrift.length > MAX_BEDRIFT) return { ok: false };
  if (
    fields.email.length < 3 ||
    fields.email.length > MAX_EMAIL ||
    !EMAIL_RE.test(fields.email)
  ) {
    return { ok: false };
  }
  if (fields.phone.length > MAX_PHONE) return { ok: false };
  if (fields.subject.length > MAX_SUBJECT) return { ok: false };
  if (fields.subject !== '' && !TOPIC_SET.has(fields.subject)) return { ok: false };
  if (fields.message.length < 1 || fields.message.length > MAX_MESSAGE) return { ok: false };
  if (
    fields.gclid.length > MAX_CLICK_ID ||
    fields.gbraid.length > MAX_CLICK_ID ||
    fields.wbraid.length > MAX_CLICK_ID
  ) {
    return { ok: false };
  }

  fields.company = '';
  return { ok: true, fields, honeypot: false };
}

function emptyFields(): Fields {
  return {
    name: '',
    bedrift: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    company: '',
    gclid: '',
    gbraid: '',
    wbraid: '',
  };
}

export async function POST(request: NextRequest) {
  if (!withinRateLimit(clientKey(request))) {
    return json({ ok: false, error: 'For mange forsøk. Prøv igjen senere.' }, 429);
  }

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return json({ ok: false, error: FIELD_ERROR }, 415);
  }

  const raw = await readLimitedText(request);
  if (raw === 'too-large') {
    return json({ ok: false, error: 'Forespørselen er for stor.' }, 413);
  }
  if (raw === 'unreadable') {
    return json({ ok: false, error: FIELD_ERROR }, 400);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return json({ ok: false, error: FIELD_ERROR }, 400);
  }

  const fields = readFields(parsed);
  if (!fields.ok) return json({ ok: false, error: FIELD_ERROR }, 400);
  // Samme svar som et ekte skjema, uten videresending. Innholdet logges ikke.
  if (fields.honeypot) return json({ ok: true });

  // Klamme-oppslag, så adressen ikke bakes inn ved bygg. Den leses ved kjøring.
  const webhookUrl = process.env['KONTAKT_WEBHOOK_URL']?.trim();
  if (!webhookUrl) {
    console.error('kontakt: videresending er ikke konfigurert');
    return json({ ok: false, error: GENERIC_ERROR }, 503);
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(fields.fields),
      redirect: 'manual',
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
    await upstream.body?.cancel().catch(() => undefined);
    if (!upstream.ok || (upstream.status >= 300 && upstream.status < 400)) {
      console.error('kontakt: videresending feilet');
      return json({ ok: false, error: GENERIC_ERROR }, 502);
    }
  } catch {
    // Feilobjektet kan inneholde adressen. Logg bare en fast setning.
    console.error('kontakt: videresending feilet');
    return json({ ok: false, error: GENERIC_ERROR }, 502);
  }

  return json({ ok: true });
}
