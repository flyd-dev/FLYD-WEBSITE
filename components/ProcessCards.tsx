import Image from 'next/image';

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  imgSrc: string;
}

/**
 * Prosesskort: ekte Flyd-bilder med radius 24 px og Skog-overlay der teksten
 * står (designmanualen kap. 07). Teksten ligger nederst, så gradienten går
 * nedenfra med manualens stopp (95 % → 82 % → 20 %).
 */
export default function ProcessCards({ steps }: { steps: ProcessStep[] }) {
  return (
    <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5">
      {steps.map((step) => (
        <li
          key={step.n}
          className="group relative flex min-h-[340px] overflow-hidden rounded-bilde bg-flyd-skog md:min-h-[380px]"
        >
          <Image
            src={step.imgSrc}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <div className="overlay-skog-bunn absolute inset-0" aria-hidden="true" />
          <div className="relative mt-auto p-7 md:p-8">
            <span className="font-body text-[13px] font-bold uppercase tracking-[0.12em] text-flyd-korall">
              Steg {step.n}
            </span>
            <h3 className="mt-3 font-display text-[26px] font-semibold leading-tight text-flyd-sand">
              {step.title}
            </h3>
            <p className="mt-3 max-w-[36ch] text-[15px] leading-[1.6] text-flyd-sand/90">
              {step.body}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
