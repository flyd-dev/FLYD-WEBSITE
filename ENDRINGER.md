# Endringslogg — analyse-forbedringer

## Runde 5: Lighthouse-optimalisering (målt mot produksjon, mobil)

| Kategori | Før | Etter |
|---|---|---|
| Ytelse | 73 | **90** (LCP 5,1 s → 3,3 s, FCP 2,9 s → 1,1 s) |
| Tilgjengelighet | 96 | **100** |
| Beste praksis | 100 | **100** |
| SEO | 100 | **100** |

- **LCP-fiksen (størst):** `Reveal.tsx` skjuler aldri lenger innhold som er synlig i viewporten ved lasting — hero-teksten ble malt, skjult av JS og tonet inn igjen, og Google regnet *siste* maling som LCP. Kun innhold under folden får nå reveal-animasjon.
- GA/gtag lastes med `lazyOnload` — 161 KB analytics ute av det kritiske lastevinduet (Consent Mode-oppsettet er uendret).
- `browserslist` satt til moderne nettlesere — mindre polyfill-JS.
- Kontrast (96 → 100): all småtekst i `ink/50–60` hevet til `ink/70`; ERP-taglines og små etiketter fra teal-dark til `ink/70`; personvernlenken i cookie-modalen er sort med teal understrek; «fullflyd.»-vannmerket bruker pseudoelement-tekst (dekorativt — skal ikke måles som tekstinnhold, og kan ikke lenger markeres/leses opp).

---

## Runde 4: Kontorsider, statsautorisert-merking og SVG-logo

- **Kontorsider (M5):** Ny rute `app/kontor/[slug]/page.tsx` — seks statiske sider (`/kontor/stavanger/` … `/kontor/flekkefjord/`) målrettet lokale søk («regnskapsfører Egersund» osv.). Hver side har H1 «Regnskapsfører i {by}», lokal ingress, besøkskort (adresse/telefon/e-post/Google Maps), tjenesteliste, lenker til de andre kontorene og CTA. `data/offices.ts` utvidet med `slug` og `blurb`. Sitemap inkluderer sidene; LocalBusiness-schemaet (både globalt og per side, samme `@id`) peker nå på riktig kontorside. Kontorkortene på /kontakt og /om-flyd + bynavnene i footeren lenker til sidene (Google Maps-lenken ligger på kontorsiden). Stavanger-siden forklarer Forus/Sandnes-adressen (løser også I3).
- **Statsautorisert (M2 fullført):** Svein Zwygart og Thomas Haaland markert med `certified: true` (avklart med Flyd). Teamsiden viser nå 11 badges, og tallet i stats-seksjonen utledes automatisk fra teamdataene i `data/stats.ts` — det kan ikke lenger komme i utakt.
- **SVG-logo (L2):** Logoen vektorisert fra `flyd-logo-transparent.png` med potrace (letterformene er identiske — verifisert med overlagt sammenligning). Ny komponent `components/FlydLogo.tsx` med `currentColor`-fylling brukes i header (teal), footer (hvit), karriere-H1 (teal, med tilgjengelig navn «Flyd») og om-flyd-H2 (ink). Skarp på alle skjermer, én kilde, CSS-fargestyrt. PNG-ene ligger igjen i `public/brand/` (brukes av schema/OG).

Verifisert: `tsc` OK, `npm run build` OK (12 + 6 ruter), 11 badges, kontorsider rendrer (desktop + mobil skjermbilder), sitemap i statisk bygg inneholder alle kontor-URL-er.

**Gjenstår (venter på dere):** kundesitater (trenger samtykke — M3).

---

## Runde 3: Lav prioritet / polish (L-tiltak)

