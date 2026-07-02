# Endringslogg — analyse-forbedringer (H1–H8)

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
