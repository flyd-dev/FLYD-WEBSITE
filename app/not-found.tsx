import Link from 'next/link';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Wordmark from '@/components/Wordmark';
import { ButtonLink } from '@/components/Button';

export default function NotFound() {
  return (
    <Section tone="paper" size="lg" className="pt-20 md:pt-28">
      <Container>
        <div className="flex max-w-2xl flex-col items-start">
          <Wordmark variant="teal" size="lg" />
          <div className="mt-12 text-[14px] uppercase tracking-[0.22em] text-flyd-ink/55">
            404 · Siden finnes ikke
          </div>
          <h1 className="mt-4 font-display text-display-lg font-semibold">
            Den siden har flydd sin vei.
          </h1>
          <p className="mt-6 text-[17px] leading-[1.75] text-flyd-ink/75">
            Vi finner ikke siden du leter etter. Den kan ha blitt flyttet, eller
            aldri ha eksistert. Gå tilbake til forsiden, eller ta kontakt hvis
            det er noe vi kan hjelpe med.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/" variant="primary" withArrow>
              Gå til forsiden
            </ButtonLink>
            <ButtonLink href="/kontakt" variant="outline">
              Ta kontakt
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
