export type TeamMember = {
  name: string;
  role: string;
  partner?: boolean;
  /**
   * Statsautorisert regnskapsfører. Telles i nøkkeltallet. Statsautoriserte
   * revisorer får samme pille på kortet via tittelen, men telles ikke.
   */
  certified?: boolean;
  phone?: string;
  email: string;
  image?: string;
  initials: string;
};

const mk = (m: Omit<TeamMember, 'initials'> & { initials?: string }): TeamMember => ({
  ...m,
  initials:
    m.initials ??
    m.name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase(),
});

// Partnerne i revisjon (tidligere Liit). Titler og telefon er sjekket mot
// liit.no/kontakt 22.10.2026, e-post på @flyd.no. Står først i revisjonsteamet
// på /tjenester/revisjon/.
export const auditPartners: TeamMember[] = [
  mk({
    name: 'Irene Bendiksen',
    role: 'Leder revisjon · Statsautorisert revisor',
    partner: true,
    phone: '+47 997 02 292',
    email: 'irene.bendiksen@flyd.no',
    image: '/team/flyd-irene.webp',
  }),
  mk({
    name: 'Heidi Elizabeth Odden',
    role: 'Statsautorisert revisor',
    partner: true,
    phone: '+47 928 19 975',
    email: 'heidi.odden@flyd.no',
    image: '/team/flyd-heidi.webp',
  }),
];

// Partnerne i regnskap. Svein er kvalitetsansvarlig for regnskap, ikke revisjon.
export const accountingPartners: TeamMember[] = [
  mk({
    name: 'Svein Zwygart',
    role: 'Kvalitetsansvarlig regnskap · Statsautorisert regnskapsfører',
    partner: true,
    certified: true,
    phone: '+47 913 96 137',
    email: 'svein.zwygart@flyd.no',
    image: '/team/flyd-svein.webp',
  }),
  mk({
    name: 'Thomas Haaland',
    role: 'Kontorleder · Statsautorisert regnskapsfører',
    partner: true,
    certified: true,
    phone: '+47 974 11 759',
    email: 'thomas.haaland@flyd.no',
    image: '/team/flyd-thomas.webp',
  }),
];

// Partnerne. Hvem som står under «Ledelse» på /om-flyd, styres av `ledelse` nederst.
export const leadership: TeamMember[] = [
  mk({
    name: 'Kai Mydland',
    role: 'Daglig leder',
    partner: true,
    phone: '+47 480 19 958',
    email: 'kai.mydland@flyd.no',
    image: '/team/flyd-kai.webp',
  }),
  ...auditPartners,
  mk({
    name: 'Arnstein Bendiksen',
    role: 'Salgssjef',
    partner: true,
    phone: '+47 917 17 445',
    email: 'arnstein.bendiksen@flyd.no',
    image: '/team/flyd-arnstein.webp',
  }),
  ...accountingPartners,
];

// Kontorlederne i Sandnes og Egersund. Hvem som står på hvert kontor, styres av `kontorTeam` nederst.
export const officeLeads: TeamMember[] = [
  mk({
    name: 'Marit Haga Christensen',
    role: 'Kontorleder · Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 470 17 697',
    email: 'marit.christensen@flyd.no',
    image: '/team/flyd-marit.webp',
  }),
  mk({
    name: 'Kristian Odland',
    role: 'Kontorleder · Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 969 08 575',
    email: 'kristian.odland@flyd.no',
    image: '/team/flyd-kristian.webp',
  }),
];

export const accountingTeam: TeamMember[] = [
  mk({
    name: 'Christoffer Ellingham',
    role: 'Regnskapskonsulent',
    phone: '+47 932 68 341',
    email: 'christoffer.ellingham@flyd.no',
    image: '/team/flyd-christoffer.webp',
  }),
  mk({
    name: 'Henriette Tengs Gjertsen',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 952 67 974',
    email: 'henriette.gjertsen@flyd.no',
    image: '/team/flyd-henriette.webp',
  }),
  mk({
    name: 'Lennart Berntsen',
    role: 'Regnskapskonsulent',
    phone: '+47 480 88 427',
    email: 'lennart.berntsen@flyd.no',
    image: '/team/flyd-lennart.webp',
  }),
  mk({
    name: 'Anne Marit Midbøe',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 911 29 232',
    email: 'anne.marit.midboe@flyd.no',
    image: '/team/flyd-annemarit.webp',
  }),
  mk({
    name: 'Beate Sørgulen',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 971 84 128',
    email: 'beate.sorgulen@flyd.no',
    image: '/team/flyd-beate.webp',
  }),
  mk({
    name: 'Synnøve S. Thoresen',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 958 28 024',
    email: 'synnove.thoresen@flyd.no',
    image: '/team/flyd-synnove.webp',
  }),
  mk({
    name: 'Espen Hetland',
    role: 'Regnskapskonsulent',
    phone: '+47 984 10 305',
    email: 'espen.hetland@flyd.no',
    image: '/team/flyd-espen.webp',
  }),
  mk({
    name: 'Arne Olav Østrem',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 957 97 236',
    email: 'arne.olav.ostrem@flyd.no',
    image: '/team/flyd-arneolav.webp',
  }),
  mk({
    name: 'Eira Marie Hagland',
    role: 'Regnskapskonsulent',
    phone: '+47 950 40 729',
    email: 'eira.hagland@flyd.no',
    image: '/team/flyd-eira.webp',
  }),
  mk({
    name: 'Åslaug Karin Fidjeland',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 472 36 125',
    email: 'aslaug.karin.fidjeland@flyd.no',
    image: '/team/flyd-aaslaug.webp',
  }),
  mk({
    name: 'Øyvind Maude Nedland',
    role: 'Regnskapskonsulent',
    phone: '+47 988 81 133',
    email: 'oyvind.nedland@flyd.no',
    image: '/team/flyd-oyvind.webp',
  }),
  mk({
    name: 'Tatjana Derksen',
    role: 'Regnskapskonsulent',
    phone: '+47 994 68 653',
    email: 'tatjana.derksen@flyd.no',
    image: '/team/flyd-tatjana.webp',
  }),
];

