import Eyebrow from './Eyebrow';
import KundehistorieKort from './KundehistorieKort';
import { TextLink } from './Button';
import { kundehistorierPath, type Kundehistorie } from '@/data/kundehistorier';

/**
 * Én kundehistorie løftet fram på forsiden, i egen seksjon etter «Hvorfor
 * Flyd»: kundens sitat i stort til venstre, og det vanlige kundehistoriekortet
 * (logo, tittel, ingress og lenke) til høyre. Uten sitat brukes ingressen.
 * Hvilken historie som vises, styres av `fremhevet` i data/kundehistorier.ts.
 *
 * Står på Lys mint, uten mørkt kort: seksjonen over er Petrol, og et mørkt
 * kort rett under kundelogoene ble for mye på ett sted (prøvd nov. 2026).
 */
export default function KundehistorieFremhevet({ h }: { h: Kundehistorie }) {
  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
      <figure className="m-0 lg:col-span-7" data-reveal>
        <Eyebrow as="h2">Hva kundene sier</Eyebrow>
        {h.sitat ? (
          <>
            <blockquote className="mt-8 border-l-4 border-flyd-korall pl-6 font-display text-[clamp(1.375rem,2.5vw,2.125rem)] font-medium leading-[1.3] text-flyd-skog md:pl-8">
              «{h.sitat.tekst}»
            </blockquote>
            <figcaption className="mt-8 pl-7 md:pl-9">
              <span className="block font-medium text-flyd-skog">{h.sitat.navn}</span>
              <span className="block text-[15px] text-flyd-skifer">{h.sitat.rolle}</span>
            </figcaption>
          </>
        ) : (
          <p className="mt-8 font-display text-[clamp(1.375rem,2.5vw,2.125rem)] font-medium leading-[1.3] text-flyd-skog">
            {h.ingress}
          </p>
        )}
      </figure>

      <div className="lg:col-span-5" data-reveal>
        <KundehistorieKort h={h} tone="sand" overskrift="h3" />
        <div className="mt-6">
          <TextLink href={kundehistorierPath}>Alle kundehistoriene</TextLink>
        </div>
      </div>
    </div>
  );
}
