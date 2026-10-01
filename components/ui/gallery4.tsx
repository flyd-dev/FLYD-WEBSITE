'use client';

import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Users,
  Building2,
  HeartHandshake,
  Compass,
  type LucideIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Container from '@/components/Container';
import Eyebrow from '@/components/Eyebrow';

const iconMap: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  'graduation-cap': GraduationCap,
  users: Users,
  'building-2': Building2,
  'heart-handshake': HeartHandshake,
  compass: Compass,
};

export type Gallery4IconName = keyof typeof iconMap;

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  background: string;
  icon?: Gallery4IconName;
}

export interface Gallery4Props {
  eyebrow?: string;
  title: string;
  items: Gallery4Item[];
}

const Gallery4 = ({ eyebrow, title, items }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on('select', updateSelection);
    carouselApi.on('reInit', updateSelection);
    return () => {
      carouselApi.off('select', updateSelection);
      carouselApi.off('reInit', updateSelection);
    };
  }, [carouselApi]);

  return (
    <div className="w-full">
      <Container>
        <div className="flex items-end justify-between gap-8" data-reveal>
          <div className="max-w-3xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {title}
            </h2>
          </div>
          {/* Pilene vises fra sm og opp; på mobil sveiper man (prikkene viser posisjon). */}
          <div className="hidden shrink-0 items-center gap-2 sm:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Forrige"
              className="h-11 w-11"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Neste"
              className="h-11 w-11"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </Button>
          </div>
        </div>
      </Container>

      <div className="mt-12 w-full md:mt-14">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              '(max-width: 768px)': { dragFree: true },
            },
          }}
        >
          <CarouselContent className="ml-0 px-6 md:px-10 lg:px-[max(2.5rem,calc(50vw-620px))]">
            {items.map((item) => {
              const Icon = item.icon ? iconMap[item.icon] : undefined;
              return (
                <CarouselItem
                  key={item.id}
                  className="max-w-[320px] pl-5 lg:max-w-[380px]"
                >
                  <article className="group relative h-[460px] w-full overflow-hidden rounded-bilde bg-flyd-skog lg:h-[500px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                      style={{ backgroundImage: `url(${item.background})` }}
                      aria-hidden="true"
                    />
                    {/* Overlay for tekst på bilde (designmanualen kap. 07). */}
                    <div className="overlay-skog-bunn absolute inset-0" aria-hidden="true" />

                    <div className="relative flex h-full flex-col justify-between p-7 text-flyd-sand md:p-8">
                      <div className="flex items-center justify-between">
                        {Icon ? (
                          <div className="flex h-12 w-12 items-center justify-center rounded-flis bg-flyd-skog/70">
                            <Icon className="h-6 w-6 text-flyd-mint" strokeWidth={2} aria-hidden="true" />
                          </div>
                        ) : (
                          <span />
                        )}
                        <span className="rounded-pille bg-flyd-skog px-3 py-1.5 font-display text-[15px] font-semibold tabular-nums text-flyd-korall">
                          0{items.indexOf(item) + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-[26px] font-semibold leading-[1.15] md:text-[28px]">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-[15px] leading-[1.6] text-flyd-sand/90">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Dots – visuelt små, men med ≥24px klikkflate via padding */}
        <div className="mt-8 flex justify-center">
          {items.map((_, index) => (
            <button
              key={index}
              className="group/dot p-2.5"
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Gå til kort ${index + 1}`}
              aria-current={currentSlide === index ? 'true' : undefined}
            >
              <span
                className={`block h-[6px] rounded-pille transition-[width,background-color] duration-300 ${
                  currentSlide === index
                    ? 'w-8 bg-flyd-teal'
                    : 'w-[6px] bg-flyd-skog/25 group-hover/dot:bg-flyd-skog/50'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Gallery4 };
