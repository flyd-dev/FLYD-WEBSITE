import Image from 'next/image';
import { partnerLogos } from '@/data/partners';

export default function PartnerStrip() {
  // Under md: rullbar stripe. Fra md: grid – to rader à fire på tablet, én rad
  // fra lg. Logoene krymper til cellen (maks 125 px) i stedet for å ha fast
  // bredde; med fast bredde stakk lista utenfor containeren på 768–1247 px
  // og ga hele siden horisontal scroll.
  return (
    <div className="-mx-4 overflow-x-auto md:mx-0 md:overflow-visible">
      <ul className="flex min-w-max items-center gap-10 px-4 md:grid md:min-w-0 md:grid-cols-4 md:gap-x-6 md:gap-y-8 md:px-0 lg:grid-cols-8">
        {partnerLogos.map((logo) => (
          <li
            key={logo.name}
            className="relative flex h-10 w-[120px] flex-shrink-0 items-center justify-center md:w-full md:max-w-[125px] md:justify-self-center lg:h-11"
            title={logo.name}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="140px"
              className="object-contain opacity-70 grayscale transition-[opacity,filter] duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
