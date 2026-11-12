import { TextLink } from './Button';
import { kundehistoriePath, type Kundehistorie } from '@/data/kundehistorier';

/**
 * Én kundehistorie løftet fram på forsiden, rett under kundelogoene: bare
 * kundens sitat i stor skrift, navnet og en lenke til historien. Uten sitat
 * brukes ingressen. Hvilken historie som vises, styres av `fremhevet` i
 * data/kundehistorier.ts.
 *
 * Bevisst lett: ingen flate, logo, tittel eller knapper. Et mørkt kort med alt
 * dette ble rotete under logoene, og en egen seksjon lenger ned lå for langt
 * unna kundene og gjentok seg selv (begge prøvd nov. 2026).
 */
export default function KundehistorieFremhevet({ h }: { h: Kundehistorie }) {
  const tekst = h.sitat ? `«${h.sitat.tekst}»` : h.ingress;
  return (
    <figure className="m-0 max-w-4xl">
      <blockquote className="border-l-4 border-flyd-korall pl-6 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-[1.35] text-flyd-skog md:pl-8">
        {tekst}
      </blockquote>
      <figcaption className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-3 pl-7 md:pl-9">
        <span className="text-[16px] text-flyd-skifer">
          {h.sitat ? (
            <>
              <span className="font-medium text-flyd-skog">{h.sitat.navn}</span>, {h.sitat.rolle}
            </>
          ) : (
            <span className="font-medium text-flyd-skog">{h.kunde}</span>
          )}
        </span>
        <TextLink href={kundehistoriePath(h)}>Les historien</TextLink>
      </figcaption>
    </figure>
  );
}
