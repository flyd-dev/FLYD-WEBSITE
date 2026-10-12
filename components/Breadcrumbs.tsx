import Link from 'next/link';
import clsx from 'clsx';
import { ChevronRight } from 'lucide-react';
import JsonLd from './JsonLd';
import { siteUrl } from '@/lib/seo';

export type Crumb = { name: string; href: string };

/**
 * Brødsmuler på alle undersider: synlig sti og BreadcrumbList i samme
 * komponent, så de aldri kommer i utakt. «Hjem» legges til automatisk.
 * Siste ledd er siden du står på (aria-current, ikke lenke).
 */
export default function Breadcrumbs({
  items,
  tone = 'light',
  className,
}: {
  items: Crumb[];
  tone?: 'light' | 'dark';
  className?: string;
}) {
  const all: Crumb[] = [{ name: 'Hjem', href: '/' }, ...items];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: all.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${siteUrl}${c.href}`,
    })),
  };
  const dark = tone === 'dark';

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav aria-label="Brødsmuler" className={clsx('text-[14px]', className)}>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="inline-flex items-center gap-1.5">
                {last ? (
                  <span
                    aria-current="page"
                    className={dark ? 'text-flyd-dempet' : 'text-flyd-skifer'}
                  >
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={c.href}
                      className={clsx(
                        'rounded-[4px] font-medium underline decoration-2 underline-offset-4 transition-colors duration-200',
                        dark
                          ? 'text-flyd-sand decoration-flyd-mint/50 hover:decoration-flyd-mint'
                          : 'text-flyd-petrol decoration-flyd-teal/40 hover:decoration-flyd-teal',
                      )}
                    >
                      {c.name}
                    </Link>
                    <ChevronRight
                      className={clsx('h-3.5 w-3.5', dark ? 'text-flyd-mint' : 'text-flyd-teal')}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
