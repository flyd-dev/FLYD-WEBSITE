'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

type Punkt = { id: string; tekst: string };

// Seksjoner som ikke hører hjemme i innholdsfortegnelsen (Petrol-boksen nederst).
const UTENFOR = new Set(['flyd']);

/**
 * «På denne siden» for artiklene (fra «Scroll Spy» og «Table of Contents» på
 * 21st.dev, tegnet om etter manualen). Står fast i den tomme høyrespalten på
 * brede skjermer (xl) og markerer seksjonen du leser. Lenkene bygges fra
 * seksjonene med id og kickeren over overskriften, så hver artikkel trenger
 * ingen egen liste. Vises bare mens du er inne i artikkelteksten, ikke over
 * toppen eller de mørke flatene nederst.
 */
export default function ArtikkelInnhold() {
  const pathname = usePathname();
  const [punkter, setPunkter] = useState<Punkt[]>([]);
  const [aktiv, setAktiv] = useState<string | null>(null);
  const [synlig, setSynlig] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const seksjoner = Array.from(document.querySelectorAll<HTMLElement>('main section[id]')).filter(
      (s) => !UTENFOR.has(s.id) && s.querySelector('h2'),
    );
    // Kickeren er kortere enn overskriften; uten kicker brukes overskriften.
    const liste = seksjoner.map((s) => ({
      id: s.id,
      tekst: (s.querySelector('p.uppercase, span.uppercase')?.textContent || s.querySelector('h2')!.textContent || '').trim(),
    }));
    setPunkter(liste.length >= 3 ? liste : []);
    if (liste.length < 3) return;

    let ramme = 0;
    const oppdater = () => {
      ramme = 0;
      const linje = 160;
      let gjeldende: string | null = null;
      for (const s of seksjoner) if (s.getBoundingClientRect().top <= linje) gjeldende = s.id;
      const forste = seksjoner[0].getBoundingClientRect();
      const siste = seksjoner[seksjoner.length - 1].getBoundingClientRect();
      setAktiv(gjeldende ?? seksjoner[0].id);
      // Skjules før den når den mørke flaten etter siste seksjon, så den aldri ligger oppå den.
      const navBunn = navRef.current?.getBoundingClientRect().bottom ?? linje;
      setSynlig(forste.top < window.innerHeight * 0.6 && siste.bottom > navBunn + 24);
    };
    const vedRulling = () => {
      if (!ramme) ramme = requestAnimationFrame(oppdater);
    };
    oppdater();
    window.addEventListener('scroll', vedRulling, { passive: true });
    window.addEventListener('resize', vedRulling);
    return () => {
      window.removeEventListener('scroll', vedRulling);
      window.removeEventListener('resize', vedRulling);
      if (ramme) cancelAnimationFrame(ramme);
    };
  }, [pathname]);

  if (!punkter.length) return null;

  return (
    <nav
      ref={navRef}
      aria-label="Innhold i artikkelen"
      className={clsx(
        'fixed top-32 z-20 hidden w-[13.5rem] transition-[opacity,visibility] duration-300 motion-reduce:transition-none xl:block',
        'right-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]',
        synlig ? 'visible opacity-100' : 'invisible opacity-0',
      )}
    >
      <p className="font-body text-[12px] font-bold uppercase tracking-[0.12em] text-flyd-skifer">På denne siden</p>
      <ol className="mt-4 border-l-2 border-flyd-linje-mint">
        {punkter.map((p) => {
          const er = p.id === aktiv;
          return (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                aria-current={er ? 'true' : undefined}
                className={clsx(
                  '-ml-[2px] block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors duration-200',
                  er
                    ? 'border-flyd-teal font-medium text-flyd-skog'
                    : 'border-transparent text-flyd-skifer hover:border-flyd-linje-sand hover:text-flyd-skog',
                )}
              >
                {p.tekst}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
