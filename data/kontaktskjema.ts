import type { ContactTopic } from '@/lib/contact-topics';
import type { ServiceIconName } from '@/components/ServiceIcon';
import type { FlydIconName } from '@/components/FlydIcon';

/**
 * Temaene i kontaktskjemaet (/kontakt), slik de står i setningen
 * «Jeg vil gjerne snakke om …». Ett valg per tema i lib/contact-topics.ts,
 * i samme rekkefølge som Tjenester-menyen: de kombinerbare tjenestene først,
 * så revisjon, karriere og annet.
 *
 * `hint` står som plassholdertekst i meldingsfeltet når temaet er valgt, så
 * folk vet hva som er nyttig å skrive. `ikon` vises i nedtrekksmenyen
 * (tjenesteikonene, og Flyds ikoner for karriere og annet). `skille` gir en
 * strek over valget: revisjon står adskilt fra de andre tjenestene, som i
 * Tjenester-menyen.
 */
export type TemaValg = {
  tema: ContactTopic;
  /** Slik temaet leses midt i setningen (små bokstaver). */
  setning: string;
  hint: string;
  ikon: { sett: 'tjeneste'; navn: ServiceIconName } | { sett: 'flyd'; navn: FlydIconName };
  skille?: true;
};

export const temaValg: TemaValg[] = [
  {
    tema: 'Regnskap og rådgivning',
    setning: 'regnskap og rådgivning',
    hint: 'Fortell gjerne hva slags bedrift du har, og om du har regnskapsfører i dag.',
    ikon: { sett: 'tjeneste', navn: 'regnskap' },
  },
  {
    tema: 'Programvare / ERP',
    setning: 'programvare og ERP',
    hint: 'Fortell gjerne hvilket system du bruker i dag, og hva du vil få til.',
    ikon: { sett: 'tjeneste', navn: 'erp' },
  },
  {
    tema: 'Integrasjoner',
    setning: 'integrasjoner',
    hint: 'Hvilke systemer skal snakke sammen, og hva gjør dere for hånd i dag?',
    ikon: { sett: 'tjeneste', navn: 'integrasjoner' },
  },
  {
    tema: 'Analyse og rapportering',
    setning: 'analyse og rapportering',
    hint: 'Hvilke tall vil du følge med på, og hvor ligger de i dag?',
    ikon: { sett: 'tjeneste', navn: 'analyse' },
  },
  {
    tema: 'Nettsider og digitale flater',
    setning: 'nettsider og digitale flater',
    hint: 'Gjelder det en nettside, en kundeportal eller en intern arbeidsflate? Fortell gjerne hva den skal gjøre.',
    ikon: { sett: 'tjeneste', navn: 'nettsider' },
  },
  {
    tema: 'Lønn og HR',
    setning: 'lønn og HR',
    hint: 'Omtrent hvor mange ansatte har dere, og hvilket lønnssystem bruker dere i dag?',
    ikon: { sett: 'tjeneste', navn: 'lonn' },
  },
  {
    tema: 'Revisjon',
    setning: 'revisjon',
    hint: 'Fortell gjerne om selskapet og hva du trenger: revisjon, en revisorbekreftelse eller en annen attestasjon.',
    ikon: { sett: 'tjeneste', navn: 'revisjon' },
    skille: true,
  },
  {
    tema: 'Karriere',
    setning: 'en jobb hos dere',
    hint: 'Fortell kort om deg selv og hva du kunne tenke deg å jobbe med. Lim gjerne inn en lenke til CV eller LinkedIn.',
    ikon: { sett: 'flyd', navn: 'medarbeidere' },
  },
  {
    tema: 'Annet',
    setning: 'noe annet',
    hint: 'Fortell oss kort hva det gjelder, så finner vi riktig person.',
    ikon: { sett: 'flyd', navn: 'dialog' },
  },
];
