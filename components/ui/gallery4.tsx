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
          <div className="max-w-2xl">
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <h2 className="mt-5 font-display text-display-lg font-semibold">
              {title}
            </h2>
          </div>
          <div className="hidden shrink-0 items-center gap-2 md:flex">
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Forrige"
              className="h-11 w-11 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.75} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={() => carouselApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Neste"
              className="h-11 w-11 rounded-full"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.75} />
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
                  <article className="group relative h-[460px] w-full overflow-hidden rounded-lg shadow-[0_24px_48px_-24px_rgba(31,31,31,0.35),0_8px_16px_-12px_rgba(76,142,147,0.35)] lg:h-[500px]">
                    {/* Lightly blurred background — people should still be recognisable */}
                    <div
                      className="absolute inset-0 scale-110 bg-cover bg-center blur-[2px] transition-transform duration-[900ms] ease-out group-hover:scale-[1.15]"
                      style={{ backgroundImage: `url(${item.background})` }}
                      aria-hidden="true"
                    />
                    {/* Very light wash so the photo still reads */}
                    <div
                      className="absolute inset-0 bg-flyd-ink/10"
                      aria-hidden="true"
                    />
                    {/* Strong bottom gradient, concentrated under the text block */}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-flyd-ink from-0% via-flyd-ink/80 via-35% to-transparent to-65%"
                      aria-hidden="true"
                    />
                    {/* Teal accent wash at bottom */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#4C8E93]/35 via-[#4C8E93]/8 to-transparent mix-blend-overlay"
                      aria-hidden="true"
                    />

                    {/* Content */}
                    <div className="relative flex h-full flex-col justify-between p-7 text-flyd-paper md:p-8">
                      <div className="flex items-center justify-between">
                        {Icon ? (
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-flyd-paper/15 ring-1 ring-inset ring-flyd-paper/30 backdrop-blur-md">
                            <Icon
                              className="h-[22px] w-[22px] text-flyd-paper"
                              strokeWidth={1.5}
                            />
                          </div>
                        ) : (
                          <span />
                        )}
                        <span className="text-[11px] uppercase tracking-[0.22em] text-flyd-paper/85">
                          0{items.indexOf(item) + 1}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-display text-[26px] font-semibold leading-[1.15] tracking-tight md:text-[28px]">
                          {item.title}
                        </h3>
                        <p className="mt-4 text-[14.5px] leading-[1.7] text-flyd-paper/90">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Subtle inner border */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-flyd-paper/10"
                      aria-hidden="true"
                    />
                  </article>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-[6px] rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'w-8 bg-flyd-teal-dark'
                  : 'w-[6px] bg-flyd-ink/20 hover:bg-flyd-ink/40'
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Gå til slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Gallery4 };
