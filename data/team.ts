export type TeamMember = {
  name: string;
  role: string;
  partner?: boolean;
  lead?: boolean;
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

export const leadership: TeamMember[] = [
  mk({
    name: 'Kai Mydland',
    role: 'Daglig leder',
    partner: true,
    phone: '+47 480 19 958',
    email: 'kai.mydland@flyd.no',
    image: '/team/flyd-kai.webp',
  }),
  mk({
    name: 'Arnstein Bendiksen',
    role: 'Salgssjef',
    partner: true,
    phone: '+47 917 17 445',
    email: 'arnstein.bendiksen@flyd.no',
    image: '/team/flyd-arnstein.webp',
  }),
  mk({
    name: 'Svein Zwygart',
    role: 'Kvalitetsansvarlig',
    partner: true,
    certified: true,
    phone: '+47 913 96 137',
    email: 'svein.zwygart@flyd.no',
    image: '/team/flyd-svein.webp',
  }),
  mk({
    name: 'Thomas Haaland',
    role: 'Økonomisjef',
    partner: true,
    certified: true,
    phone: '+47 974 11 759',
    email: 'thomas.haaland@flyd.no',
    image: '/team/flyd-thomas.webp',
  }),
  // PREVIEW (Liit-fusjon): nye partnere fra Liit. Fakta fra liit.no/kontakt.
  // Liit-bildene er kun for preview; byttes eller godkjennes før publisering.
  // TODO: Irene står som «daglig leder» på liit.no, men Kai er daglig leder i
  // Flyd. Tittelen er hentet fra pressemeldingen («leder revisjon i Flyd AS»)
  // og må bekreftes.
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

export const officeLeads: TeamMember[] = [
  mk({
    name: 'Kristian Odland',
    role: 'Kontorleder · Statsautorisert regnskapsfører',
    lead: true,
    certified: true,
    phone: '+47 969 08 575',
    email: 'kristian.odland@flyd.no',
    image: '/team/flyd-kristian.webp',
  }),
  mk({
    name: 'Marit Haga Christensen',
    role: 'Kontorleder · Statsautorisert regnskapsfører',
    lead: true,
    certified: true,
    phone: '+47 470 17 697',
    email: 'marit.christensen@flyd.no',
    image: '/team/flyd-marit.webp',
  }),
];

export const otherTeam: TeamMember[] = [
  mk({
    name: 'Marius Koldal',
    role: 'ERP-konsulent',
    phone: '+47 902 75 304',
    email: 'marius.koldal@flyd.no',
    image: '/team/flyd-marius.webp',
  }),
  mk({
    name: 'Julie Hagh',
    role: 'Statsautorisert regnskapsfører',
    certified: true,
    phone: '+47 950 08 122',
    email: 'julie.hagh@flyd.no',
    image: '/team/flyd-julie.webp',
  }),
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

// PREVIEW (Liit-fusjon): ansatte fra Liit. Navn, tittel og telefon fra
// liit.no/kontakt. Liit-bildene er kun for preview; byttes eller godkjennes
// før publisering.
// TODO: Plasseringen under Revisjon er ikke bekreftet. liit.no sier ikke om
// Martha, Randi og Synne jobber med revisjon eller regnskap.
export const revisjon: TeamMember[] = [
  mk({
    name: 'Martha Egeli',
    role: 'Supervisor',
    phone: '+47 980 18 758',
    email: 'martha.egeli@flyd.no',
    image: '/team/flyd-martha.webp',
  }),
  mk({
    name: 'Randi Egeli Handeland',
    role: 'Supervisor',
    phone: '+47 975 06 911',
    email: 'randi.handeland@flyd.no',
    image: '/team/flyd-randi.webp',
  }),
  mk({
    name: 'Synne Mydland Johansen',
    role: 'Associate',
    phone: '+47 417 50 484',
    email: 'synne.johansen@flyd.no',
    image: '/team/flyd-synne.webp',
  }),
];

/** Alle medarbeidere: antall i nøkkeltall og JSON-LD, og oppslag av fagperson. */
export const allTeam: TeamMember[] = [...leadership, ...officeLeads, ...otherTeam, ...revisjon];
