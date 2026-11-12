import Image from 'next/image';
import Eyebrow from './Eyebrow';
import { ButtonLink, TextLink } from './Button';
import { kundehistoriePath, kundehistorierPath, type Kundehistorie } from '@/data/kundehistorier';

/**
 * Én kundehistorie løftet fram (forsiden, under kundelogoene): kundens sitat i
 * stort på et Petrol-kort, med logoen, tittelen og lenke til hele historien og
 * til oversikten. Uten sitat brukes ingressen. Hvilken historie som vises,
 * styres av `fremhevet` i data/kundehistorier.ts.
 */
export default function KundehistorieFremhevet({ h }: { h: Kundehistorie }) {
  return (
    <article className="on-dark grid grid-cols-1 gap-10 rounded-bilde bg-flyd-petrol p-7 text-flyd-sand sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
      <figure className="m-0 lg:col-span-7">
        <Eyebrow tone="petrol">Kundehistorie · {h.kunde}</Eyebrow>
        {h.sitat ? (
          <>
            <blockquote className="mt-7 border-l-4 border-flyd-korall pl-6 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-[1.35] text-flyd-sand md:pl-8">
              «{h.sitat.tekst}»
            </blockquote>
            <figcaption className="mt-7 pl-7 md:pl-9">
              <span className="block font-medium text-flyd-sand">{h.sitat.navn}</span>
              <span className="block text-[15px] text-flyd-dempet">{h.sitat.rolle}</span>
            </figcaption>
          </>
        ) : (
          <p className="mt-7 font-display text-[clamp(1.25rem,2.2vw,1.875rem)] font-medium leading-[1.35] text-flyd-sand">
            {h.ingress}
          </p>
        )}
      </figure>

      <div className="flex flex-col lg:col-span-5">
        {/* Logoen på Sand, så den står som på kundens egne flater. */}
        <div className="flex aspect-[16/7] items-center justify-center rounded-kort bg-flyd-sand px-8">
          <Image
            src={h.logo.src}
            alt={h.logo.alt}
            width={240}
            height={96}
            sizes="240px"
            className="h-12 w-auto max-w-[60%] object-contain mix-blend-multiply md:h-14"
          />
        </div>
        <h3 className="mt-7 font-display text-[22px] font-semibold leading-[1.25] text-flyd-sand md:text-[24px]">
          {h.tittel}
        </h3>
        <p className="mt-3 text-[16px] leading-[1.6] text-flyd-dempet">{h.ingress}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-8">
          <ButtonLink href={kundehistoriePath(h)} variant="primary-dark" withArrow>
            Les historien
          </ButtonLink>
          <TextLink href={kundehistorierPath} tone="dark">
            Alle kundehistoriene
          </TextLink>
        </div>
      </div>
    </article>
  );
}
