import Image from 'next/image';
import { customerLogos } from '@/data/logos';

export default function LogoMarquee() {
  const doubled = [...customerLogos, ...customerLogos];
  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-flyd-paper to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-flyd-paper to-transparent z-10" />

      <div
        className="flex w-max animate-marquee items-center"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        {doubled.map((logo, i) => (
          <div
            key={`${logo.name}-${i}`}
            className="relative h-14 w-36 flex-shrink-0 mr-16 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-[filter,opacity] duration-300"
            title={logo.name}
          >
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="144px"
              className="object-contain"
              priority={i < 6}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
