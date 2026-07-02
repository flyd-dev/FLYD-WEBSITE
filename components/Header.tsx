'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react';
import { ButtonLink } from './Button';

const nav = [
  { href: '/', label: 'Forside' },
  { href: '/tjenester', label: 'Tjenester' },
  { href: '/om-flyd', label: 'Om Flyd' },
  { href: '/karriere', label: 'Karriere' },
  { href: '/kontakt', label: 'Kontakt' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
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
            ? 'bg-flyd-paper/90 backdrop-blur-md border-flyd-ink/10 py-3'
            : 'bg-flyd-paper border-flyd-ink/0 py-5',
        )}
      >
        <div className="mx-auto flex w-full max-w-shell items-center justify-between px-6 md:px-10">
          <Link href="/" aria-label="Flyd forside" className="flex items-center">
            <Image
              src="/brand/flyd-logo-transparent.png"
              alt="Flyd"
              width={935}
              height={445}
              priority
              className={clsx(
                'w-auto transition-[height] duration-300',
                scrolled ? 'h-7' : 'h-9',
              )}
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Hovednavigasjon">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] text-flyd-ink/80 tracking-wide hover:text-flyd-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <ButtonLink href="/kontakt" variant="primary" className="px-5 py-3 text-[13px]">
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
            className="md:hidden p-2 -mr-2 text-flyd-ink"
          >
            <Menu className="h-6 w-6" />
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
          'md:hidden fixed inset-0 z-50 bg-flyd-paper transition-[opacity,visibility] duration-200',
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
          className="absolute right-4 top-4 p-2 text-flyd-ink"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="flex h-full flex-col gap-2 px-6 pt-24 pb-12 overflow-y-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-3xl font-display tracking-tighter py-3 border-b border-flyd-ink/10"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 space-y-3">
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
              variant="outline"
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
