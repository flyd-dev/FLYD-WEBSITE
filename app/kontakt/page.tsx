import type { Metadata } from 'next';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import ContactForm from '@/components/ContactForm';
import { offices } from '@/data/offices';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Ta kontakt med Flyd. Fortell oss hva du trenger hjelp med, så finner vi riktig person hos oss.',
};

export default function KontaktPage() {
  return (
    <>
      <Section tone="paper" size="lg" className="pt-20 md:pt-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Eyebrow tone="teal">Kontakt</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                La oss ta en prat.
              </h1>
              <p className="mt-8 text-[17px] leading-[1.8] text-flyd-ink/80">
                Fortell oss hva du trenger hjelp med, så finner vi riktig person
                hos oss. Vi svarer normalt innen én arbeidsdag.
              </p>

              <dl className="mt-12 space-y-6 border-t border-flyd-ink/15">
                <div className="flex items-start gap-5 border-b border-flyd-ink/15 py-6">
                  <Mail className="h-5 w-5 text-flyd-teal-dark mt-1" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.22em] text-flyd-ink/55">
                      E-post
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="mailto:post@flyd.no"
                        className="font-display text-xl font-semibold hover:text-flyd-teal-dark"
                      >
                        post@flyd.no
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-5 border-b border-flyd-ink/15 py-6">
                  <Phone className="h-5 w-5 text-flyd-teal-dark mt-1" strokeWidth={1.5} />
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.22em] text-flyd-ink/55">
                      Sentralbord
                    </dt>
                    <dd className="mt-1">
                      <a
                        href="tel:+4748019958"
                        className="font-display text-xl font-semibold hover:text-flyd-teal-dark"
                      >
                        +47 480 19 958
                      </a>
                    </dd>
                  </div>
                </div>
                <div className="flex items-start gap-5 py-6">
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-flyd-ink/55">
                    Org.nr
                  </div>
                  <div className="font-display text-lg font-semibold">
                    923 456 789 · Flyd AS
                  </div>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-flyd-ink/15 bg-flyd-paper p-8 md:p-10">
                <h2 className="font-display text-2xl font-semibold">
                  Send oss en melding
                </h2>
                <p className="mt-2 text-[14px] text-flyd-ink/65">
                  Felt merket med <span className="text-flyd-teal-dark">*</span>{' '}
                  er obligatoriske.
                </p>
                <div className="mt-8">
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* OFFICES */}
      <Section tone="teal-soft" id="kontorer">
        <Container>
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Kontorer</Eyebrow>
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              Møt oss der du er.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-[1px] bg-flyd-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {offices.map((o) => (
              <a
                key={o.city}
                href={o.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                className="group relative bg-flyd-paper p-7 md:p-8 transition-colors duration-200 hover:bg-[#F2F7F7]"
              >
                <div className="flex items-start justify-between">
                  <MapPin
                    className="h-5 w-5 text-flyd-teal-dark"
                    strokeWidth={1.75}
                  />
                  <ArrowUpRight
                    className="h-5 w-5 text-flyd-ink/30 transition-colors group-hover:text-flyd-ink"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {o.city} <span className="text-flyd-ink/40">·</span>{' '}
                  <span className="text-flyd-teal-dark">{o.name}</span>
                </h3>
                <p className="mt-3 text-[14px] text-flyd-ink/70 leading-relaxed">
                  {o.street}
                  <br />
                  {o.postal}
                </p>
                <div className="mt-5 text-[12px] uppercase tracking-[0.22em] text-flyd-ink/50 group-hover:text-flyd-ink">
                  Åpne i Google Maps →
                </div>
              </a>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
