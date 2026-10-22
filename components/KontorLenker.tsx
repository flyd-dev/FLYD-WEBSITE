import Link from 'next/link';
import Eyebrow from '@/components/Eyebrow';
import { offices } from '@/data/offices';

/** «Økonomitjenester nær deg» (Irene 22.10.2026) med lenke til hver kontorside, hentet fra data/offices.ts. */
export default function KontorLenker({ className }: { className?: string }) {
  return (
    <nav aria-label="Økonomitjenester nær deg" className={className}>
      <Eyebrow>Økonomitjenester nær deg</Eyebrow>
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
