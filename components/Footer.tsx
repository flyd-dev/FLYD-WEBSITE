import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { offices } from '@/data/offices';

export default function Footer() {
  return (
    <footer className="bg-flyd-ink text-flyd-paper">
      <Container className="py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" aria-label="Flyd — til forsiden" className="inline-block">
              <Image
                src="/brand/flyd-logo-white.png"
                alt="Flyd"
                width={935}
                height={445}
                className="h-20 w-auto -my-4 md:h-24 md:-my-5"
                priority={false}
              />
            </Link>
            <p className="mt-6 max-w-sm text-[15px] text-flyd-paper/70 leading-relaxed">
              Et kompetansehus for økonomi og teknologi. Regnskap, rådgivning,
              programvare og integrasjoner under samme tak.
            </p>
            <div className="mt-8 space-y-1.5 text-[14px] text-flyd-paper/70">
              <div>
                <a href="mailto:post@flyd.no" className="hover:text-flyd-teal">
                  post@flyd.no
                </a>
              </div>
              <div>Org.nr. 933 662 934</div>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/flyd-as/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Flyd på LinkedIn"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-flyd-paper/20 text-flyd-paper/70 transition-colors duration-200 hover:border-flyd-teal hover:text-flyd-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flyd-teal focus-visible:ring-offset-2 focus-visible:ring-offset-flyd-ink"
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-flyd-paper/20 text-flyd-paper/70 transition-colors duration-200 hover:border-flyd-teal hover:text-flyd-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flyd-teal focus-visible:ring-offset-2 focus-visible:ring-offset-flyd-ink"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 22v-8.5h2.86l.43-3.32H13.5V8.07c0-.96.27-1.62 1.65-1.62h1.76V3.48c-.3-.04-1.35-.13-2.56-.13-2.54 0-4.28 1.55-4.28 4.39v2.44H7.2v3.32h2.87V22h3.43z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-[12px] uppercase tracking-[0.22em] text-flyd-paper/60 font-medium">
              Navigasjon
            </h3>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><Link href="/" className="hover:text-flyd-teal">Forside</Link></li>
              <li><Link href="/tjenester" className="hover:text-flyd-teal">Tjenester</Link></li>
              <li><Link href="/om-flyd" className="hover:text-flyd-teal">Om Flyd</Link></li>
              <li><Link href="/karriere" className="hover:text-flyd-teal">Karriere</Link></li>
              <li><Link href="/kontakt" className="hover:text-flyd-teal">Kontakt</Link></li>
              <li><Link href="/personvern" className="hover:text-flyd-teal">Personvern</Link></li>
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-[12px] uppercase tracking-[0.22em] text-flyd-paper/60 font-medium">
              Kontorer
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 text-[14px] text-flyd-paper/80">
              {offices.map((o) => (
                <li key={o.city} className="leading-relaxed">
                  <span className="font-medium text-flyd-paper">{o.city}</span>
                  <br />
                  <span className="text-flyd-paper/60">
                    {o.street}, {o.postal}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse items-start justify-between gap-4 border-t border-flyd-paper/15 pt-8 md:flex-row md:items-center">
          <p className="text-[13px] text-flyd-paper/50">
            © {new Date().getFullYear()} Flyd AS. Alle rettigheter reservert.
          </p>
          <p className="text-[13px] text-flyd-paper/50">
            Laget med omhu i Sør-Vest-Norge av Flyd.
          </p>
        </div>
      </Container>
    </footer>
  );
}
