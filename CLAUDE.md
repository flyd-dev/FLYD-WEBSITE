# CLAUDE.md — flyd.no

Nettsted for Flyd AS (regnskap, rådgivning og teknologi, Sør-Vest-Norge).

## Stack og oppsett

- **Next.js 14 App Router** med statisk eksport (`output: 'export'`, `trailingSlash: true`, `images.unoptimized`) — ingen server-runtime.
- **Tailwind CSS** (se `tailwind.config.ts` for tokens), **framer-motion** for mikroanimasjoner, **lucide-react** for ikoner.
- Deploy: push til `main` → Vercel bygger og publiserer automatisk til www.flyd.no. **Ikke push uten eksplisitt beskjed.**
- Dev-server: `npm run dev` (port 3000). Hvis 3000 er opptatt av et annet prosjekt: `npx next dev -p 3001`.
- Bygg/sjekk før commit: `npx tsc --noEmit` og `npm run build`.

## Struktur

- `app/` — sider: `/`, `/tjenester`, `/om-flyd`, `/karriere`, `/karriere/[slug]`, `/kontakt`, `/personvern`, `not-found`, `sitemap.ts`, `robots.ts`.
- `components/` — delte komponenter; `components/ui/` — tilpassede tredjeparts-UI (typewriter, kort, karusell).
- `data/` — alt innhold som endres ofte: `services.ts`, `team.ts`, `jobs.ts`, `offices.ts`, `partners.ts`, `logos.ts`. **Rediger innhold her, ikke i sidene.**
- `public/` — kun filer som faktisk serveres. Bilder skal være **WebP** (unntak: favicon/OG-bilde og logo-PNG-ene i `public/brand/`).
- `brand_assets/` — kildefiler for profil (Profilmanual.jpg m.m.). Rå foto-mapper (`header_pictures/` osv.) er gitignorert.

## Merkevare (følg profilmanualen)

- **Farger (de eneste):** sort `#1F1F1F` (flyd-ink), lys blå `#8BC0BE` (flyd-teal, hovedfarge), mørk blågrønn `#4C8E93` (flyd-teal-dark), hvit `#FFFFFF` (flyd-paper). Opacity-varianter er lov. **Ingen andre farger** (oransje aksent ble fjernet bevisst i 2026 — ikke gjeninnfør).
- **Tekst er alltid sort eller hvit** (evt. med opacity). Aksentfargene brukes på flater, linjer og ikoner.
- **Typografi:** Poppins (via next/font) til overskrifter, Helvetica/Arial-stack til brødtekst (`globals.css`).
- **Slagordet er «full flyd»** — ordspill på navnet. Aldri «full flyt».
- Tone: moderne, teknisk dyktig, lokal, profesjonell, menneskelig. Ikke generisk IT-byrå.

## Kvalitetskrav (fra nettstedsanalysen 2026 — se ANALYSE-RAPPORT.md)

- **Kontrast:** minst 4,5:1 for normal tekst, 3:1 for stor tekst. Kjente feller: teal på hvit (2,0:1 — aldri til tekst), teal-dark på teal (1,9:1 — aldri). Teal-dark på hvit (3,75:1) er kun for stor tekst.
- **Tilgjengelighet:** alle bilder har alt-tekst; modaler/drawere har fokusfelle + Escape; animasjoner skal respektere `prefers-reduced-motion`; skjemafelt har label + `aria-invalid`/`aria-describedby` ved feil.
- **SEO:** hver side har unik `metadata` (title/description/canonical). Ikke legg synlig tekst utelukkende i klient-animasjoner (typewriteren SSR-er første frase — behold det mønsteret).
- Interaktive elementer trenger hover-, focus-visible- og active-tilstander. Ikke bruk `transition-all`.

## Skjermbilder ved visuelt arbeid

- `node screenshot.mjs http://localhost:3000 [label] [mobile|desktop]` — lagrer til `temporary screenshots/` (gitignorert). Les PNG-en med Read-verktøyet og sammenlign mot faktisk resultat i minst to runder ved designendringer.

## Diverse

- Kontaktskjemaet poster til en Make-webhook (`components/ContactForm.tsx`) — honeypot-feltet heter `company`; det ekte bedriftsfeltet heter `bedrift`. Ikke fjern noen av delene.
- Samtykke: GA4 + Clarity er gated bak `CookieConsent` (Consent Mode v2, localStorage-nøkkel `flyd-consent`). «Endre samtykke» i footer sender `flyd:open-consent`-event.
- Git: commits på norsk, ingen Co-Authored-By-linjer.
