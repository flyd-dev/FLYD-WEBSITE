import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { offices } from '@/data/offices';

/** «Regnskapsfører nær deg» med lenke til hver kontorside, hentet fra data/offices.ts. */
export default function KontorLenker({ className }: { className?: string }) {
  return (
    <nav aria-label="Regnskapsfører nær deg" className={className}>
      <Eyebrow>Regnskapsfører nær deg</Eyebrow>
      <ul className="mt-4 flex flex-wrap gap-2">
        {offices.map((o) => (
          <li key={o.slug}>
            <Link
              href={`/kontor/${o.slug}/`}
              className="inline-flex rounded-pille bg-flyd-mint px-4 py-1.5 text-[15px] font-medium leading-6 text-flyd-skog decoration-flyd-skog decoration-2 underline-offset-4 transition-colors duration-200 hover:underline active:bg-flyd-lysmint"
            >
              {o.city}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
