import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import { UtkastBanner } from '@/components/Bekreft';
import { VariantDelt, VariantSporsmal, VariantStram } from '@/components/designlab/KontaktVarianter';
import { visUtkast } from '@/lib/utkast';

/**
 * Tre varianter av kontaktskjemaet (/designlab/kontakt/) å velge mellom.
 * Bare utkast: finnes ikke i produksjonsbygget, står ikke i sitemap, noindex.
 * Ingenting sendes fra skjemaene her.
 */
export const metadata: Metadata = {
  title: 'Kontaktskjema – varianter · Flyd',
  robots: { index: false, follow: false },
};

const varianter = [
  {
    id: 'a',
    navn: 'A – Rolig og stram',
    tekst: 'Mørkt kort, temaene som små piller øverst og feltene med understrek under hverandre. Det tryggeste valget.',
    Skjema: VariantStram,
  },
  {
    id: 'c',
    navn: 'C – Spørsmålet som overskrift',
    tekst: 'Det beste fra samtaleskjemaet, nedtonet: bare åpningen er en setning du fullfører, resten er vanlige felt.',
    Skjema: VariantSporsmal,
  },
] as const;

export default function KontaktVarianterPage() {
  if (!visUtkast) notFound();

  return (
    <>
      <UtkastBanner />

      <Section tone="sand" className="pt-12 md:pt-16">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Designlab</Eyebrow>
            <h1 className="mt-5 font-display text-display-xl font-semibold">Tre kontaktskjemaer.</h1>
            <p className="mt-8 max-w-2xl font-display text-ingress font-medium text-flyd-skifer">
              Prøv dem gjerne: skriv, velg tema og trykk «Send melding». Ingenting sendes herfra. Varianten du velger,
              flyttes inn på /kontakt med den ekte innsendingen.
            </p>
          </div>
        </Container>
      </Section>

      {varianter.slice(0, 1).map(({ id, navn, tekst, Skjema }) => (
        <Section key={id} tone="lysmint" id={`variant-${id}`}>
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Eyebrow>Variant</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">{navn}</h2>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-flyd-skifer">{tekst}</p>
              </div>
              <div className="lg:col-span-7">
                <Skjema />
              </div>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="sand" id="variant-b">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Variant</Eyebrow>
            <h2 className="mt-5 font-display text-display-md font-semibold">B – Delt kort</h2>
            <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-flyd-skifer">
              Alt om å ta kontakt i én boks: telefon, e-post og svartid på Skog til venstre, skjemaet til høyre. Da
              trenger /kontakt ingen egen venstrespalte.
            </p>
          </div>
          <div className="mt-10">
            <VariantDelt />
          </div>
        </Container>
      </Section>
      {varianter.slice(1).map(({ id, navn, tekst, Skjema }) => (
        <Section key={id} tone="lysmint" id={`variant-${id}`}>
          <Container>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Eyebrow>Variant</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">{navn}</h2>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-flyd-skifer">{tekst}</p>
              </div>
              <div className="lg:col-span-7">
                <Skjema />
              </div>
            </div>
          </Container>
        </Section>
      ))}

    </>
  );
}
