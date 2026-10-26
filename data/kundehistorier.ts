import type { Kundehistorie } from '@/components/designlab/KundeHistorier';

/**
 * Kundehistoriene (forslag i designlab, ikke i bruk på sidene ennå).
 *
 * EKSEMPLER. Tallene, sitatene og navnene er ikke ekte. De må byttes med
 * godkjente sitater fra kundene (med samtykke til navn og logo) før noe av
 * dette publiseres. `kunde` må stemme med `name` i data/logos.ts.
 */
export const kundehistorier: Kundehistorie[] = [
  {
    kunde: 'Lervig',
    tall: '3 dager',
    tallTekst: 'raskere månedsavslutning',
    tallNote: 'Etter automatisk bankavstemming i ERP-systemet',
    sitat: 'Før brukte vi første uka i måneden på å jage bilag. Nå har vi tallene klare før vi rekker å spørre etter dem.',
    navn: 'Navn Navnesen',
    rolle: 'Økonomisjef',
    href: '/kontakt',
  },
  {
    kunde: 'Driftig',
    tall: '−40 %',
    tallTekst: 'mindre manuell registrering',
    tallNote: 'Integrasjon mellom fagsystemet og regnskapet',
    sitat: 'Ordrene går rett inn i regnskapet. Vi taster ikke det samme to ganger lenger, og feilene forsvant med det.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Sirdal Fjellpark',
    tall: 'Hver uke',
    tallTekst: 'oppdatert oversikt over sesongen',
    tallNote: 'Dashboard i Power BI',
    sitat: 'Vi ser belegg, salg og kostnader samlet. Det gjør det mye lettere å ta beslutninger midt i sesongen.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Sinneshyttå',
    tall: '12 t',
    tallTekst: 'spart i måneden på lønn',
    tallNote: 'Timer fra kassen rett inn i lønnskjøringen',
    sitat: 'Lønna går av seg selv nå. Vi får spørsmål fra Flyd når noe ser rart ut, ikke etter at det har gått galt.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Bilstad Bygg',
    tall: '1',
    tallTekst: 'fast kontaktperson',
    tallNote: 'For regnskap, lønn og systemspørsmål',
    sitat: 'Vi ringer samme person enten det gjelder et bilag eller et prosjekt i systemet. Det sparer oss for mye fram og tilbake.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
  {
    kunde: 'Årring',
    tall: '2 uker',
    tallTekst: 'fra første samtale til nytt system',
    tallNote: 'Overgang til nytt ERP med historikk',
    sitat: 'Vi trodde bytte av system skulle bli et prosjekt over flere måneder. Det ble to uker, og ingenting forsvant på veien.',
    navn: 'Navn Navnesen',
    rolle: 'Daglig leder',
  },
];
