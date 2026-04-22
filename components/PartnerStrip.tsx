import Image from 'next/image';
import { partnerLogos } from '@/data/partners';

export default function PartnerStrip() {
  return (
    <div className="-mx-4 overflow-x-auto md:mx-0 md:overflow-visible">
      <ul className="flex min-w-max items-center gap-10 px-4 md:min-w-0 md:justify-between md:gap-4 md:px-0 lg:gap-6">
        {partnerLogos.map((logo) => (
          <li
            key={logo.name}
            className="relative flex h-10 w-[120px] flex-shrink-0 items-center justify-center md:h-10 md:w-[110px] lg:h-11 lg:w-[125px]"
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
