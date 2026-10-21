import Link from 'next/link';
import Container from './Container';
import ConsentLink from './ConsentLink';
import FlydLogo from './FlydLogo';
import Eyebrow from './Eyebrow';
import { offices } from '@/data/offices';

// Floyd (intern assistent for ansatte) bor på egen adresse som settes ved
// deploy. Er variabelen ikke satt, rendres ingen lenke.
const floydUrl = process.env.NEXT_PUBLIC_FLOYD_URL?.trim();

const lenke = 'transition-colors hover:text-flyd-mint';

const flydLenker = [
  { href: '/', label: 'Forside' },
  { href: '/tjenester', label: 'Tjenester' },
  { href: '/kontor', label: 'Kontorer' },
  { href: '/artikler/', label: 'Artikler' },
  { href: '/om-flyd', label: 'Om Flyd' },
];

const komIGangLenker = [
  { href: '/bytte-regnskapsforer/', label: 'Bytte regnskapsfører' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];

function Lenkeliste({ tittel, lenker }: { tittel: string; lenker: { href: string; label: string }[] }) {
  return (
    <nav aria-label={tittel}>
      <Eyebrow as="h3" tone="dark">
        {tittel}
      </Eyebrow>
      <ul className="mt-5 space-y-3 text-[15px] text-flyd-sand">
        {lenker.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={lenke}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="on-dark border-t border-flyd-sand/10 bg-flyd-skog text-flyd-sand">
      <Container className="py-20">
        {/* Mobil: logo, de to lenkekolonnene side om side, så kontorene.
            Nettbrett: logo over, tre kolonner under. Desktop: fire kolonner. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12 md:gap-12">
          <div className="col-span-2 md:col-span-12 lg:col-span-4">
            <Link href="/" aria-label="Flyd – til forsiden" className="inline-block">
              <FlydLogo className="-ml-2.5 h-16 w-auto text-flyd-sand" />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-flyd-dempet">
              Et kompetansehus for økonomi og teknologi. Regnskap, revisjon,
              rådgivning, programvare og integrasjoner.
            </p>
            <div className="mt-8 space-y-1.5 text-[15px] text-flyd-dempet">
              <div>
                <a href="tel:+4748019958" className="transition-colors hover:text-flyd-mint">
                  +47 480 19 958
                </a>
              </div>
              <div>
                <a href="mailto:support@flyd.no" className="transition-colors hover:text-flyd-mint">
                  support@flyd.no
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/flyd-as/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Flyd på LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-pille border border-flyd-mint/50 text-flyd-sand transition-colors duration-200 hover:border-flyd-mint hover:bg-flyd-mint hover:text-flyd-skog active:bg-flyd-sand"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/flyd.no"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Flyd på Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-pille border border-flyd-mint/50 text-flyd-sand transition-colors duration-200 hover:border-flyd-mint hover:bg-flyd-mint hover:text-flyd-skog active:bg-flyd-sand"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 22v-8.5h2.86l.43-3.32H13.5V8.07c0-.96.27-1.62 1.65-1.62h1.76V3.48c-.3-.04-1.35-.13-2.56-.13-2.54 0-4.28 1.55-4.28 4.39v2.44H7.2v3.32h2.87V22h3.43z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Lenkeliste tittel="Flyd" lenker={flydLenker} />
          </div>

          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <Lenkeliste tittel="Kom i gang" lenker={komIGangLenker} />
          </div>

          <nav aria-label="Kontorer" className="col-span-2 md:col-span-6 lg:col-span-4">
            <Eyebrow as="h3" tone="dark">
              Kontorer
            </Eyebrow>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2 text-[15px]">
              {offices.map((o) => (
                <li key={o.city} className="leading-relaxed">
                  <Link
                    href={`/kontor/${o.slug}/`}
                    className="font-medium text-flyd-sand transition-colors hover:text-flyd-mint"
                  >
                    {o.city}
                  </Link>
                  <br />
                  <span className="text-flyd-dempet">
                    {[o.street, o.postal].filter(Boolean).join(', ')}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Med lenkeraden blir bunnlinja for trang på nettbrett, så den legges i én rad først fra lg. */}
        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-flyd-sand/15 pt-8 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
            <p className="text-[14px] text-flyd-dempet">
              © {new Date().getFullYear()} Flyd AS. Alle rettigheter reservert.
            </p>
            <nav aria-label="Personvern og samtykke">
              <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-flyd-dempet">
                <li>
                  <Link href="/personvern" className={lenke}>
                    Personvern
                  </Link>
                </li>
                <li>
                  <ConsentLink className={lenke} />
                </li>
                {floydUrl && (
                  <li>
                    <a
                      href={floydUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Floyd – for ansatte i Flyd (åpnes i nytt vindu)"
                      className={lenke}
                    >
                      For ansatte
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
          <p className="text-[14px] text-flyd-dempet">
            Laget med omhu i Sør-Vest-Norge av{' '}
            <FlydLogo
              title="Flyd"
              className="inline-block h-[1.35em] w-auto align-[-0.33em]"
            />
          </p>
        </div>
      </Container>
    </footer>
  );
}
