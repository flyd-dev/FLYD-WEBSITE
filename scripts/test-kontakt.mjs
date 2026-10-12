/**
 * Manuell sjekk av /api/kontakt mot en lokal mock.
 * Krever ferdig produksjonsbygg: npm run build && node scripts/test-kontakt.mjs
 *
 * Skriver statuskoder og om mocken ble truffet. Skriver ikke skjemaverdier
 * eller webhook-adressen.
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { existsSync } from 'node:fs';

const NEXT_PORT = Number(process.env.KONTAKT_TEST_PORT || 3456);
const MOCK_PORT = Number(process.env.KONTAKT_MOCK_PORT || 3457);
const NEXT_ORIGIN = `http://127.0.0.1:${NEXT_PORT}`;

const FORWARDED_KEYS = [
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
];

function validPayload(overrides = {}) {
  return {
    name: 'Test Testesen',
    bedrift: 'Eksempel AS',
    email: 'test@example.com',
    phone: '+47 000 00 000',
    subject: 'Karriere',
    message: 'Dette er en testmelding.',
    company: '',
    gclid: '',
    gbraid: '',
    wbraid: '',
    ...overrides,
  };
}

function startMock() {
  const received = [];
  const server = createServer((req, res) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      let body = null;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        body = null;
      }
      received.push({
        method: req.method,
        keys: body && typeof body === 'object' ? Object.keys(body).sort() : [],
        companyEmpty: body?.company === '',
        hasBedrift: typeof body?.bedrift === 'string' && body.bedrift.length > 0,
        subjectKarriere: body?.subject === 'Karriere',
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{"accepted":true}');
    });
  });
  return new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(MOCK_PORT, '127.0.0.1', () => resolve({ server, received }));
  });
}

function startNext(webhookUrl) {
  const env = { ...process.env };
  delete env.KONTAKT_WEBHOOK_URL;
  if (webhookUrl) env.KONTAKT_WEBHOOK_URL = webhookUrl;
  const child = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '-H', '127.0.0.1', '-p', String(NEXT_PORT)],
    { env, stdio: ['ignore', 'pipe', 'pipe'] },
  );
  let logs = '';
  const collect = (buf) => {
    logs += buf.toString();
    if (logs.length > 30_000) logs = logs.slice(-30_000);
  };
  child.stdout.on('data', collect);
  child.stderr.on('data', collect);
  return {
    child,
    safeLogs() {
      return logs
        .split('\n')
        .filter((line) => !leaks(line) && !line.includes('KONTAKT_' + 'WEBHOOK_URL='))
        .join('\n');
    },
  };
}

async function waitForNext(child) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) throw new Error('next avsluttet før den ble klar');
    try {
      const res = await fetch(`${NEXT_ORIGIN}/kontakt/`);
      if (res.status === 200) return;
    } catch {
      // serveren lytter ikke ennå
    }
    await new Promise((r) => setTimeout(r, 250));
  }
  throw new Error('next ble ikke klar');
}

async function stopChild(child) {
  if (!child || child.exitCode !== null) return;
  child.kill('SIGTERM');
  const force = setTimeout(() => child.kill('SIGKILL'), 4_000);
  await once(child, 'exit').catch(() => undefined);
  clearTimeout(force);
}

async function post(path, body, { redirect = 'follow' } = {}) {
  const res = await fetch(`${NEXT_ORIGIN}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
    redirect,
  });
  const text = await res.text();
  return {
    status: res.status,
    text,
    location: res.headers.get('location'),
  };
}

function leaks(text) {
  const markers = ['ho' + 'ok.' + 'eu', 'ho' + 'ok.' + 'us', 'inte' + 'gromat', 'ma' + 'ke.c' + 'om'];
  const lowered = text.toLowerCase();
  return markers.some((marker) => lowered.includes(marker));
}

const results = [];

function check(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'OK' : 'FEIL'}  ${name} — ${detail}`);
}

async function main() {
  if (!existsSync('.next/BUILD_ID')) {
    console.error('Mangler produksjonsbygg. Kjør npm run build først.');
    process.exit(1);
  }

  const { server, received } = await startMock();
  let next = null;
  try {
    next = startNext(`http://127.0.0.1:${MOCK_PORT}/mottak`);
    await waitForNext(next.child);

    const probe = await post('/api/kontakt', validPayload(), { redirect: 'manual' });
    const redirected = probe.status === 307 || probe.status === 308;
    check(
      'sti uten avsluttende skråstrek',
      redirected ? probe.location?.endsWith('/api/kontakt/') === true : probe.status === 200,
      redirected ? `omdirigerer ${probe.status}` : `svar ${probe.status}`,
    );

    const beforeValid = received.length;
    const valid = await post('/api/kontakt', validPayload());
    const forwarded = received[received.length - 1];
    const keysOk =
      forwarded &&
      FORWARDED_KEYS.every((key) => forwarded.keys.includes(key)) &&
      forwarded.keys.length === FORWARDED_KEYS.length;
    check(
      'gyldig skjema',
      valid.status === 200 &&
        received.length === beforeValid + 1 &&
        keysOk &&
        forwarded.companyEmpty &&
        forwarded.hasBedrift &&
        forwarded.subjectKarriere &&
        !leaks(valid.text),
      `forventet 200 og ett videresendt skjema, fikk ${valid.status}, videresendt=${received.length - beforeValid}`,
    );

    const beforeTrap = received.length;
    const trap = await post('/api/kontakt', validPayload({ company: 'bot' }));
    check(
      'honeypot utfylt',
      trap.status === 200 && received.length === beforeTrap && !leaks(trap.text),
      `forventet 200 uten videresending, fikk ${trap.status}, nye mottak=${received.length - beforeTrap}`,
    );

    const beforeLong = received.length;
    const longField = await post('/api/kontakt', validPayload({ message: 'a'.repeat(5001) }));
    check(
      'for lang melding',
      longField.status === 400 && received.length === beforeLong && !leaks(longField.text),
      `forventet 400, fikk ${longField.status}`,
    );

    const beforeHuge = received.length;
    const huge = await post(
      '/api/kontakt',
      JSON.stringify(validPayload({ message: 'a'.repeat(40_000) })),
    );
    check(
      'for stor body',
      huge.status === 413 && received.length === beforeHuge && !leaks(huge.text),
      `forventet 413, fikk ${huge.status}`,
    );

    const beforeEmail = received.length;
    const email = await post('/api/kontakt', validPayload({ email: 'ikke-en-epost' }));
    check(
      'ugyldig e-post',
      email.status === 400 && received.length === beforeEmail && !leaks(email.text),
      `forventet 400, fikk ${email.status}`,
    );

    const beforeExtra = received.length;
    const extra = await post('/api/kontakt', validPayload({ ekstra: 'nei' }));
    check(
      'ukjent felt',
      extra.status === 400 && received.length === beforeExtra,
      `forventet 400, fikk ${extra.status}`,
    );

    let saw429 = false;
    let forwardedDuringLimit = 0;
    const mark = received.length;
    for (let i = 0; i < 12 && !saw429; i += 1) {
      const res = await post('/api/kontakt', validPayload({ email: 'ikke-en-epost' }));
      if (res.status === 429) saw429 = true;
    }
    forwardedDuringLimit = received.length - mark;
    check(
      'rate limit på samme instans',
      saw429 && forwardedDuringLimit === 0,
      saw429 ? 'fikk 429' : 'fikk ikke 429 innen 12 ekstra kall',
    );

    await stopChild(next.child);
    next = startNext(undefined);
    await waitForNext(next.child);

    const beforeMissing = received.length;
    const missing = await post('/api/kontakt', validPayload());
    check(
      'manglende variabel',
      missing.status === 503 &&
        received.length === beforeMissing &&
        !leaks(missing.text) &&
        missing.text.includes('Noe gikk galt'),
      `forventet 503 uten videresending, fikk ${missing.status}`,
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : 'test feilet');
    if (next) console.error(next.safeLogs());
    process.exitCode = 1;
  } finally {
    if (next) await stopChild(next.child);
    await new Promise((resolve) => server.close(resolve));
  }

  const failed = results.filter((item) => !item.ok);
  console.log(`\n${results.length - failed.length}/${results.length} sjekker bestått`);
  if (failed.length > 0) process.exitCode = 1;
}

main();
