import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FlydIcon from '@/components/FlydIcon';
import ContactForm from '@/components/ContactForm';
import KopierTekst from '@/components/KopierTekst';
import NumberedList from '@/components/NumberedList';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Kontorkart from '@/components/Kontorkart';
import JsonLd from '@/components/JsonLd';
import { offices, officeLabel } from '@/data/offices';
import { etterSending } from '@/data/kontaktskjema';

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Hjem', item: 'https://www.flyd.no/' },
    { '@type': 'ListItem', position: 2, name: 'Kontakt', item: 'https://www.flyd.no/kontakt/' },
  ],
};

export const metadata: Metadata = pageMetadata({
  absoluteTitle: 'Kontakt Flyd – 6 kontorer i Sør-Vest-Norge',
  description:
    'Ta kontakt med Flyd. Fortell oss hva du trenger hjelp med, så finner vi riktig person hos oss.',
  path: '/kontakt/',
});

export default function KontaktPage() {
  const contactLink =
    'font-display text-[22px] font-semibold text-flyd-skog decoration-flyd-teal decoration-2 underline-offset-[6px] transition-colors hover:text-flyd-petrol hover:underline';
  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="sand" size="lg" className="pt-12 md:pt-16" flyt>
        <Container>
          {/* Skjemaet spenner over begge radene i høyre spalte på desktop. På mobil
              kommer det rett etter innledningen, og «Hva skjer når du sender?» etter skjemaet. */}
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-14">
            <div className="lg:col-span-5">
              <Eyebrow>Kontakt</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                La oss ta en prat.
              </h1>
              <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
                Fortell oss hva du trenger hjelp med, så finner vi riktig person
                hos oss.
              </p>

              <dl className="mt-12 border-t border-flyd-linje-sand">
                {/* Ikonet ligger i <dt>: en <div> i <dl> kan bare ha <dt>/<dd> som barn. */}
                <div className="relative border-b border-flyd-linje-sand py-6 pl-11">
                  <dt className="text-[15px] text-flyd-skifer">
                    <FlydIcon name="epost" className="absolute left-0 top-7 h-6 w-6 text-flyd-teal" />
                    E-post
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a href="mailto:support@flyd.no" className={contactLink}>
                      support@flyd.no
                    </a>
                    <KopierTekst tekst="support@flyd.no" etikett="Kopier e-postadressen" />
                  </dd>
                </div>
                <div className="relative border-b border-flyd-linje-sand py-6 pl-11">
                  <dt className="text-[15px] text-flyd-skifer">
                    <FlydIcon name="telefon" className="absolute left-0 top-7 h-6 w-6 text-flyd-teal" />
                    Telefon
                  </dt>
                  <dd className="mt-1">
                    <a href="tel:+4748019958" className={contactLink}>
                      +47 480 19 958
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7 lg:row-span-2">
              <div className="rounded-kort bg-flyd-lysmint p-6 sm:p-7 md:p-10">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-[22px] font-semibold">Hva skjer når du sender?</h2>
              <NumberedList items={etterSending} className="mt-6" />
            </div>
          </div>
        </Container>
      </Section>

      {/* KONTORER – adressene ved siden av kartet */}
      <Section tone="lysmint" id="kontorer">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5" data-reveal>
              <Eyebrow>Kontorer</Eyebrow>
              <h2 className="mt-5 font-display text-display-lg font-semibold">
                Møt oss der du er.
              </h2>
              <ul className="mt-8 border-t border-flyd-linje-mint">
                {offices.map((o) => (
                  <li key={o.slug}>
                    <Link
                      href={`/kontor/${o.slug}/`}
                      className="group flex items-center justify-between gap-4 border-b border-flyd-linje-mint py-4"
                    >
                      <span>
                        <span className="block font-display text-[17px] font-semibold text-flyd-skog transition-colors group-hover:text-flyd-petrol">
                          {officeLabel(o)}
                        </span>
                        <span className="mt-0.5 block text-[15px] text-flyd-skifer">
                          {[o.street, o.postal].filter(Boolean).join(', ')}
                        </span>
                      </span>
                      <ArrowRight
                        className="h-5 w-5 flex-shrink-0 text-flyd-teal transition-transform duration-200 group-hover:translate-x-1"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Kontorkart tone="lysmint" className="lg:col-span-7 lg:pt-2" />
          </div>
        </Container>
      </Section>
    </>
  );
}
