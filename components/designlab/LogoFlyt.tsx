import Image from 'next/image';
import { customerLogos } from '@/data/logos';

/**
 * Prototype (designlab): kundelogoene glir langs en flytlinje i stedet for på
 * en rett stripe. Idé fra «Marquee Along SVG Path» (fancycomponents.dev, MIT)
 * på 21st.dev. Ren CSS (offset-path), ingen JavaScript: hver logo får sin fase
 * med negativ animation-delay. Står stille ved hover og ved
 * prefers-reduced-motion – da blir logoene stående spredt langs linjen.
 * Nettlesere uten offset-path (Safari < 15.4) får en vanlig rad.
 */
const D = 'M -80 150 C 180 40, 420 250, 700 140 S 1180 30, 1480 130';
const VARIGHET = 60;

// Åtte logoer gir god avstand langs linjen (~210 px hver) uten at pillene overlapper.
const UTVALG = ['Lervig', 'Driftig', 'Sirdal Fjellpark', 'Pizzabakeren', 'Årring', "Leo's Lekeland", 'Bilstad Bygg', 'Ystepikene'];

const css = `
        @keyframes logoflyt { from { offset-distance: 0%; } to { offset-distance: 100%; } }
        .logoflyt-logo {
          position: absolute; top: 0; left: 0;
          offset-path: path('${D}');
          offset-rotate: 0deg;
          offset-anchor: 50% 50%;
          animation: logoflyt ${VARIGHET}s linear infinite;
        }
        .logoflyt:hover .logoflyt-logo { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .logoflyt-logo { animation-play-state: paused; } }
        @supports not (offset-path: path('M0 0 L1 1')) {
          .logoflyt-scene { display: flex; gap: 1rem; align-items: center; justify-content: center; flex-wrap: wrap; }
          .logoflyt-logo { position: static; animation: none; }
          .logoflyt-scene > svg { display: none; }
        }
      `;

export default function LogoFlyt() {
  const logoer = customerLogos.filter((l) => UTVALG.includes(l.name));
  return (
    <div className="logoflyt relative h-[150px] overflow-hidden sm:h-[260px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {/* dangerouslySetInnerHTML: ellers escapes fnuttene ulikt på server og klient (hydreringsfeil). */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="logoflyt-scene absolute left-1/2 top-0 h-[260px] w-[1400px] origin-top -translate-x-1/2 scale-[0.55] sm:scale-100" aria-hidden="true">
        <svg viewBox="0 0 1400 260" className="absolute inset-0 h-full w-full text-flyd-teal" focusable="false">
          <path d={D} fill="none" stroke="currentColor" strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" />
        </svg>
        {logoer.map((logo, i) => (
          <div
            key={logo.name}
            className="logoflyt-logo flex h-16 items-center justify-center rounded-pille bg-flyd-sand px-6"
            style={{ animationDelay: `${(-(i / logoer.length) * VARIGHET).toFixed(2)}s` }}
          >
            <Image
              src={logo.src}
              alt=""
              width={140}
              height={32}
              sizes="140px"
              // Logoene beveger seg inn og ut av synsfeltet, så lat lasting slår aldri til.
              loading="eager"
              className="h-8 w-auto max-w-[140px] object-contain opacity-70 mix-blend-multiply grayscale"
              draggable={false}
            />
          </div>
        ))}
      </div>
      <ul className="sr-only">
        {logoer.map((logo) => (
          <li key={logo.name}>{logo.name}</li>
        ))}
      </ul>
    </div>
  );
}
