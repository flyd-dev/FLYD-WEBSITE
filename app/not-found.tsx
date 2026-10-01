import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import FlydLogo from '@/components/FlydLogo';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <Section tone="sand" size="lg" className="pt-12 md:pt-16">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex max-w-2xl flex-col items-start lg:col-span-7">
            <Eyebrow>404 · Siden finnes ikke</Eyebrow>
            <h1 className="mt-6 font-display text-display-xl font-semibold">
              Den siden har flydd sin vei.
            </h1>
            <p className="mt-8 font-display text-ingress font-medium text-flyd-petrol">
              Vi finner ikke siden du leter etter. Den kan ha blitt flyttet, eller
              aldri ha eksistert.
            </p>
            <p className="mt-5 text-[17px] leading-[1.7] text-flyd-skifer">
              Gå tilbake til forsiden, eller ta kontakt hvis det er noe vi kan
              hjelpe med.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <ButtonLink href="/" variant="primary" withArrow>
                Gå til forsiden
              </ButtonLink>
              <ButtonLink href="/kontakt" variant="secondary">
                Ta kontakt
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="flex aspect-[4/3] items-center justify-center rounded-bilde bg-flyd-lysmint">
              <FlydLogo title="Flyd" className="h-auto w-1/2 text-flyd-teal" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
