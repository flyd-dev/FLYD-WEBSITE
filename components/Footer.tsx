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
              <div>Org.nr. 923 456 789</div>
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
