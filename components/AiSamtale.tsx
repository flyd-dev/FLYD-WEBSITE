import clsx from 'clsx';
import { Check } from 'lucide-react';

type Melding = { fra: 'du' | 'ai'; tekst: string; handling?: string };

/**
 * Illustrasjon av en AI-assistent på /tjenester/ai/ (ved siden av problemet): et Skog-kort med
 * samtalen som ekte tekst (ikke et bilde), så den leses opp og indekseres.
 * Det du skriver står i Petrol til høyre, svaret i Sand til venstre, og
 * «Godkjenn» viser at et menneske bestemmer. Står stille: ingen skriveeffekt.
 * Ingen tall eller kundedata i samtalen.
 */
export default function AiSamtale({
  etikett,
  meldinger,
  className,
}: {
  etikett: string;
  meldinger: Melding[];
  className?: string;
}) {
  return (
    <figure className={clsx('rounded-bilde bg-flyd-skog p-5 sm:p-7', className)}>
      <figcaption className="flex items-center gap-2.5 text-[13px] font-bold uppercase leading-[1.2] tracking-[0.12em] text-flyd-mint">
        <span aria-hidden="true" className="h-2 w-2 flex-shrink-0 rounded-[2px] bg-flyd-korall" />
        {/* Brytes bare ved tankestreken, ikke i «AI-assistent» på smale skjermer. */}
        <span>
          {etikett.split(' – ').map((del, i) => (
            <span key={del}>
              {i > 0 && ' – '}
              <span className="whitespace-nowrap">{del}</span>
            </span>
          ))}
        </span>
      </figcaption>
      <ol className="mt-6 space-y-3">
        {meldinger.map((m, i) => (
          <li
            key={i}
            className={clsx(
              'max-w-[88%] rounded-kort px-4 py-3 text-[15px] leading-[1.55] sm:text-[16px]',
              m.fra === 'du'
                ? 'ml-auto rounded-br-[4px] bg-flyd-petrol text-flyd-sand'
                : 'rounded-bl-[4px] bg-flyd-sand text-flyd-skog',
            )}
          >
            <span className="sr-only">{m.fra === 'du' ? 'Du: ' : 'AI-assistenten: '}</span>
            {m.tekst}
            {m.handling && (
              <span className="mt-3 flex">
                <span className="inline-flex items-center gap-1.5 rounded-pille bg-flyd-skog px-3.5 py-1.5 text-[14px] font-medium text-flyd-sand">
                  <Check aria-hidden="true" strokeWidth={2.5} className="h-3.5 w-3.5 text-flyd-mint" />
                  {m.handling}
                </span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
