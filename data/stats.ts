import { allTeam } from './team';
import { offices } from './offices';

// Bare regnskapsførere (`certified`), ikke statsautoriserte revisorer.
const statsautoriserte = allTeam.filter((m) => m.certified).length;
// Statsautoriserte revisorer har det i tittelen (Irene og Heidi).
const revisorer = allTeam.filter((m) => m.role.toLowerCase().includes('statsautorisert revisor')).length;

/**
 * Nøkkeltall – én kilde for hele nettstedet.
 *
 * `bekreftet: true` betyr at Flyd ikke har bekreftet tallet ennå. Da vises
 * en [BEKREFT]-merknad under tallet lokalt og på Vercel-forhåndsvisninger,
 * men aldri på flyd.no (se `visBekreft` i StatsSection). Sett `bekreftet: true`
 * når tallet er sjekket.
 */
export type Stat = {
  key: 'kunder' | 'kontorer' | 'medarbeidere' | 'statsautoriserte' | 'revisorer';
  value: string;
  label: string;
  bekreftet: boolean;
};

export const stats: Stat[] = [
  // Bekreftet av Flyd 9. okt. 2026: tallene på flyd.no stemmer.
  { key: 'kunder', value: '670+', label: 'Kunder', bekreftet: true },
  { key: 'kontorer', value: String(offices.length), label: 'Kontorer', bekreftet: true },
  // Telles fra data/team.ts.
  { key: 'medarbeidere', value: String(allTeam.length), label: 'Medarbeidere', bekreftet: true },
  // Telles fra `certified` i data/team.ts. Må stemme med Finanstilsynets register.
  {
    key: 'statsautoriserte',
    value: String(statsautoriserte),
    label: 'Statsautoriserte regnskapsførere',
    bekreftet: true,
  },
  // Telles fra titlene i data/team.ts (Irene 22.10.2026).
  { key: 'revisorer', value: String(revisorer), label: 'Statsautoriserte revisorer', bekreftet: true },
];

export function stat(key: Stat['key']): Stat {
  const s = stats.find((x) => x.key === key);
  if (!s) throw new Error(`Ukjent nøkkeltall: ${key}`);
  return s;
}
