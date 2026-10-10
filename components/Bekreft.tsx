import clsx from 'clsx';

/**
 * Synlig plassholder for innhold som mangler godkjenning. Brukes bare på
 * utkast, som aldri bygges for produksjon (lib/utkast.ts). Byggesjekken
 * (scripts/sjekk-bekreft.mjs) stopper publisering om den likevel slipper ut.
 */
export default function Bekreft({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={clsx(
        'rounded-flis border-2 border-dashed border-flyd-rust/60 bg-flyd-sand px-4 py-3 text-[15px] font-medium text-flyd-skog',
        className,
      )}
    >
      [BEKREFT: {children}]
    </p>
  );
}

/** Banner øverst på sider som ikke er publisert ennå. */
export function UtkastBanner() {
  return (
    <div className="bg-flyd-korall px-4 py-2 text-center text-[14px] font-medium text-flyd-skog">
      Utkast – siden vises bare lokalt og på forhåndsvisninger, ikke på flyd.no.
    </div>
  );
}
