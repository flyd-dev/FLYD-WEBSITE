# Nettstedsanalyse flyd.no — komplett forbedringsrapport

**Dato:** 2. juli 2026
**Grunnlag:** Full gjennomgang av kodebasen (Next.js 14, alle sider og komponenter), skjermbilder av alle 8 sider i mobil (390 px), tablet (768 px) og desktop (1440 px), rendret HTML per side, produksjonssiden på Vercel, målte WCAG-kontraster, målt JS-payload, og interaktiv testing (mobilmeny, skjema, bildelasting).

Alle funn har filreferanser og er verifisert i kode eller nettleser. Produksjon er bekreftet identisk med lokal kode.

---

## 1. Kort oppsummering av dagens nettside

flyd.no er en statisk eksportert Next.js 14-app (App Router, `output: 'export'`, hostet på Vercel) med 8 sider: forside, tjenester, om-flyd, karriere, tre stillingsannonser, kontakt, personvern og 404. Stack: Tailwind med egendefinert Flyd-palett, framer-motion for mikroanimasjoner, Poppins (Google Fonts) for overskrifter, systemfont for brødtekst, GA4 + Microsoft Clarity bak samtykke, kontaktskjema mot Make-webhook.

Helhetsinntrykket er **klart over gjennomsnittet for bransjen**: ryddig seksjonsrytme med fire bevisste flater (hvit / teal / lys teal / sort), gjennomført typografisk hierarki, ekte teamfotografi i sort-hvitt, god metadata og strukturerte data. Siden ser ikke ut som et generisk IT-byrå. Hovedproblemene er én kritisk mobilfeil (menyen kan ikke lukkes), en håndfull reelle WCAG-kontrastbrudd i kjernebudskapet, et SEO-tap i selve H1-en, og noen tillits-/konverteringsmuligheter som ligger ubrukt.

---

## 2. Hva som fungerer bra

Dette bør bevares og videreutvikles — ikke røres unødig:

