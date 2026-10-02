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
- `public/` — kun filer som faktisk serveres. Bilder skal være **WebP** (unntak: favicon/OG-bilde og logo-PNG-ene i `public/brand/`). Favikonene lages med `node scripts/make-favicons.mjs` (fra logoens egne konturer).
- `brand_assets/` — kildefiler for profil (Profilmanual.jpg m.m.; designmanualen v1.0 er gjeldende). Rå foto-mapper (`header_pictures/` osv.) er gitignorert.

## Merkevare (følg designmanualen v1.0, sept. 2026)

Kilde: Flyd Designmanual v1.0. Tokens ligger i `tailwind.config.ts` (`flyd-*`) og som CSS-variabler i `app/globals.css`.

- **Palett (de eneste fargene):** Skog `#17292A` (primær mørk, hovedtekst), Petrol `#24494B` (seksjonsskiller, store tall, mørke kort), Flyd-teal `#4C8687` (logo, ikoner, linjer, avslutningsflater), Mint `#8BC2BB` (tagger, dekor, ikoner på mørk), Korall `#F2905A` (aksent), Rust `#B9551F` (aksent i tekst), Sand `#F8F6F1` (primær lys bakgrunn), Lys mint `#EAF2EF` (sekundær lys bakgrunn), Skifer `#4A5A5B` (brødtekst). Linjefarger: `#C9DCD7` på Lys mint, `#E2DDD3` på Sand. Dempet tekst på Skog: `#BFD8D5`. **Ikke rent hvitt eller rent svart.**
- **Bakgrunnsrytme:** Sand og Lys mint veksler på innhold, Petrol som seksjonsskille, Skog på forsiden og mørke flater, Flyd-teal kun bak signaturen. Ca. 55 % lyst, 25 % mørkt.
- **Korall** er krydderet: primærknapp kun på mørk bunn (Skog-tekst), Partner-pille, punktum i kickers/ikoner. Aldri tekst på lys bunn.
- **Typografi:** Poppins 600 (titler, overskrifter, tall) og 500 (ingress). DM Sans 400 (brødtekst), 500 (knapper), 700 versal +12 % (kickers). Begge via `next/font`. Titler i setningsstil, venstrejustert; sentrering kun i signaturen.
- **Byggeklosser:** kicker over hver overskrift (`Eyebrow`), pilleknapper (`Button.tsx`), tekstlenke med pil (`TextLink`), nøkkeltall med farget topplinje (`StatsSection`), nummerert liste (`NumberedList`), kort uten skygge og kantlinje. Radier: bilder 24 px (`rounded-bilde`), kort 16 px (`rounded-kort`), fliser 12 px (`rounded-flis`), piller `rounded-pille`.
- **Ikoner:** Lucide-stil, 2 px strek. Flyd-teal på lys, Mint på mørk. Tjenesteikonene (`components/ServiceIcon.tsx`, kilde `brand_assets/tjenesteikoner/`) har Sand-strek og Korall-punktum på glassflis.
- **Bilder:** ekte Flyd-folk (originaler: SharePoint › FLYD AS › Grafisk profil › Profileringsbilder), radius 24 px når de ikke er utfallende. Unngå bilder der skjermer viser kundedata eller tall. Tjenestebilder styres av `image` i `data/services.ts`, kontorbilder av `image`/`gallery` i `data/offices.ts`. Tekst på bilde krever Skog-overlay (`.overlay-skog` fra venstre, `.overlay-skog-bunn` nedenfra: 95 % → 82 % → 20 %). Ingen blur/filtre.
- **Logo:** alltid originalen (`FlydLogo`-SVG), aldri satt med skrift. Flyd-teal på lys, Sand på mørk. Minst 64 px bred på skjerm.
- **Signaturen «full flyd.»** (`Signatur.tsx`, maske av `public/brand/fullflyd-outline.png`): kun i Sand på Flyd-teal, aldri på bilde eller lys bunn. Brukes som avslutning i `ClosingCta`.
- **Språk:** «full flyd.» med små bokstaver og punktum – aldri «full flyt». Primærhandling «Snakk med oss». Telefon +47 480 19 958, e-post support@flyd.no, domenet skrives flyd.no. Tankestrek med mellomrom, mellomrom som tusenskille.
- Tone: nær, tydelig, trygg, framoverlent. Ikke generisk IT-byrå.

## Kvalitetskrav (fra nettstedsanalysen 2026 — se ANALYSE-RAPPORT.md)

- **Kontrast:** minst 4,5:1 for normal tekst, 3:1 for stor tekst (≥ 24 px). Kjente feller fra manualens tabell: Flyd-teal på Sand (3,8:1) og Sand på Flyd-teal (3,8:1) – kun stor tekst; Rust på Sand (4,4:1) og på Lys mint (4,2:1) – kun stor tekst, derfor er kickers på lys bunn Skog med Korall-punktum; Korall på Petrol (4,2:1) – bruk Mint; Korall/Mint på Sand – aldri tekst. Tekstlenker er Petrol med teal understrek.
- **Tilgjengelighet:** alle bilder har alt-tekst; modaler/drawere har fokusfelle + Escape; animasjoner skal respektere `prefers-reduced-motion`; skjemafelt har label + `aria-invalid`/`aria-describedby` ved feil.
- **SEO:** hver side har unik `metadata` (title/description/canonical). Ikke legg synlig tekst utelukkende i klient-animasjoner (typewriteren SSR-er første frase — behold det mønsteret).
- Interaktive elementer trenger hover-, focus-visible- og active-tilstander (fokusring: Flyd-teal på lys, Mint på mørk via `.on-dark`). Ikke bruk `transition-all`.

## Skjermbilder ved visuelt arbeid

- `node screenshot.mjs http://localhost:3000 [label] [mobile|desktop]` — lagrer til `temporary screenshots/` (gitignorert). Les PNG-en med Read-verktøyet og sammenlign mot faktisk resultat i minst to runder ved designendringer.

## Diverse

- Kontaktskjemaet poster til en Make-webhook (`components/ContactForm.tsx`) — honeypot-feltet heter `company`; det ekte bedriftsfeltet heter `bedrift`. Ikke fjern noen av delene.
- Samtykke: GA4 + Clarity er gated bak `CookieConsent` (Consent Mode v2, localStorage-nøkkel `flyd-consent`). gtag.js lastes cookieløst med alt `denied`; «Godta alle» setter analytics_storage **og** annonsesignalene (`ad_storage`, `ad_user_data`, `ad_personalization`) til `granted` — GA4 er koblet til Google Ads (sept. 2026). «Endre samtykke» i footer sender `flyd:open-consent`-event.
- Konverteringer til Google Ads (via GA4-import, ikke egen Ads-tag): `trackLead()` i `Analytics.tsx` sender `generate_lead` ved vellykket kontaktskjema; en global klikk-lytter sender `phone_click`/`email_click` på `tel:`/`mailto:`-lenker. Ikke fjern. Google forwarding-numre finnes ikke i Norge, så telefon måles kun som klikk.
- Git: commits på norsk, ingen Co-Authored-By-linjer.
