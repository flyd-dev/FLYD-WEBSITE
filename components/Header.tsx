'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from './Button';
import FlydLogo from './FlydLogo';

const nav = [
  { href: '/tjenester', label: 'Tjenester' },
  { href: '/kontor', label: 'Kontorer' },
  { href: '/om-flyd', label: 'Om Flyd' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Aktiv også på undersider: /tjenester/regnskap/ markerer «Tjenester».
  const isActive = (href: string) => {
    const path = (pathname ?? '').replace(/\/+$/, '');
    const target = href.replace(/\/+$/, '');
    return path === target || path.startsWith(`${target}/`);
  };
  const openBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Åpen meny: fokus på lukkeknappen, Escape lukker, Tab holdes inne i draweren.
  useEffect(() => {
    if (!open) return;
    // Vent til visibility-transisjonen (200 ms) er ferdig før fokus flyttes.
    const focusTimer = window.setTimeout(
      () => closeBtnRef.current?.focus(),
      210,
    );
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        openBtnRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !drawerRef.current) return;
      const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header
        className={clsx(
          'sticky top-0 z-40 w-full border-b transition-[padding,background-color,border-color] duration-300',
          scrolled
            ? 'bg-flyd-sand/90 backdrop-blur-md border-flyd-linje-sand py-3'
            : 'bg-flyd-sand border-transparent py-5',
        )}
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between px-6 md:px-10">
          {/* Logoen er minst 64 px bred (designmanualen kap. 02). SVG-en har
              luft rundt ordmerket, så negativ marg retter den inn mot kanten. */}
          <Link href="/" aria-label="Flyd forside" className="-ml-1.5 flex items-center rounded-flis">
            <FlydLogo
              className={clsx(
                'w-auto text-flyd-teal transition-[height] duration-300',
                scrolled ? 'h-10' : 'h-11',
              )}
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Hovednavigasjon">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={clsx(
                  'rounded-sm text-[15px] font-medium underline-offset-[10px] decoration-2 transition-colors duration-200 hover:text-flyd-skog hover:underline hover:decoration-flyd-mint active:text-flyd-petrol',
                  isActive(item.href)
                    ? 'text-flyd-skog underline !decoration-flyd-teal'
                    : 'text-flyd-skifer',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/kontakt" variant="primary" className="!px-5 !py-2.5 !text-[15px]">
              Snakk med oss
            </ButtonLink>
          </div>

          <button
            type="button"
            ref={openBtnRef}
            aria-label="Åpne meny"
            aria-expanded={open}
            aria-controls="mobilmeny"
            onClick={() => setOpen(true)}
            className="md:hidden -mr-2 rounded-pille p-2 text-flyd-skog transition-colors hover:bg-flyd-lysmint active:bg-flyd-linje-mint"
          >
            <Menu className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* Mobile drawer – rendered as a sibling of <header> so it is not
          confined to the sticky header's stacking context on iOS Safari.
          Draweren dekker headeren (og burger-knappen), derfor har den sin
          egen lukkeknapp. `invisible` tar den ut av tab-rekkefølgen når lukket. */}
      <div
        id="mobilmeny"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Meny"
        className={clsx(
          'md:hidden fixed inset-0 z-50 bg-flyd-sand transition-[opacity,visibility] duration-200',
          open
            ? 'opacity-100 visible pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none',
        )}
      >
        <button
          type="button"
          ref={closeBtnRef}
          aria-label="Lukk meny"
          onClick={() => {
            setOpen(false);
            openBtnRef.current?.focus();
          }}
          className="absolute right-4 top-4 rounded-pille p-2 text-flyd-skog transition-colors hover:bg-flyd-lysmint active:bg-flyd-linje-mint"
        >
          <X className="h-6 w-6" strokeWidth={2} />
        </button>
        <div className="flex h-full flex-col px-6 pt-24 pb-12 overflow-y-auto">
          <FlydLogo className="absolute left-5 top-5 h-11 w-auto text-flyd-teal" />
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={clsx(
                'flex items-center justify-between border-b border-flyd-linje-sand py-4 font-display text-[28px] font-semibold tracking-[-0.01em] transition-colors active:text-flyd-petrol',
                isActive(item.href) ? 'text-flyd-skog' : 'text-flyd-skifer',
              )}
            >
              {item.label}
              {isActive(item.href) && (
                <span className="h-2.5 w-2.5 rounded-sm bg-flyd-korall" aria-hidden="true" />
              )}
            </Link>
          ))}
          <div className="mt-10 flex flex-col gap-3">
            <ButtonLink
              href="/kontakt"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Snakk med oss
            </ButtonLink>
            <ButtonLink
              href="tel:+4748019958"
              variant="secondary"
              external
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Ring +47 480 19 958
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
