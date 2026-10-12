/**
 * Utkast: sider og felter som venter på godkjent innhold.
 *
 * Utkast vises bare i `npm run dev`, på Vercel-forhåndsvisninger og når
 * FLYD_UTKAST=1 er satt. En vanlig `npm run build` og produksjon på flyd.no
 * tar dem ikke med. Feiler miljøvariabelen, faller vi tilbake til «skjul»,
 * så et utkast kan aldri lekke ut ved et uhell.
 */
export const visUtkast =
  process.env.NODE_ENV === 'development' ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview' ||
  process.env.VERCEL_ENV === 'preview' ||
  process.env.FLYD_UTKAST === '1';

export type Status = 'publisert' | 'utkast';

/** Med på nettstedet nå? Publiserte alltid, utkast bare i utkastmodus. */
export const synlig = (x: { status: Status }) => x.status === 'publisert' || visUtkast;
