import type { Metadata } from 'next';
import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  CalendarDays,
  CalendarClock,
  Percent,
  Phone,
  Mail,
} from 'lucide-react';
import Container from '@/components/Container';
import Section from '@/components/Section';
import Eyebrow from '@/components/Eyebrow';
import { ButtonLink } from '@/components/Button';
import JsonLd from '@/components/JsonLd';
import { jobs, getJobBySlug, type Job } from '@/data/jobs';

const SITE_URL = 'https://www.flyd.no';

function jobsFileMtime(): string {
  try {
    return fs
      .statSync(path.join(process.cwd(), 'data/jobs.ts'))
      .mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function employmentType(type: string): string {
  const t = type.toLowerCase();
  if (t.includes('heltid')) return 'FULL_TIME';
  if (t.includes('deltid')) return 'PART_TIME';
  if (t.includes('vikar')) return 'TEMPORARY';
  if (t.includes('kontrakt')) return 'CONTRACTOR';
  return 'OTHER';
}

function jobDescriptionHtml(job: Job): string {
  const intro = `<p>${job.ingress}</p>`;
  const body = job.sections
    .map((s) => {
      const heading = `<h3>${s.heading}</h3>`;
      const para = s.body ? `<p>${s.body}</p>` : '';
      const list =
        s.bullets && s.bullets.length
          ? `<ul>${s.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>`
          : '';
      return heading + para + list;
    })
    .join('');
  return intro + body;
}

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const job = getJobBySlug(params.slug);
  if (!job) return { title: 'Stilling ikke funnet' };
  return {
    title: `${job.title} – ${job.location}`,
    description: job.ingress,
    alternates: { canonical: `/karriere/${job.slug}/` },
  };
}

export default function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const job = getJobBySlug(params.slug);
  if (!job) notFound();

  const mailtoSubject = encodeURIComponent(
    `Søknad: ${job.title} – ${job.location}`,
  );
  const applyHref = `mailto:${job.applyEmail}?subject=${mailtoSubject}`;

  const datePosted = job.datePosted ?? jobsFileMtime();
  const jobPostingJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: jobDescriptionHtml(job),
    datePosted,
    employmentType: employmentType(job.type),
    hiringOrganization: { '@id': `${SITE_URL}/#organization` },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location,
        addressCountry: 'NO',
      },
    },
    directApply: false,
    applicantLocationRequirements: { '@type': 'Country', name: 'Norway' },
  };
  if (job.validThrough) {
    jobPostingJsonLd.validThrough = job.validThrough;
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hjem', item: `${SITE_URL}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Karriere',
        item: `${SITE_URL}/karriere/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: job.title,
        item: `${SITE_URL}/karriere/${job.slug}/`,
      },
    ],
  };

  const metaItems: { icon: typeof MapPin; label: string; value: string }[] = [
    {
      icon: MapPin,
      label: 'Arbeidssted',
      value: job.workplace ?? job.location,
    },
    { icon: Briefcase, label: 'Type', value: job.type },
  ];
  if (job.percentage) {
    metaItems.push({
      icon: Percent,
      label: 'Stillingsprosent',
      value: job.percentage,
    });
  }
  if (job.startDate) {
    metaItems.push({
      icon: CalendarDays,
      label: 'Oppstart',
      value: job.startDate,
    });
  }
  if (job.deadline) {
    metaItems.push({
      icon: CalendarClock,
      label: 'Søknadsfrist',
      value: job.deadline,
    });
  }

  return (
    <>
      <JsonLd data={jobPostingJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <Section tone="paper" className="pt-16 md:pt-20">
        <Container>
          <Link
            href="/karriere/#ledige-stillinger"
            className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.18em] text-flyd-ink/60 transition-colors hover:text-flyd-accent"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Alle stillinger
          </Link>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow tone="teal">Ledig stilling</Eyebrow>
              <h1 className="mt-6 font-display text-display-xl font-semibold">
                {job.title}
              </h1>
              <p className="mt-8 text-[18px] leading-[1.75] text-flyd-ink/80">
                {job.ingress}
              </p>

              <div className="mt-14 space-y-14">
                {job.sections.map((s) => (
                  <div key={s.heading} data-reveal>
                    <h2 className="font-display text-2xl font-semibold md:text-3xl">
                      {s.heading}
                    </h2>
                    {s.body && (
                      <p className="mt-6 text-[17px] leading-[1.8] text-flyd-ink/80">
                        {s.body}
                      </p>
                    )}
                    {s.bullets && s.bullets.length > 0 && (
                      <ul className="mt-6 border-t border-flyd-ink/15">
                        {s.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-4 border-b border-flyd-ink/15 py-4 text-[16px] leading-relaxed text-flyd-ink/85"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 inline-block h-[6px] w-[6px] flex-shrink-0 bg-flyd-teal-dark"
                            />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <div
                className="mt-16 border border-flyd-ink/15 bg-[#F2F7F7] p-8 md:p-10"
                data-reveal
              >
                <h2 className="font-display text-2xl font-semibold">
                  Høres dette ut som deg?
                </h2>
                <p className="mt-5 text-[16px] leading-[1.75] text-flyd-ink/80">
                  Send søknad og CV til{' '}
                  <a
                    href={`mailto:${job.applyEmail}`}
                    className="text-flyd-ink underline underline-offset-4 decoration-flyd-ink/40 hover:text-flyd-accent hover:decoration-flyd-accent"
                  >
                    {job.applyEmail}
                  </a>
                  {job.contact && (
                    <>
                      . Har du spørsmål, ta kontakt med{' '}
                      <span className="text-flyd-ink">{job.contact.name}</span>{' '}
                      på{' '}
                      <a
                        href={`tel:${job.contact.phone.replace(/\s+/g, '')}`}
                        className="text-flyd-ink underline underline-offset-4 decoration-flyd-ink/40 hover:text-flyd-accent hover:decoration-flyd-accent"
                      >
                        {job.contact.phone}
                      </a>
                    </>
                  )}
                  .
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <ButtonLink
                    href={applyHref}
                    variant="primary"
                    withArrow
                    accent
                    external
                  >
                    Send søknad
                  </ButtonLink>
                  {job.contact && (
                    <ButtonLink
                      href={`tel:${job.contact.phone.replace(/\s+/g, '')}`}
                      variant="outline"
                      external
                    >
                      Ring {job.contact.name.split(' ')[0]}
                    </ButtonLink>
                  )}
                </div>
              </div>
            </div>

            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <div className="border border-flyd-ink/15 bg-[#F2F7F7] p-7">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark">
                    Om stillingen
                  </div>
                  <dl className="mt-5 space-y-4 text-[14px]">
                    {metaItems.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-start gap-3">
                        <Icon
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                          strokeWidth={1.75}
                        />
                        <div>
                          <dt className="text-flyd-ink/55">{label}</dt>
                          <dd className="mt-0.5 text-flyd-ink">{value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7">
                    <ButtonLink
                      href={applyHref}
                      variant="primary"
                      withArrow
                      accent
                      external
                      className="w-full"
                    >
                      Send søknad
                    </ButtonLink>
                  </div>
                </div>

                {job.contact && (
                  <div className="mt-5 border border-flyd-ink/15 bg-flyd-paper p-7">
                    <div className="text-[11px] uppercase tracking-[0.22em] text-flyd-teal-dark">
                      {job.contact.role ?? 'Kontaktperson'}
                    </div>
                    <div className="mt-4 font-display text-lg font-semibold">
                      {job.contact.name}
                    </div>
                    <dl className="mt-4 space-y-3 text-[14px]">
                      <div className="flex items-start gap-3">
                        <Phone
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                          strokeWidth={1.75}
                        />
                        <a
                          href={`tel:${job.contact.phone.replace(/\s+/g, '')}`}
                          className="text-flyd-ink hover:text-flyd-accent"
                        >
                          {job.contact.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail
                          className="mt-0.5 h-4 w-4 flex-shrink-0 text-flyd-teal-dark"
                          strokeWidth={1.75}
                        />
                        <a
                          href={`mailto:${job.contact.email}`}
                          className="break-all text-flyd-ink hover:text-flyd-accent"
                        >
                          {job.contact.email}
                        </a>
                      </div>
                    </dl>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {jobs.filter((j) => j.slug !== job.slug).length > 0 && (
        <Section tone="teal-soft">
          <Container>
            <div
              className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
              data-reveal
            >
              <div>
                <Eyebrow>Andre stillinger</Eyebrow>
                <h2 className="mt-5 font-display text-display-md font-semibold">
                  Se også
                </h2>
              </div>
            </div>
            <ul
              className="mt-10 divide-y divide-flyd-ink/15 border-y border-flyd-ink/15"
              data-reveal
            >
              {jobs
                .filter((j) => j.slug !== job.slug)
                .map((j) => (
                  <li key={j.slug}>
                    <Link
                      href={`/karriere/${j.slug}/`}
                      className="group flex flex-col gap-2 py-6 transition-colors duration-200 hover:bg-flyd-paper md:flex-row md:items-center md:gap-8 md:px-6"
                    >
                      <div className="md:w-1/3">
                        <h3 className="font-display text-xl font-semibold">
                          {j.title}
                        </h3>
                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-flyd-ink/65">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin
                              className="h-3.5 w-3.5 text-flyd-teal-dark"
                              strokeWidth={1.75}
                            />
                            {j.location}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Briefcase
                              className="h-3.5 w-3.5 text-flyd-teal-dark"
                              strokeWidth={1.75}
                            />
                            {j.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-[14px] leading-[1.7] text-flyd-ink/70 md:flex-1">
                        {j.ingress}
                      </p>
                      <span className="inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-flyd-ink transition-colors group-hover:text-flyd-accent md:flex-shrink-0">
                        Se stilling →
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      )}
    </>
  );
}