// Resten av revisjonsteamet. Martha, Randi og Julie er statsautoriserte
// regnskapsførere (telles i nøkkeltallet). Julie har gått over fra regnskap.
export const auditTeam: TeamMember[] = [
  mk({
    name: 'Martha Egeli',
    role: 'Supervisor revisjon · Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 980 18 758',
    email: 'martha.egeli@flyd.no',
    image: '/team/flyd-martha.webp',
  }),
  mk({
    name: 'Randi Egeli Handeland',
    role: 'Supervisor revisjon · Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 975 06 911',
    email: 'randi.handeland@flyd.no',
    image: '/team/flyd-randi.webp',
  }),
  mk({
    name: 'Synne Mydland Johansen',
    role: 'Associate revisjon',
    phone: '+47 417 50 484',
    email: 'synne.johansen@flyd.no',
    image: '/team/flyd-synne.webp',
  }),
  mk({
    name: 'Julie Hagh',
    role: 'Associate revisjon · Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 950 08 122',
    email: 'julie.hagh@flyd.no',
    image: '/team/flyd-julie.webp',
  }),
];

// ERP, systemer og teknologi.
export const techTeam: TeamMember[] = [
  mk({
    name: 'Marius Koldal',
    role: 'ERP-konsulent',
    phone: '+47 902 75 304',
    email: 'marius.koldal@flyd.no',
    image: '/team/flyd-marius.webp',
  }),
];

/** Alle medarbeidere, hver én gang: til nøkkeltall, JSON-LD og oppslag av fagperson. */
export const allTeam: TeamMember[] = [...leadership, ...officeLeads, ...auditTeam, ...accountingTeam, ...techTeam];

const medEpost = (epost: string): TeamMember => {
  const m = allTeam.find((x) => x.email === epost);
  if (!m) throw new Error(`Ukjent ansatt: ${epost}`);
  return m;
};

/** «Ledelse» på /om-flyd (Arnstein 22.10.2026). */
export const ledelse: TeamMember[] = [
  'kai.mydland@flyd.no',
  'irene.bendiksen@flyd.no',
  'thomas.haaland@flyd.no',
  'kristian.odland@flyd.no',
  'marit.christensen@flyd.no',
].map(medEpost);

/** Resten av gjengen på /om-flyd, uten inndeling, i alfabetisk rekkefølge. */
export const restenAvTeamet: TeamMember[] = allTeam
  .filter((m) => !ledelse.includes(m))
  .sort((a, b) => a.name.localeCompare(b.name, 'nb'));

/**
 * Folkene per kontor (kontorsidene, /kontor/[slug]). Kontorlederen står først
 * (Arnstein 22.10.2026). Thomas leder Moi, Flekkefjord og Sirdal. Nøkkelen er
 * `slug` i data/offices.ts.
 */
export const kontorTeam: Record<string, TeamMember[]> = Object.fromEntries(
  Object.entries({
    'stavanger-sandnes': [
      'marit.christensen@flyd.no',
      'tatjana.derksen@flyd.no',
      'kai.mydland@flyd.no',
      'arnstein.bendiksen@flyd.no',
    ],
    egersund: [
      'kristian.odland@flyd.no',
      'henriette.gjertsen@flyd.no',
      'christoffer.ellingham@flyd.no',
      'marius.koldal@flyd.no',
    ],
    sokndal: [
      'irene.bendiksen@flyd.no',
      'heidi.odden@flyd.no',
      'martha.egeli@flyd.no',
      'randi.handeland@flyd.no',
      'synne.johansen@flyd.no',
      'julie.hagh@flyd.no',
      'lennart.berntsen@flyd.no',
    ],
    moi: [
      'thomas.haaland@flyd.no',
      'svein.zwygart@flyd.no',
      'synnove.thoresen@flyd.no',
      'beate.sorgulen@flyd.no',
      'anne.marit.midboe@flyd.no',
      'espen.hetland@flyd.no',
      'arne.olav.ostrem@flyd.no',
    ],
    flekkefjord: ['thomas.haaland@flyd.no', 'oyvind.nedland@flyd.no'],
    sirdal: ['thomas.haaland@flyd.no', 'aslaug.karin.fidjeland@flyd.no', 'eira.hagland@flyd.no'],
  }).map(([slug, eposter]) => [slug, eposter.map(medEpost)]),
);
