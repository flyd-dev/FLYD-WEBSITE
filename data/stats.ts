import { allTeam } from './team';
import { offices } from './offices';

const alle = allTeam;

/**
 * Antall medarbeidere etter fusjonen med Liit, fra pressemeldingen
 * (https://www.liit.no/flyd-as-og-liit-as-fusjonerer). Teamlisten i data/team.ts
 * har ikke alle med, så tallet telles ikke derfra. Faktasjekk 16.10.2026: vis
 * aldri to ulike tall samtidig, og bruk samme ordlyd overalt (også i JSON-LD).
 */
export const MEDARBEIDERE = 26;
export const medarbeidereTekst = `${MEDARBEIDERE} medarbeidere etter fusjonen med Liit`;

// Bare regnskapsførere: statsautoriserte revisorer (Liit) skal ikke telles med.
const statsautoriserte = alle.filter(
  (m) => m.certified || m.role.toLowerCase().includes('statsautorisert regnskapsfører'),
).length;

/**
 * Nøkkeltall – én kilde for hele nettstedet.
 *
 * `bekreftet: true` betyr at Flyd ikke har bekreftet tallet ennå. Da vises
 * en [BEKREFT]-merknad under tallet lokalt og på Vercel-forhåndsvisninger,
 * men aldri på flyd.no (se `visBekreft` i StatsSection). Sett `bekreftet: true`
 * når tallet er sjekket.
 */
export type Stat = {
  key: 'kunder' | 'kontorer' | 'medarbeidere' | 'statsautoriserte';
  value: string;
  label: string;
  bekreftet: boolean;
};

export const stats: Stat[] = [
  // Bekreftet av Flyd 9. okt. 2026: tallene på flyd.no stemmer.
  { key: 'kunder', value: '670+', label: 'Kunder', bekreftet: true },
  { key: 'kontorer', value: String(offices.length), label: 'Kontorer', bekreftet: true },
  // Fra pressemeldingen om fusjonen (se MEDARBEIDERE over).
  {
    key: 'medarbeidere',
    value: String(MEDARBEIDERE),
    label: 'Medarbeidere etter fusjonen med Liit',
    bekreftet: true,
  },
  // Telles fra `certified` i data/team.ts. Må stemme med Finanstilsynets register.
  {
    key: 'statsautoriserte',
    value: String(statsautoriserte),
    label: 'Statsautoriserte regnskapsførere',
    bekreftet: true,
  },
];

export function stat(key: Stat['key']): Stat {
  const s = stats.find((x) => x.key === key);
  if (!s) throw new Error(`Ukjent nøkkeltall: ${key}`);
  return s;
}
