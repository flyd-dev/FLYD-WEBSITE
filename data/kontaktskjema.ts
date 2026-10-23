import type { ContactTopic } from '@/lib/contact-topics';
import type { ServiceIconName } from '@/components/ServiceIcon';
import type { FlydIconName } from '@/components/FlydIcon';

/**
 * Temavalget øverst i kontaktskjemaet (/kontakt). Ett valg per tema i
 * lib/contact-topics.ts. Tjenestene bruker tjenesteikonene, Karriere og Annet
 * ikoner fra Flyds generelle sett.
 *
 * `hint` står under «Melding» når temaet er valgt, så folk vet hva som er
 * nyttig å skrive. `egenRad` legger valget i raden under streken: revisjon
 * holdes adskilt fra de andre tjenestene, og karriere og annet er ikke tjenester.
 */
export type TemaValg = {
  tema: ContactTopic;
  /** Teksten på flisen, når den skal være en annen enn temaet. */
  visning?: string;
  ikon: { sett: 'tjeneste'; navn: ServiceIconName } | { sett: 'flyd'; navn: FlydIconName };
  hint: string;
  egenRad?: true;
};

export const temaValg: TemaValg[] = [
  {
    tema: 'Regnskap og rådgivning',
    ikon: { sett: 'tjeneste', navn: 'regnskap' },
    hint: 'Fortell gjerne hva slags bedrift du har, og om du har regnskapsfører i dag.',
  },
  {
    tema: 'Programvare / ERP',
    visning: 'Programvare og ERP',
    ikon: { sett: 'tjeneste', navn: 'erp' },
    hint: 'Fortell gjerne hvilket system du bruker i dag, og hva du vil få til.',
  },
  {
    tema: 'Integrasjoner',
    ikon: { sett: 'tjeneste', navn: 'integrasjoner' },
    hint: 'Hvilke systemer skal snakke sammen, og hva gjør dere for hånd i dag?',
  },
  {
    tema: 'Analyse og rapportering',
    ikon: { sett: 'tjeneste', navn: 'analyse' },
    hint: 'Hvilke tall vil du følge med på, og hvor ligger de i dag?',
  },
  {
    tema: 'Nettsider og digitale flater',
    ikon: { sett: 'tjeneste', navn: 'nettsider' },
    hint: 'Gjelder det en nettside, en kundeportal eller en intern arbeidsflate? Fortell gjerne hva den skal gjøre.',
  },
  {
    tema: 'Lønn og HR',
    ikon: { sett: 'tjeneste', navn: 'lonn' },
    hint: 'Omtrent hvor mange ansatte har dere, og hvilket lønnssystem bruker dere i dag?',
  },
  {
    tema: 'Revisjon',
    ikon: { sett: 'tjeneste', navn: 'revisjon' },
    hint: 'Fortell gjerne om selskapet og hva du trenger: revisjon, en revisorbekreftelse eller en annen attestasjon.',
    egenRad: true,
  },
  {
    tema: 'Karriere',
    ikon: { sett: 'flyd', navn: 'medarbeidere' },
    hint: 'Fortell kort om deg selv og hva du kunne tenke deg å jobbe med. Lim gjerne inn en lenke til CV eller LinkedIn.',
    egenRad: true,
  },
  {
    tema: 'Annet',
    visning: 'Noe annet',
    ikon: { sett: 'flyd', navn: 'dialog' },
    hint: 'Fortell oss kort hva det gjelder, så finner vi riktig person.',
    egenRad: true,
  },
];

/** «Hva skjer når du sender?» i venstre spalte på /kontakt. */
export const etterSending = [
  'Meldingen kommer rett til oss, og vi gir den til den som kan svare best.',
  'Du hører fra oss, normalt innen én arbeidsdag.',
  'Vi tar en uforpliktende prat og finner ut hva du trenger.',
];
