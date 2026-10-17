// Temaene i kontaktskjemaet. Samme liste brukes i skjemaet og i
// app/api/kontakt, så serveren ikke avviser et tema skjemaet selv tilbyr.
export const CAREER_TOPIC = 'Karriere';

export const CONTACT_TOPICS = [
  'Regnskap og rådgivning',
  'Programvare / ERP',
  'Integrasjoner',
  'Analyse og rapportering',
  'Nettsider og digitale flater',
  'Lønn og HR',
  // PREVIEW (Liit-fusjon): tema for tjenesten Revisjon (data/services.ts).
  'Revisjon',
  CAREER_TOPIC,
  'Annet',
] as const;
