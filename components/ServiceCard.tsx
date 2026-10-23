import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import { ServiceTile, type ServiceIconName, type ServiceTone } from './ServiceIcon';

/**
 * Inne i et bredt kort: samme kolonner som rutenettet rundt (2 på nettbrett, 3 på
 * desktop), så flisen blir like bred som flisene i kortene over. Mellomrommet er
 * rutenettets gap (16/20 px) pluss kortenes innerkant (2 × 12 px).
 */
export const bredtKortKolonner = 'sm:grid sm:grid-cols-2 sm:gap-x-10 md:gap-x-11 lg:grid-cols-3';

/**
 * Tjenestekort (designmanualen kap. 06 «Kort med ikon»): Sand-kort på Lys
 * mint, radius 16 px, ingen skygger eller kantlinjer. Ikonet ligger på en
 * flis (radius 12 px) i Petrol, Flyd-teal eller Skog.
 *
 * `wide` gir et bredt kort over hele rutenettet, med flisen til venstre og
 * teksten ved siden av. Brukes for revisjon, som står i egen rad.
 *
 * Under sm er kortet en kompakt rad: liten flis til venstre, teksten ved siden
 * av. Ellers blir sju kort med høye fliser en lang vegg på mobil.
 */
export default function ServiceCard({
  title,
  text,
  icon,
  tone,
  href,
  wide = false,
}: {
  title: string;
  text: string;
  icon: ServiceIconName;
  tone: ServiceTone;
  href: string;
  wide?: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'lys group flex h-full flex-row items-start gap-4 rounded-kort bg-flyd-sand p-3 transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        wide ? bredtKortKolonner : 'sm:flex-col sm:gap-0',
      )}
    >
      <ServiceTile name={icon} tone={tone} className="h-16 w-16 shrink-0 rounded-flis sm:h-36 sm:w-full" />
      <div className={clsx('flex flex-1 flex-col pb-1 pr-1 pt-1 sm:px-3 sm:pb-3 sm:pt-5', wide && 'sm:pt-3 lg:col-span-2')}>
        <h3 className="font-display text-[18px] font-semibold leading-[1.2] text-flyd-skog sm:text-[20px]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-flyd-skifer">{text}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] sm:pt-5 font-medium text-flyd-petrol decoration-flyd-teal decoration-2 underline-offset-[6px] group-hover:underline">
          Les mer
          <ArrowRight
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={2}
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
}
