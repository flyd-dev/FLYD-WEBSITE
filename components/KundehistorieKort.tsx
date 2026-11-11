import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { kundehistoriePath, type Kundehistorie } from '@/data/kundehistorier';

/**
 * Kort for én kundehistorie: logoen på en Sand-flis, bransje og sted som
 * kicker, tittel og ingress. Hele kortet er lenken. Logoene har hvit eller
 * gjennomsiktig bunn, så de legges på med `mix-blend-multiply`.
 *
 * `tone` er kortets egen farge: Lys mint på Sand-seksjoner (standard), Sand
 * på Lys mint-seksjoner. Flisen bak logoen får den andre.
 */
export default function KundehistorieKort({
  h,
  tone = 'lysmint',
  stor = false,
  overskrift: Overskrift = 'h2',
  priority = false,
  className,
}: {
  h: Kundehistorie;
  tone?: 'lysmint' | 'sand';
  /** Bredt kort (halv bredde på desktop): større tittel. */
  stor?: boolean;
  overskrift?: 'h2' | 'h3';
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={kundehistoriePath(h)}
      className={clsx(
        'lys lenkekort group flex h-full flex-col rounded-kort p-3',
        tone === 'sand' ? 'bg-flyd-sand hover:bg-flyd-linje-sand' : 'bg-flyd-lysmint hover:bg-flyd-linje-mint',
        className,
      )}
    >
      <div
        className={clsx(
          'relative flex aspect-[16/9] items-center justify-center rounded-flis px-8 sm:aspect-[16/7]',
          tone === 'sand' ? 'bg-flyd-lysmint' : 'bg-flyd-sand',
        )}
      >
        <Image
          src={h.logo.src}
          alt={h.logo.alt}
          width={240}
          height={96}
          priority={priority}
          sizes="240px"
          className="h-12 w-auto max-w-[70%] object-contain mix-blend-multiply md:h-14"
        />
        {/* Vises bare lokalt og på forhåndsvisninger – utkast bygges aldri for flyd.no. */}
        {h.status === 'utkast' && (
          <span className="absolute left-3 top-3 rounded-pille bg-flyd-korall px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.12em] text-flyd-skog">
            Utkast
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-6">
        <Eyebrow>
          {h.bransje} · {h.sted}
        </Eyebrow>
        <Overskrift
          className={clsx(
            'mt-4 font-display text-[22px] font-semibold leading-[1.25] text-flyd-skog',
            stor && 'lg:text-[28px] lg:leading-[1.2]',
          )}
        >
          {h.tittel}
        </Overskrift>
        <p className="mt-3 text-[16px] leading-[1.6] text-flyd-skifer">{h.ingress}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-[15px] font-medium text-flyd-petrol">
          Les historien
          <ArrowRight className="lenkekort-pil h-4 w-4" strokeWidth={2} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
