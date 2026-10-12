import Container from './Container';
import Section from './Section';
import Eyebrow from './Eyebrow';
import Signatur from './Signatur';
import FlytLinjer from './FlytLinjer';
import { ButtonLink } from './Button';

type Action = { href: string; label: string; external?: boolean };

/**
 * Avslutning på en side (designmanualen kap. 03 og 09): Skog-flate med
 * kicker, overskrift og knapper – Korall som primær på mørk bunn – og
 * signaturen «full flyd.» på et Flyd-teal-kort. Signaturen er det siste
 * mottakeren ser før bunnteksten.
 */
export default function ClosingCta({
  kicker,
  title,
  text,
  primary = { href: '/kontakt', label: 'Snakk med oss' },
  secondary = { href: 'tel:+4748019958', label: 'Ring oss', external: true },
}: {
  kicker?: string;
  title: string;
  text?: string;
  primary?: Action;
  secondary?: Action | null;
}) {
  return (
    <Section tone="skog" size="lg" className="overflow-hidden">
      <FlytLinjer className="opacity-50" />
      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6" data-reveal>
            {kicker && <Eyebrow tone="dark">{kicker}</Eyebrow>}
            <h2 className="rull-gli mt-5 font-display text-display-lg font-semibold text-flyd-sand">
              {title}
            </h2>
            {text && (
              <p className="mt-6 max-w-xl text-[18px] leading-[1.65] text-flyd-dempet">
                {text}
              </p>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ButtonLink
                href={primary.href}
                variant="primary-dark"
                external={primary.external}
                withArrow
              >
                {primary.label}
              </ButtonLink>
              {secondary && (
                <ButtonLink
                  href={secondary.href}
                  variant="secondary-dark"
                  external={secondary.external}
                >
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="lg:col-span-6" data-reveal>
            <div className="flex aspect-[16/9] items-center justify-center rounded-bilde bg-flyd-teal px-10 lg:aspect-[5/3]">
              <Signatur className="w-[78%] max-w-[440px]" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