- **Seksjonstonesystemet** ([Section.tsx](components/Section.tsx)): paper → teal → teal-soft → ink gir rytme og gjenkjennelighet uten å bli monotont. Tjenestesiden veksler tonene per tjeneste — elegant.
- **Typografisk skala**: `display-xl/lg/md` med clamp() og stram tracking ([tailwind.config.ts:38-42](tailwind.config.ts#L38-L42)) gir konsistente, store overskrifter på alle flater.
- **Tekstkvaliteten er høy.** Tjenestebeskrivelsene i [services.ts](data/services.ts) er konkrete og menneskelige («ikke det vi tilfeldigvis selger», «Denne siden, flyd.no, bygde vi selv»). «Passer for»-boksene er et smart grep som hjelper besøkende å kjenne seg igjen.
- **Ordspillet «full flyd»** brukes konsekvent (hero, prosess, vannmerke, 404: «Den siden har flydd sin vei» — glimrende).
- **SEO-grunnmuren**: unik title, description og canonical på alle sider, `lang="nb"`, robots.txt + sitemap OK, JSON-LD med Organization + 6× LocalBusiness (med geo!), BreadcrumbList på alle undersider og JobPosting på stillingssider. Alle 52 bilder på forsiden har alt-tekst.
- **Samtykkeimplementasjonen** ([Analytics.tsx](components/Analytics.tsx), [CookieConsent.tsx](components/CookieConsent.tsx)): Google Consent Mode v2 med default denied, Clarity lastes først ved samtykke, valget huskes. Dette er riktigere enn de fleste norske SMB-sider.
- **Ytelse på JS-siden**: ~191 KB total JS over wire (målt mot produksjon) er nøkternt. Alle innholdsbilder er WebP.
- **Stillingssidene** er komplette: sticky faktaboks, kontaktperson med telefon, JobPosting-schema, «Se også»-kryssalg.
- **Kontaktsiden**: telefon, e-post og org.nr. synlig, «Vi svarer normalt innen én arbeidsdag» (god forventningsstyring), honeypot + validering i skjemaet.
- **Teamfotografiet** i sort-hvitt med naturlige omgivelser støtter «lokal og menneskelig» langt bedre enn stockfoto.

---

## 3. Hva som bør forbedres (oversikt)

Detaljer i seksjonene under; her er hovedlinjene:

1. **Mobilmenyen kan ikke lukkes** — kritisk funksjonsfeil (verifisert).
2. **Kontrastbrudd** på selve kjernebudskapet (hero-punchline 2.02:1) og stats-overskriften (1.85:1).
3. **H1 på forsiden er ufullstendig for søkemotorer** («Økonomi og teknologi–») fordi typewriter-teksten ikke SSR-es.
4. **Prosess-kortene dobler hver bokstav i DOM** («DDiiaalloogg») — skjermlesere og crawlere leser søppel.
5. **Oransje aksentfarge (#E8884C, 18 forekomster) er utenfor den offisielle paletten** — mest synlig som scroll-til-toppen-knapp på hver eneste side.
6. **Tillitsinnhold mangler**: ingen kundesitater/case, «11 statsautoriserte» underbygges ikke på teamsiden (feltet finnes i data, vises aldri), Regnskap Norge-logo ligger nederst i en logostripe.
7. **Personvern-hull**: Make (databehandler for kontaktskjema) er ikke nevnt i personvernerklæringen; samtykke kan ikke endres fra UI.
8. **Småplukk**: død CSS, ubrukt Nunito-font, dobbel-submit mulig i skjema, hardkodede avviksfarger, utdatert CLAUDE.md, døde asset-mapper i repo.

---

## 4. Kritiske eller viktige funn

### KRITISK

**K1 — Mobilmenyen kan ikke lukkes.**
[Header.tsx](components/Header.tsx#L38-L121). Headeren er `sticky … z-40` og danner egen stacking context; lukkeknappen inne i den har `z-[60]`, men draweren er et *søsken* med `fixed inset-0 z-50` og legger seg derfor over hele headeren — inkludert knappen. Verifisert i headless Chrome: `document.elementFromPoint` på knappens koordinater treffer draweren, klikk på posisjonen endrer ingenting (`aria-expanded` forblir `true`). Eneste vei ut er å klikke en meny-lenke. En mobilbruker som åpner menyen «ved et uhell» er fanget.
**Fiks:** Render lukkeknappen *inne i* draweren (øverst til høyre, samme posisjon som burgeren), eller løft header til `z-[60]` når menyen er åpen. Legg samtidig til Escape-lukking og fokusfelle.

**K2 — Hero-punchlinen feiler WCAG-kontrast.**
Typewriter-teksten («full flyd.» / «god kontroll.» osv.) er `text-flyd-teal` (#8BC0BE) på hvit: **2.02:1**. Kravet er 3:1 selv for stor tekst (AA). Dette er setningen hele siden bygger mot, og den er det svakeste elementet visuelt — spesielt utendørs/på mobil. Samme problem: «Bli kunde →» og andre små lenker som hover-er til oransje (#E8884C på hvit = 2.61:1).
**Fiks:** Bruk #4C8E93 (teal-dark, 3.75:1 = OK for stor tekst) for typewriteren på hvit bakgrunn, eller legg punchlinen på mørk flate. Lys teal #8BC0BE fungerer utmerket *på sort* (8.15:1) — som i «sparringspartner.»-overskriften.

**K3 — «Innsikt for i morgen.» er nesten usynlig.**
[page.tsx:145](app/page.tsx#L145): `text-flyd-teal-dark` (#4C8E93) på teal seksjonsbakgrunn (#8BC0BE) = **1.85:1**. Halve overskriften i stats-seksjonen forsvinner.
**Fiks:** Hvit tekst (3.75:1, OK for stor tekst) eller sort/ink på teal-flaten (8.15:1). Samme mønster brukes riktig andre steder — det er bare på teal-tone-seksjoner kombinasjonen kolliderer. Sjekk også «Passer for»-etiketten (teal-dark) på teal-seksjonen på tjenestesiden ([tjenester/page.tsx:146](app/tjenester/page.tsx#L146)).

**K4 — Prosess-kortene skriver hver bokstav dobbelt i DOM.**
[color-change-card.tsx:87-102](components/ui/color-change-card.tsx#L87-L102): hover-effekten stabler to kopier av hver bokstav. Rendret HTML inneholder `<h3>DDiiaalloogg</h3>`, `PPllaann`, `IIddrriifftt`, `VViiddeerreeuuttvviikklliinngg`. Skjermlesere leser dette høyt; søkemotorer indekserer det.
**Fiks:** `aria-hidden="true"` på den animerte bokstavstabelen + en `sr-only`-span med ren tekst (eller `aria-label` på h3).

### VIKTIG

**V1 — H1 på forsiden er amputert i statisk HTML.**
Typewriteren starter tom ved SSR, så crawlere (og JS-avslåtte brukere) ser `<h1>Økonomi og teknologi– |</h1>`. Nøkkelfrasen «full flyd» finnes ikke i H1. [page.tsx:91-109](app/page.tsx#L91-L109) + [typewriter.tsx:53](components/ui/typewriter.tsx#L53).
**Fiks:** SSR-fallback: render første frase statisk (erstattes ved hydrering), eller gi H1 `aria-label="Økonomi og teknologi – full flyd."` og legg en `sr-only`/noscript-tekst. Typewriteren respekterer heller ikke `prefers-reduced-motion` — legg inn statisk visning av «full flyd.» for de brukerne.

**V2 — Personvernerklæringen nevner ikke Make.**
Kontaktskjemaet POST-er navn/e-post/telefon/melding til `hook.eu2.make.com` ([ContactForm.tsx:8](components/ContactForm.tsx#L8)), men [personvern-siden](app/personvern/page.tsx) lister bare Google og Microsoft som databehandlere. GDPR krever at databehandlere/tredjeparter opplyses. Mangler også: klageadgang til Datatilsynet (anbefalt standardpunkt).
**Fiks:** Legg til avsnitt om skjemabehandling via Make (EU-datasenter, eu2) + klageadgang.

**V3 — Samtykke kan ikke endres fra UI.**
Personvernsiden sier «tøm nettleserdataene» for å endre valg. Det holder ikke som «like enkelt å trekke som å gi» (ekomloven/GDPR-prinsipp).
**Fiks:** «Endre samtykke»-lenke i footer (nullstill `flyd-consent` og vis modalen igjen). Liten jobb, juridisk og UX-messig riktig.

**V4 — Skjemaet kan dobbel-submittes og feil annonseres ikke.**
[Button.tsx](components/Button.tsx#L36-L55) støtter ikke `disabled`, så «Send melding» er klikkbar mens `status === 'sending'` — to raske klikk gir to webhook-kall (to leads i Make). Feilmeldinger settes uten `aria-live`, felter mangler `aria-invalid`/`aria-describedby`, og fokus flyttes ikke til første feil.
**Fiks:** `disabled`-prop på Button + `aria-busy`; `role="alert"`/`aria-live="polite"` på feiloppsummering; `aria-invalid` + `aria-describedby` per felt.

**V5 — Fokus er ikke fanget i mobilmeny og cookie-modal.**
Begge låser scroll, men Tab vandrer inn i innholdet bak ([Header.tsx](components/Header.tsx#L93-L121), [CookieConsent.tsx](components/CookieConsent.tsx#L64-L119)). Cookie-modalen er `role="dialog" aria-modal="true"` og flytter fokus inn (bra), men slipper det ut igjen.
**Fiks:** enkel fokusfelle (loop på Tab/Shift+Tab), Escape for meny (ikke for cookie-modalen, den skal kreve valg).

**V6 — Marquee-pause virker ikke (død CSS) og mangler pausemulighet.**
[globals.css:71](app/globals.css#L71) styler `.marquee-track:hover`, men ingen elementer har klassen `marquee-track` ([LogoMarquee.tsx](components/LogoMarquee.tsx)). Kundelogo-båndet kan dermed ikke pauses (WCAG 2.2.2 krever pause/stopp for bevegelse over 5 s). `prefers-reduced-motion` stopper den riktignok (dekket i globals.css).
**Fiks:** legg klassen på wrapperen, + vurder synlig pauseknapp.

**V7 — «11 statsautoriserte regnskapsførere» underbygges ikke.**
Forsiden hevder det i stats; på teamsiden finnes `certified`-feltet i [team.ts](data/team.ts#L6) men [TeamCard.tsx](components/TeamCard.tsx) viser det aldri. Tittelen «Statsautorisert regnskapsfører» står i rolleteksten for noen, men det systematiske tillitssignalet er borte.
**Fiks:** badge («Statsautorisert») på kortene der `certified: true`, og sett feltet i data.

**V8 — JobPosting-schema mangler datoer.**
Ingen av stillingene i [jobs.ts](data/jobs.ts) setter `datePosted`/`validThrough`; koden faller tilbake til filens mtime ([karriere/[slug]/page.tsx:25-33](app/karriere/[slug]/page.tsx#L25-L33)) — som endres ved hver touch av filen. Google Jobs prioriterer annonser med ekte datoer, og `deadline: 'Snarest'` gir ingen `validThrough`.
**Fiks:** sett faktiske ISO-datoer i data.

---

## 5. Designmessige forbedringsforslag

**D1 — Avklar oransjefargen (#E8884C) — nå eller aldri.**
18 forekomster: scroll-til-toppen-knappen (mest synlige elementet på hele siden, alle sider), hover på tekstlenker, aksentpiler på knapper. Paletten din er sort/lys blå/mørk blågrønn/hvit. Oransje er den eneste «fremmede» fargen, kontrasten er for lav til tekstbruk (2.61:1), og den brukes usystematisk (noen hovers blir oransje, andre teal-dark).
**Anbefaling:** Fjern den, og la teal-dark (#4C8E93) ta hover/aksent-rollen — det strammer inn profilen og løser kontrastproblemene samtidig. Alternativt: formaliser den i profilmanualen som «signal-aksent» og bruk den *kun* på maks ett element per side (f.eks. scroll-til-toppen), aldri på tekst. Det som ikke fungerer, er dagens mellomting.

**D2 — Stram inn radius-språket.**
Konfigen sier skarpe hjørner (2–4 px, [tailwind.config.ts:29-34](tailwind.config.ts#L29-L34)) og knappene er tilnærmet skarpe — men tjenestekortene har 20 px ([ruixen-card-01.tsx:68](components/ui/ruixen-card-01.tsx#L68)), teamkort 16 px (`rounded-2xl`), mosaikk 14 px, gallerikort 4 px. Fire ulike formspråk gjør helheten mindre gjennomført enn den kunne vært.
**Anbefaling:** Velg to nivåer (f.eks. 2 px for knapper/inputs, 12 px for alle kort) og bruk dem konsekvent via config-tokens.

**D3 — Hero på mobil sløser med folden.**
`min-h-[100vh]` ([page.tsx:82](app/page.tsx#L82)) uten mosaikk gir ~30 % tom hvit flate under CTA-ene på 390×844. Stats-seksjonen (tallene = beste tillitssignal) skyves under folden.
**Anbefaling:** Dropp 100vh under `lg:` — la heroen slutte etter CTA-ene med normal py, så «Kontroll i dag / 670+ kunder» titter opp i folden.

**D4 — Fire kortsystemer gjør uttrykket sprikende.**
RuixenCard (gradient+grain), SpotlightCard (muse-spotlight), GlowCard (glød), ColorChangeCards (foto+bokstavanimasjon) — alle er fine hver for seg og tonalt samkjørte, men forsiden alene bruker tre av dem. Det koster vedlikehold og litt visuell ro.
**Anbefaling:** Behold RuixenCard-gradientspråket som primært «Flyd-kort», la ERP-kortene arve samme ramme/hover, og reserver foto-kortene til prosess/karriere. (Ingen hast — dette er polish.)

**D5 — Eyebrow-tekst på grensen.**
12 px uppercase i `ink/70`–`teal-dark` er lesbart på hvit, men `teal-dark` på teal-soft (#F2F7F7) ≈ 3.5:1 på 12 px-tekst er under AA (4.5:1). Stats-etikettene er 10–11 px ([StatsSection.tsx:151](components/StatsSection.tsx#L151)) — «Statsautoriserte regnskapsførere» fortjener mer enn 10 px.
**Anbefaling:** Min. 12 px og mørkere tone (`ink/80`) for etiketter på lyse flater; stats-labels opp til 12–13 px.

**D6 — Vannmerket (FullflydMark) fungerer** — behold det, men på karriere-hero ligger det så høyt at det kolliderer litt med ingressteksten på 1440 px. Vurder `opacity-[0.08]` og litt lavere posisjon der.

---

## 6. Innholdsmessige forbedringsforslag

**I1 — Kundestemmer er det største hullet.**
Null sitater, case eller anmeldelser på hele siden. For regnskapstjenester (høy tillitsbarriere, langt kundeforhold) er ett ærlig sitat fra en gjenkjennelig lokal bedrift verdt mer enn alle gradienter til sammen. Dere har 670+ kunder og en logostripe med navn som Sirdal Bygg og Arkit — spør tre av dem.
**Forslag:** Seksjon på forsiden mellom «Hvorfor Flyd» og ERP: ett sitat + navn/rolle/bedrift/foto (eller logo). Gjenbruk på tjenestesiden per tjeneste hvis mulig.

**I2 — Det lokale er underspilt i tekst.**
Kontorene finnes som kort og i footer, men ingen tekst *forteller* historien («Fra Forus til Flekkefjord — vi sitter der kundene våre driver»). For lokale søk og lokal tillit: gi hvert kontor 2–3 setninger (hvem sitter der, hvilke bransjer betjenes derfra) — enten på om-flyd eller egne lokasjonssider (se SEO).

**I3 — «Stavanger · FOMO» har Sandnes-adresse.**
[offices.ts:13-20](data/offices.ts#L13-L20): Grenseveien 21, 4313 Sandnes (Forus). Lokalkjente ser det umiddelbart; LocalBusiness-schemaet sier også Sandnes. Enten kall kontoret «Forus» / «Stavanger-regionen», eller forklar («på Forus, midt i Stavanger-regionen»).

**I4 — Prisforventning mangler helt.**
Vanligste innvending mot regnskapsbyrå er «hva koster det?». Ingen side adresserer det.
**Forslag:** Kort blokk på tjenestesiden eller kontaktsiden: hvordan prises samarbeid (fast/time/kombinasjon), hva påvirker prisen, «uforpliktende kartlegging». Ingen tall nødvendig — bare fjern usikkerheten.

**I5 — Mikrotekst-finpuss.**
- «Har du det haster …» → «Haster det, …» ([ContactForm.tsx:107](components/ContactForm.tsx#L107)) — grammatikkfeil i suksessmeldingen.
- Konsekvent tankestrek: både «—» og «–» brukes om hverandre (f.eks. [page.tsx:175](app/page.tsx#L175) vs [page.tsx:112](app/page.tsx#L112)). Velg én (typografisk norsk: tankestrek «–» med mellomrom).
- «Tre åpne stillinger akkurat nå.» er hardkodet ([karriere/page.tsx:138](app/karriere/page.tsx#L138)) rett ved dynamisk `{jobs.length} stillinger` — blir feil den dagen en stilling fjernes. Generer fra `jobs.length` («Én åpen stilling» / «To åpne …»).
- Stillingsannonsene har `deadline: 'Snarest'` — «Søknadsfrist: Snarest» leses rart. Bruk «Fortløpende».

**I6 — Tonen er god — ikke rør den.** «Kompetansehus», «full flyd», «sparringspartner» brukes konsekvent. Eneste vakt: «kompetansehus» åpner fire sider på rad — varier med «fagmiljø»/«ett hus» der det tåles.

---

## 7. Tekniske forbedringsforslag

**T1 — Fjern Nunito.** Lastes i [layout.tsx:19-24](app/layout.tsx#L19-L24) med tre vekter (700/800/900), brukes **aldri** (verifisert med grep — `font-nunito`/`var(--font-nunito)` finnes ikke i kodebasen). Død font-payload på hver sidevisning.

**T2 — Brødtekst-fonten er i praksis Arial på Windows/Android.**
Profilen sier «Helvetica Light»; [globals.css:21](app/globals.css#L21) setter `"Helvetica Neue", Helvetica, Arial` med vekt 400. Helvetica finnes ikke på Windows/Android → majoriteten av besøkende ser Arial 400. Det er verken Helvetica eller Light.
**Valg:** (a) aksepter bevisst (og oppdater profilen), eller (b) last en nøytral grotesk som webfont (f.eks. Inter/IBM Plex Sans i 300/400) slik at alle plattformer ser det samme. Med Nunito fjernet (T1) er font-budsjettet der allerede.

**T3 — Reveal-animasjoner kjører bare på første sidelast.**
[Reveal.tsx](components/Reveal.tsx) observerer `[data-reveal]` én gang fra layout-mount. Ved klientnavigasjon (f.eks. Forside → Tjenester) re-kjøres ikke effekten, så nye sider vises uten reveal (elegant degradert, men inkonsistent). Fiks: re-kjør på `usePathname()`-endring.

**T4 — Preload av skjulte mosaikkbilder på mobil.**
Verifisert: 390 px-viewport laster `ig-1.webp` + `office-1.webp` (priority-preload) selv om mosaikken er `hidden lg:block` ([page.tsx:129](app/page.tsx#L129), [HeroMosaic.tsx:77](components/HeroMosaic.tsx#L77)) — ~60–90 KB bortkastet på mobilens kritiske sti. Fiks: ikke render `<HeroMosaic>` under `lg` (CSS-skjuling hindrer ikke preload), f.eks. med en media-query-hook eller ved å flytte priority til kun desktop.

**T5 — Rydd i repoet.**
- [CLAUDE.md](CLAUDE.md) beskriver et *helt annet* prosjekt (single index.html, Tailwind CDN, Windows-stier `C:/Users/nateh/…`). Alle AI-verktøy og nye utviklere blir aktivt villedet. Skriv den om til å beskrive dagens Next.js-oppsett (dev-kommando, struktur, palett, regler).
- Døde mapper i rot: `our_partners/`, `header_pictures/`, `Favicon/` («ChatGPT Image …png»), `temporary screenshots/` — duplikater av det som ligger i `public/`. Slett eller flytt til en `assets-src/` utenfor repo/gitignore.
- `public/**/*.jpg`-duplikater: koden refererer kun `.webp` (verifisert), men jpg-ene ligger igjen (~5 MB). De serveres ikke, men blåser opp repo/deploy.
- `tsconfig.tsbuildinfo` bør i .gitignore.

**T6 — Sentraliser gjentatte verdier.**
`#F2F7F7` (teal-soft) er hardkodet 8+ steder (`hover:bg-[#F2F7F7]`, bakgrunner) i tillegg til [Section.tsx:10](components/Section.tsx#L10); `#3b3c36` (avvikende olivensvart!) er hardkodet på om-flyd-overskrifter ([om-flyd/page.tsx:153](app/om-flyd/page.tsx#L153), 176, 185) — bryter «tekst er alltid sort/hvit». Stats-tallene (670+/6/19/11) ligger i [page.tsx:29-34](app/page.tsx#L29-L34), mens antall ansatte/kontorer også er hardkodet i om-flyd-teksten. Legg teal-soft i Tailwind-config, fjern #3b3c36 (bruk flyd-ink), og flytt stats til `data/`.

**T7 — Småbugs.**
- `aria-current="page"` mangler i nav ([Header.tsx:61-71](components/Header.tsx#L61-L71)).
- Gallery4-dots er 6 px høye klikkflater ([gallery4.tsx:189-202](components/ui/gallery4.tsx#L189-L202)) — langt under 24×24 px-minimum; gjør dem 44×24 med padding.
- HandWrittenCircle og Typewriter ignorerer `prefers-reduced-motion` (framer-motion-animasjonene kjører uansett; kun CSS-animasjonene er dekket i globals.css).
- LogoMarquee re-renderes ikke ved reduced motion, men CSS stopper den — OK; legg likevel `aria-hidden` er alt satt (bra).

---

## 8. SEO- og metadataforbedringer

**S1 — Fiks H1 på forsiden** (= V1). I dag indekseres `Økonomi og teknologi–`. Etter fiks: «Økonomi og teknologi – full flyd.» med nøkkelfrasen i behold.

**S2 — Lokasjonssider er den største uutnyttede muligheten.**
Søk som «regnskapsfører Egersund», «regnskapskontor Flekkefjord», «regnskapsbyrå Sirdal» har lav konkurranse, og dere har fysisk kontor + LocalBusiness-schema for alle seks stedene — men ingen side å rangere med (kontorene er bare kort på /kontakt og /om-flyd). Seks tynne-men-ekte sider à la `/kontor/egersund/` (adresse, folkene der, tjenester, kart, lokal ingress) + kobling fra LocalBusiness-schemaets `url` vil sannsynligvis eie disse søkene. Dette er den klart beste SEO-investeringen for en lokal aktør.

**S3 — JobPosting-datoer** (= V8): ekte `datePosted`/`validThrough` for Google Jobs-synlighet.

**S4 — Metadata-detaljer.**
- `opengraph-image.png` er 458 KB — komprimer til <150 KB (tregere forhåndsvisning i deling, LinkedIn cacher dårlig store bilder).
- Organization-schema kan berikes med `foundingDate`, `numberOfEmployees`, `memberOf` (Regnskap Norge) — gratis tillit i kunnskapspanel.
- Sitemap: alle sider har samme `lastmod` (build-tid) — kosmetisk, men ekte datoer per side er bedre signal.
- 404 ved statisk eksport: Vercel serverer `404.html` riktig (verifisert oppsett), ingen endring nødvendig.

**S5 — Semantikk er god** (én H1 per side, section-bruk, address-info i footer kunne vært `<address>`) — eneste reelle heading-rariteter er K4-dobbelbokstavene og at footer-kolonnetitler er `h3` uten seksjonskontekst (kosmetisk; kan bli `p`/`strong`).

---

## 9. Forslag til bedre konvertering og CTA-er

**C1 — Gjør telefonen synlig før kontaktsiden.**
Målgruppen (travle bedriftseiere) ringer. Nummeret finnes kun på /kontakt, i CTA-seksjonens «Ring oss»-knapp og i footer… hvor det faktisk *mangler* ([Footer.tsx:26-33](components/Footer.tsx#L26-L33) har bare e-post + org.nr).
**Forslag:** (a) telefonnummer i footer-kontaktblokken, (b) `tel:`-lenke i mobilmenyen under «Snakk med oss», (c) vurder nummer i header på desktop (diskret, høyre for nav).

**C2 — Stram inn CTA-vokabularet.**
I dag: «Snakk med oss», «Send melding», «Ta første steg», «Book en samtale», «Ta kontakt», «Bli kunde». Seks varianter av samme handling utvanner mønstergjenkjenningen.
**Forslag:** Primær = «Snakk med oss» overalt (header, hero, seksjons-CTA-er); sekundær = «Se våre tjenester»/kontekstuelle. «Book en samtale» er faktisk det mest konkrete løftet — vurder den som primær hvis dere mener det (og koble den til noe mer forpliktende enn skjemaet, f.eks. en kalenderlenke).

**C3 — Suksessmeldingen bør selge neste steg.**
Etter innsending: «Vi kommer tilbake til deg innen kort tid» — men kontaktsiden lover «innen én arbeidsdag». Gjenta det konkrete løftet i suksessmeldingen (konsistens bygger tillit), og legg gjerne til «I mellomtiden: se hvordan vi jobber →».

**C4 — Tillitssignaler over folden.**
Stats-seksjonen (670+ kunder, 11 statsautoriserte) er sterk, men ligger under 100vh-heroen på mobil (D3). Regnskap Norge-medlemskapet — et faktisk kvalitetsstempel — ligger anonymt i partnerstripen nederst. Vurder en diskret linje i/under heroen: «Medlem av Regnskap Norge · 670+ kunder · 6 kontorer i Sør-Vest-Norge».

**C5 — Kundelogoer: kvalitet over kvantitet.** Stripen inneholder logoer med svært ulik gjenkjennelighet. For B2B-tillit er 6 sterke lokale navn med jevn visuell vekt bedre enn 11 ujevne. (Lav prioritet.)

---

## 10. Forslag til bedre bruk av bilder, logoer og grafiske elementer

**B1 — Logo som PNG bør bli SVG.** Header/footer bruker 935×445-PNG nedskalert til 28–36 px ([Header.tsx:48-58](components/Header.tsx#L48-L58)). En SVG-wordmark er skarpere på alle skjermer, mindre, og kan fargestyres med CSS (i dag trengs tre PNG-varianter: transparent/dark/white). Wordmark-komponenten ([Wordmark.tsx](components/Wordmark.tsx)) finnes allerede som tekstbasert alternativ — brukes bare på 404.

**B2 — Ekte foto brukes godt — utvid bruken.** Mosaikk, prosess-kort og karriere-kort bruker egne bilder med konsistent behandling (blur/gradient/overlay). Men tjenestesiden og om-flyd-heroen er helt fotoløse — ett miljøbilde i tjeneste-heroen (eller per annenhver tjeneste-seksjon) ville brutt tekstmonotonien. Bildene finnes allerede i `public/header/` og `public/team-bg/`.

**B3 — Prosessbildene drukner.** `blur-[5px] brightness-[0.62]` ([color-change-card.tsx:45](components/ui/color-change-card.tsx#L45)) gjør motivene ugjenkjennelige — da kunne det like gjerne vært en gradient (og spart ~800 KB jpg/webp). Reduser blur til 2 px og løft brightness, eller bytt til gradient og spar vekten.

**B4 — Ikonspråket er konsistent** (Lucide, strokeWidth 1.5–1.75 gjennomgående) — bra. Eneste avvik: sosiale ikoner i footer er håndskrevne SVG-er; fint, men sjekk at de matcher Lucide-strekvekten visuelt.

**B5 — Favicon:** SVG + PNG-sett er komplett. Sjekk at `Favicon/ChatGPT Image….png` i rot ikke er kilden til noe (den er ikke referert — rydd, jf. T5).

---

## 11. Forslag til forbedret mobilopplevelse

Prioritert for mobil spesifikt:

1. **Fiks menyen** (K1) + Escape/fokusfelle (V5).
2. **Kort ned heroen** (D3) så stats vises i folden.
3. **`tel:`-lenke i mobilmenyen** (C1b) — ett trykk for å ringe.
4. **Typewriter-kontrast** (K2) — mest merkbart på mobil i dagslys.
5. **Touch-targets:** Gallery4-dots (T7), footer-lenker har god spacing (OK), meny-lenker er store (bra).
6. **Karriere-karusellen på mobil:** pilene er skjult (`hidden md:flex`, [gallery4.tsx:83](components/ui/gallery4.tsx#L83)) — dragFree + 6 px-dots er eneste navigasjon. Vis pilene også på mobil (under kortene) eller gjør dots klikkbare med ordentlig størrelse.
7. **Scroll-til-toppen-knappen** ligger over innhold nederst til høyre på alle sider og er oransje (D1) — på mobil kolliderer den visuelt med «Passer for»-bokser og CTA-er. Vurder å vise den først etter 2× viewport-scroll og i ink/teal-dark.
8. **Tablet (768 px) er generelt fin** — 2-kolonners grid holder, ingen overflow funnet på noen side i sveipet.

---

## 12. Prioritert tiltaksliste

### Høy prioritet (feil, juss, kjernebudskap — bør gjøres først)

| # | Tiltak | Ref | Innsats |
|---|--------|-----|---------|
| H1 | Fiks mobilmeny-lukking (+ Escape, fokusfelle) | K1, V5 | Liten |
| H2 | Typewriter-farge → teal-dark (eller mørk flate); fjern oransje på tekst-hover | K2 | Liten |
| H3 | «Innsikt for i morgen.» → hvit/ink på teal-seksjoner (+ «Passer for» på teal) | K3 | Liten |
| H4 | Skjermleser-/SEO-fiks for bokstavanimasjonen (aria-hidden + sr-only) | K4 | Liten |
| H5 | SSR-fallback for H1 («full flyd.» statisk) + reduced-motion-håndtering | V1 | Liten–middels |
| H6 | Personvern: nevn Make som databehandler + klageadgang | V2 | Liten |
| H7 | «Endre samtykke»-lenke i footer | V3 | Liten |
| H8 | Skjema: disabled ved sending + aria-live/aria-invalid | V4 | Liten |

### Middels prioritet (konvertering, SEO, tydelig gevinst)

| # | Tiltak | Ref | Innsats |
|---|--------|-----|---------|
| M1 | Telefonnummer i footer + tel-lenke i mobilmeny | C1 | Liten |
| M2 | Statsautorisert-badge på teamkort | V7 | Liten |
| M3 | Kundesitat-seksjon på forsiden (krever 1–3 sitater fra dere) | I1 | Middels |
| M4 | Hero-høyde på mobil (dropp 100vh under lg) | D3 | Liten |
| M5 | Lokasjonssider /kontor/[sted]/ ×6 | S2 | Stor |
| M6 | JobPosting-datoer i jobs.ts + «Fortløpende» i stedet for «Snarest» | V8, I5 | Liten |
| M7 | Fjern Nunito; avklar brødtekst-strategi (Arial-avvik) | T1, T2 | Liten/middels |
| M8 | Marquee-pause-fiks (død CSS) | V6 | Liten |
| M9 | Ikke render mosaikk på mobil (spar preload) | T4 | Liten |
| M10 | CTA-vokabular strammes inn | C2 | Liten |
| M11 | Dynamisk stillingsteller + tankestrek-konsistens + «Har du det haster»-fiks | I5 | Liten |
| M12 | Oransje-beslutning gjennomføres helhetlig (inkl. ScrollToTop) | D1 | Liten–middels |

### Lav prioritet (polish og hygiene)

| # | Tiltak | Ref |
|---|--------|-----|
| L1 | Radius-tokens forenes (2 px + ett kortnivå) | D2 |
| L2 | Logo som SVG i header/footer | B1 |
| L3 | Rydd repo: CLAUDE.md omskrives, døde mapper/jpg-duplikater ut, tsbuildinfo gitignores | T5 |
| L4 | Sentraliser teal-soft, fjern #3b3c36, stats til data/ | T6 |
| L5 | Reveal ved klientnavigasjon | T3 |
| L6 | aria-current i nav, Gallery4-dots størrelse, karusellpiler på mobil | T7 |
| L7 | OG-bilde komprimeres, Organization-schema berikes | S4 |
| L8 | Eyebrow/stats-etiketter: størrelse + kontrast | D5 |
| L9 | Prosessbilder: mindre blur eller gradient | B3 |
| L10 | Prisforventnings-blokk, kontor-historier, foto på tjenestesiden | I4, I2, B2 |
| L11 | «Stavanger/Forus»-avklaring | I3 |

---

### Målte fakta (referanse)

| Måling | Verdi |
|--------|-------|
| JS totalt over wire (produksjon) | 190,7 KB |
| Størst JS-chunk (framer-motion m.m.) | 53 KB |
| Bilder: alle innholdsbilder | WebP (verifisert) |
| public/ totalt | 11 MB (hvorav ~5 MB useriverte jpg-duplikater) |
| opengraph-image.png | 458 KB |
| Kontrast #8BC0BE på hvit | 2,02:1 (AA stor tekst krever 3:1) |
| Kontrast #4C8E93 på hvit | 3,75:1 (OK stor, feiler liten) |
| Kontrast #4C8E93 på #8BC0BE | 1,85:1 |
| Kontrast #E8884C på hvit | 2,61:1 |
| Kontrast ink/60 på hvit | 4,35:1 (feiler liten tekst så vidt) |
| TypeScript | `tsc --noEmit` uten feil |
| Alt-tekster | 0 mangler (alle sider) |
| Metadata | Unik title/description/canonical på alle 8 sider |
