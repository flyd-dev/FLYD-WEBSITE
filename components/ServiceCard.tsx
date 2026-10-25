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
 * Kortet er en kompakt rad på alle skjermer: liten flis til venstre, teksten
 * ved siden av. Høye fliser over hvert kort ble seks store, tomme Petrol-flater
 * på rad. `wide` gir et kort over hele rutenettet, for revisjon i egen rad.
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
      className="lys group flex h-full flex-row items-start gap-4 rounded-kort bg-flyd-sand p-3 transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:gap-5 sm:p-4"
    >
      <ServiceTile name={icon} tone={tone} className="h-16 w-16 shrink-0 rounded-flis sm:h-[72px] sm:w-[72px]" />
      <div className={clsx('flex flex-1 flex-col self-stretch pb-1 pr-1 pt-1', wide && 'lg:max-w-3xl')}>
        <h3 className="font-display text-[18px] font-semibold leading-[1.2] text-flyd-skog sm:text-[19px]">
          {title}
        </h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-flyd-skifer">{text}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] font-medium text-flyd-petrol decoration-flyd-teal decoration-2 underline-offset-[6px] group-hover:underline">
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
