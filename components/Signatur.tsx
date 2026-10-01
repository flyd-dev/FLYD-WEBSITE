import clsx from 'clsx';

/**
 * Signaturen «full flyd.» – «full» i kontur, «flyd.» fylt. Tegnes fra
 * originalfilen via CSS-maske (se .signatur i globals.css), alltid i Sand og
 * kun på Flyd-teal (designmanualen kap. 03). Bredden settes med className.
 */
export default function Signatur({ className }: { className?: string }) {
  return <span role="img" aria-label="full flyd." className={clsx('signatur', className)} />;
}
