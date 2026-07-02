import { leadership, officeLeads, otherTeam } from './team';
import { offices } from './offices';

const alle = [...leadership, ...officeLeads, ...otherTeam];

const statsautoriserte = alle.filter(
  (m) => m.certified || m.role.toLowerCase().includes('statsautorisert'),
).length;

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: '670+', label: 'Kunder' },
  { value: String(offices.length), label: 'Kontorer' },
  { value: String(alle.length), label: 'Medarbeidere' },
  { value: String(statsautoriserte), label: 'Statsautoriserte regnskapsførere' },
];
