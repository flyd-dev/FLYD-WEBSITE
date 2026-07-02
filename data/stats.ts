import { leadership, officeLeads, otherTeam } from './team';
import { offices } from './offices';

const medarbeidere =
  leadership.length + officeLeads.length + otherTeam.length;

export type Stat = { value: string; label: string };

export const stats: Stat[] = [
  { value: '670+', label: 'Kunder' },
  { value: String(offices.length), label: 'Kontorer' },
  { value: String(medarbeidere), label: 'Medarbeidere' },
  // Manuelt tall: teamdata har foreløpig bare 9 markert — oppdater
  // `certified` i team.ts og utled dette når alle er markert.
  { value: '11', label: 'Statsautoriserte regnskapsførere' },
];