- **L3 Repo-opprydding:** `CLAUDE.md` skrevet om fra et fremmed malprosjekt til å beskrive det faktiske oppsettet (stack, struktur, merkevare- og kvalitetsregler). 41 ubrukte `.jpg`-duplikater slettet fra `public/` (11 MB → 3,8 MB — alle referanser bruker WebP). Rå-mappene var allerede gitignorert.
- **L4 Design-tokens:** `flyd-teal-soft` (#F2F7F7) inn i Tailwind-config; alle `bg-[#F2F7F7]` erstattet. Avviksfargen `#3b3c36` fjernet fra om-flyd-overskrifter (nå ren ink). Stats-tallene flyttet til `data/stats.ts` — kontor- og medarbeidertall utledes nå fra datafilene (også på om-flyd).
- **L5 Reveal ved navigasjon:** `Reveal.tsx` re-observerer `[data-reveal]` ved ruteendring (`usePathname`) — animasjonene virker nå også ved klikk-navigasjon, ikke bare første sidelast.
- **L6 Navigasjon/karusell:** Aktiv side markeres i menyen (`aria-current="page"` + teal understrek på desktop, teal tekst i mobilmenyen). Karusellpilene på karrieresiden vises nå også på mobil. Dots har ≥24 px klikkflate (padding rundt visuell prikk).
- **L7 Metadata:** `opengraph-image.png` komprimert 458 KB → 114 KB (samme format/filnavn). Organization-schema beriket med `numberOfEmployees` (utledet fra teamdata) og `memberOf` Regnskap Norge.
- **L8 Etiketter:** Eyebrow-tekst er nå alltid sort/hvit med AA-kontrast — teal-aksenten ligger i streken foran, ikke i teksten. Stats-etiketter opp fra 10–11 px til 12–13 px.
- **L9 Prosessbilder:** Blur redusert fra 5 px til 2 px og lysstyrke hevet (0,62 → 0,72) — motivene er gjenkjennelige, tekstkontrasten ivaretas av bunngradienten.
- **L1 Radius:** «Flytende» kort samlet på `rounded-2xl` (16 px): tjenestekort (før 20 px), hero-mosaikk (14 px), karrierekort (4 px). Flush hairline-grids (ERP, kontorer) og knapper er bevisst fortsatt skarpe.

**Bevisst ikke gjort:** L2 SVG-logo (rører selve merkevaren — bør besluttes av dere), M3 kundesitater, M5 kontorsider, L10/L11 innholdsblokker (pris, kontorhistorier, Stavanger/Forus-avklaring).

Verifisert: `tsc` OK, `npm run build` OK, skjermbilder av karusell (mobil), prosess-kort, eyebrows og aktiv nav.

---

## Runde 2: Middels prioritet (M-tiltak)

- **M1 Kontaktpunkter:** Telefonnummer (+47 480 19 958) i footerens kontaktblokk (`components/Footer.tsx`) og «Ring …»-knapp i mobilmenyen (`components/Header.tsx`).
- **M2 Statsautorisert-badge:** Teamkort viser «Statsautorisert»-merke med hake nederst på bildet (`components/TeamCard.tsx`). Utledes av `certified`-feltet eller rolletekst. **NB:** 9 av teamet har det i rollen i dag — stats-seksjonen sier 11, så de to siste bør markeres med `certified: true` i `data/team.ts`.
- **M4 Hero-høyde:** 100vh gjelder nå kun desktop (`lg:`) — på mobil vises stats-tallene i folden (`app/page.tsx`).
- **M6 Stillingsdata:** `datePosted: '2026-04-22'` (lanseringsdato) på alle tre stillinger, `deadline` endret fra «Snarest» til «Fortløpende» (`data/jobs.ts`). Verifisert i JobPosting-JSON-LD.
- **M7 Nunito fjernet:** Fonten ble lastet i tre vekter men aldri brukt (`app/layout.tsx`). Brødtekst-strategien (Helvetica vs. webfont) står som åpen beslutning.
- **M8 Marquee-pause:** `marquee-track`-klassen er nå faktisk på logostripen — hover pauser animasjonen som tiltenkt (`components/LogoMarquee.tsx`).
- **M9 Mosaikk-preload:** `priority` fjernet fra hero-mosaikken — 0 bilder lastes på mobil (før: 2 preloads à ~30–45 KB). Verifisert med nettverkslogg.
- **M10 CTA-vokabular:** Primær-CTA er «Snakk med oss» også i avslutningsseksjonene (før: «Send melding» / «Book en samtale» / «Ta kontakt»). Kontekstuelle CTA-er («Snakk med oss om lønn og HR», «Send søknad») er beholdt.
- **M11 Tekstfikser:** Dynamisk stillingsteller på karrieresiden (går ikke lenger ut av sync med antall stillinger), «Har du det haster …» → «Haster det, …» + løfte om svar innen én arbeidsdag i skjemaets kvittering, konsekvent tankestrek («–», 29 forekomster av «—» normalisert).
- **M12 Oransje fjernet helt:** ScrollToTop er nå teal-dark med ink-hover; `accent`/`accent-dark` er fjernet fra `tailwind.config.ts` og `globals.css`. Paletten består igjen kun av de fire offisielle fargene.

Verifisert: `tsc --noEmit` OK, `npm run build` OK, alle endringer bekreftet i rendret HTML/JSON-LD og med skjermbilder (mobil-hero, teamkort, scroll-knapp).

**Ikke gjort (krever innhold/beslutning fra dere):** M3 kundesitater, M5 lokasjonssider, brødtekst-webfont (T2).

---

# Runde 1: Høy prioritet (H1–H8)

Branch: `analyse-forbedringer` (kun lokal — ikke pushet).
Grunnlag: ANALYSE-RAPPORT.md, tiltakene med høy prioritet.
Alle endringer er verifisert med `tsc --noEmit`, `npm run build` (statisk eksport OK) og interaktiv testing i headless Chrome mot localhost:3001.

## H1 — Mobilmeny kan nå lukkes (`components/Header.tsx`)
- **Problem:** Draweren (`z-50`) dekket headeren (`z-40` stacking context) — lukkeknappen med `z-[60]` inne i headeren var umulig å treffe. Verifisert: klikk på knappens posisjon endret ingenting.
- Egen lukkeknapp (X) rendres nå **inne i draweren** (øverst til høyre).
- Burger-knappen åpner kun (`aria-label="Åpne meny"`, `aria-controls="mobilmeny"`).
- Escape lukker menyen; fokus flyttes til lukkeknappen ved åpning (etter 210 ms — visibility-transisjonen må fullføre før elementet kan få fokus) og tilbake til burgeren ved lukking.
- Fokusfelle: Tab/Shift+Tab looper innenfor draweren.
- Draweren får `visible`/`invisible` i tillegg til opacity — lenkene er ute av tab-rekkefølgen når menyen er lukket (var fokuserbare i usynlig tilstand før).
- Draweren har `role="dialog" aria-modal="true" aria-label="Meny"`.
- Verifisert: åpne → fokus på X → klikk X lukker → fokus tilbake; Escape lukker; `visibility: hidden` når lukket.

## H2 — Kontrast: hero-typewriter og oransje tekst-hovers
- `app/page.tsx`: Typewriter + markør endret fra `text-flyd-teal` (2,02:1 på hvit — brudd) til `text-flyd-teal-dark` (3,75:1 — godkjent for stor tekst).
- Alle `hover:text-flyd-accent` / `hover:decoration-flyd-accent` (oransje, 2,61:1 på hvit) er byttet til `flyd-teal-dark` i: `app/page.tsx`, `app/tjenester/page.tsx`, `app/kontakt/page.tsx`, `app/karriere/page.tsx`, `app/karriere/[slug]/page.tsx`, `app/om-flyd/page.tsx`, `components/ContactForm.tsx`.
- `components/Button.tsx`: aksentpilen på knapper (`accentArrow`) bruker nå `flyd-teal` i stedet for oransje.
- **Bevisst ikke endret:** ScrollToTop-knappen er fortsatt oransje — det er en designbeslutning (rapportens D1/M12) som bør tas samlet.

## H3 — Kontrast: tekst på teal-flater
- `app/page.tsx`: «Innsikt for i morgen.» endret fra `text-flyd-teal-dark` (1,85:1 på teal — nesten usynlig) til `text-flyd-ink/70` (4,25:1, beregnet). Sort med opacity er innenfor profilens regel om at tekst er sort/hvit.
- `app/tjenester/page.tsx`: «Passer for»-etiketten er nå tonebevisst: `flyd-teal` på mørke seksjoner, `ink/80` på teal, `ink/70` på hvite (før: alltid teal-dark, som feilet på teal og mørk bakgrunn).

## H4 — Skjermleser/SEO-fiks for bokstavanimasjonen (`components/ui/color-change-card.tsx`)
- **Problem:** Hover-effekten stabler to kopier av hver bokstav — DOM inneholdt `DDiiaalloogg`, `PPllaann` osv.
- Animasjonen er nå `aria-hidden="true"`; ren tittel ligger i en `sr-only`-span i samme `<h3>`.
- Verifisert: 0 forekomster av dobbelbokstaver i rendret HTML; `sr-only`-titlene til stede.

## H5 — H1 komplett i statisk HTML + redusert bevegelse
- `components/ui/typewriter.tsx`: Første frase («full flyd.») initialiseres som ferdig skrevet — serveren rendrer nå hele H1-en («Økonomi og teknologi – full flyd.»). Animasjonen tar over etter hydrering (venter, sletter, skriver neste frase). Ved `prefers-reduced-motion` står teksten stille på første frase og markøren skjules.
- `components/ui/hand-writing-text.tsx`: Håndtegnet sirkel vises ferdig tegnet (uten animasjon) ved `prefers-reduced-motion` (`useReducedMotion` fra framer-motion).
- Verifisert: rendret HTML inneholder «full flyd.» i H1.

## H6 — Personvern (`app/personvern/page.tsx`)
- Nytt avsnitt: kontaktskjemaet formidles via Make (make.com) som databehandler, servere i EU.
- «Dine rettigheter»: lagt til klageadgang til Datatilsynet med lenke.
- Samtykke-avsnittet peker nå på «Endre samtykke»-lenken i footeren (før: «tøm nettleserdataene»).

## H7 — «Endre samtykke» i footer
- Ny komponent `components/ConsentLink.tsx`: knapp som sender `flyd:open-consent`-event.
- `components/CookieConsent.tsx`: lytter på eventet og gjenåpner modalen; i tillegg er det lagt til fokusfelle (Tab looper i modalen) og `id="cookie-dialog"`.
- `components/Footer.tsx`: lenken ligger under Personvern i navigasjonskolonnen.

## H8 — Kontaktskjema: robusthet og tilgjengelighet
- `components/Button.tsx`: ny `disabled`-prop (med `aria-busy`, dempet stil, ingen klikk).
- `components/ContactForm.tsx`:
  - Send-knappen er `disabled` mens `status === 'sending'` — dobbel innsending til webhooken er ikke lenger mulig.
  - Valideringsfeil: fokus flyttes til første felt med feil; feltene får `aria-invalid` og `aria-describedby` som peker på feilmeldingen (`#name-error` osv.).
  - Nettverksfeilmeldingen har `role="alert"` (annonseres av skjermlesere).

## Verifisering
| Sjekk | Resultat |
|---|---|
| `npx tsc --noEmit` | OK |
| `npm run build` (statisk eksport) | OK, alle 12 ruter |
| Mobilmeny åpne/lukke/Escape/fokus (headless Chrome) | OK |
| H1 i SSR inneholder «full flyd.» | OK |
| «DDiiaalloogg» i rendret HTML | 0 forekomster |
| «Endre samtykke» i footer | OK |
| Visuell kontroll hero/stats/meny (skjermbilder) | OK |
