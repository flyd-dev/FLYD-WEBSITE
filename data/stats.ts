import { leadership, officeLeads, otherTeam } from './team';
import { offices } from './offices';

const alle = [...leadership, ...officeLeads, ...otherTeam];

const statsautoriserte = alle.filter(
  (m) => m.certified || m.role.toLowerCase().includes('statsautorisert'),
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
  // Telles fra data/team.ts.
  { key: 'medarbeidere', value: String(alle.length), label: 'Medarbeidere', bekreftet: true },
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
