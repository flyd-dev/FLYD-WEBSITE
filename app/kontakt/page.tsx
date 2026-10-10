import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FlydIcon from '@/components/FlydIcon';
import ContactForm from '@/components/ContactForm';
import OfficeCards from '@/components/OfficeCards';
import JsonLd from '@/components/JsonLd';
import { offices } from '@/data/offices';

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
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Eyebrow>Kontakt</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                La oss ta en prat.
              </h1>
              <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
                Fortell oss hva du trenger hjelp med, så finner vi riktig person
                hos oss. Vi svarer normalt innen én arbeidsdag.
              </p>

              <dl className="mt-12 border-t border-flyd-linje-sand">
                {/* Ikonet ligger i <dt>: en <div> i <dl> kan bare ha <dt>/<dd> som barn. */}
                <div className="relative border-b border-flyd-linje-sand py-6 pl-11">
                  <dt className="text-[15px] text-flyd-skifer">
                    <FlydIcon name="epost" className="absolute left-0 top-7 h-6 w-6 text-flyd-teal" />
                    E-post
                  </dt>
                  <dd className="mt-1">
                    <a href="mailto:support@flyd.no" className={contactLink}>
                      support@flyd.no
                    </a>
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
                <div className="relative border-b border-flyd-linje-sand py-6 pl-11">
                  <dt className="text-[15px] text-flyd-skifer">
                    <FlydIcon name="kunder" className="absolute left-0 top-7 h-6 w-6 text-flyd-teal" />
                    Org.nr.
                  </dt>
                  <dd className="mt-1 font-display text-[22px] font-semibold">
                    933 662 934 · Flyd AS
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-kort bg-flyd-lysmint p-7 md:p-10">
                <h2 className="font-display text-[28px] font-semibold">Send oss en melding</h2>
                <p className="mt-2 text-[15px] text-flyd-skifer">
                  Felt merket med <span className="text-flyd-petrol">*</span> er obligatoriske.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* KONTORER */}
      <Section tone="lysmint" id="kontorer">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Møt oss der du er.
            </h2>
          </div>
          <OfficeCards offices={offices} className="mt-12" />
        </Container>
      </Section>
    </>
  );
}
