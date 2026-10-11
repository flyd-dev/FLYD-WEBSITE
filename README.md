# flyd.no

Nettsted for Flyd AS. Next.js 14 (App Router) på Vercel. Se `CLAUDE.md` for stack, merkevare og innhold.

Sidene forhåndsgenereres statisk. Kontaktskjemaet er det eneste som kjører på serveren: nettleseren poster til `/api/kontakt`, og `app/api/kontakt/route.ts` videresender.

## Miljøvariabler i Vercel

Settes for **Production** og **Preview**. Aldri i kode eller git.

| Variabel | Bruk |
| --- | --- |
| `KONTAKT_WEBHOOK_URL` | Adressen skjemaet videresendes til. Uten denne svarer `/api/kontakt` med en nøytral feil, og skjemaet virker ikke. |
| `NEXT_PUBLIC_FLOYD_URL` | «For ansatte»-lenken i bunnteksten. Tom eller utelatt verdi gir ingen lenke. Bakes inn ved bygg. |

Se `.env.example`. Webhook-adressen skal ikke limes inn der.

## Lokalt

```bash
npm ci
npm run dev
```

Skjemaet lokalt trenger `KONTAKT_WEBHOOK_URL` i miljøet til `next dev` / `next start` (for eksempel en lokal mock). `npm run lint` og `npm run build` sjekker koden. Etter bygg kan `node scripts/test-kontakt.mjs` kjøre skjemaet mot en lokal mock.
