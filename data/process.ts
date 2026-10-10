import type { ProcessStep } from '@/components/ProcessCards';

/**
 * Slik jobber vi: de fire stegene på forsiden. Vises også på tjenestesidene
 * som ikke har en egen prosess (feltet `prosess` i data/services.ts).
 */
export const process: ProcessStep[] = [
  {
    n: '01',
    title: 'Dialog',
    icon: 'dialog',
    body:
      'Vi starter med en uforpliktende samtale og blir kjent med bedriften, systemene og hvor du vil – og hvor skoen trykker i dag.',
    imgSrc: '/process-bg/dialog.webp',
  },
  {
    n: '02',
    title: 'Plan',
    icon: 'plan',
    body:
      'Vi designer en løsning tilpasset virksomheten: riktig ERP, integrasjoner, arbeidsflyt og hvem som gjør hva.',
    imgSrc: '/process-bg/plan.webp',
  },
  {
    n: '03',
    title: 'I drift',
    icon: 'i-drift',
    body:
      'Vi tar hånd om regnskap, lønn og rapportering. Du får oppdaterte tall og en fast rådgiver å støtte deg på.',
    imgSrc: '/process-bg/drift.webp',
  },
  {
    n: '04',
    title: 'Videreutvikling',
    icon: 'videreutvikling',
    body:
      'Vi følger med, justerer og foreslår forbedringer. Systemet skal vokse med bedriften – ikke bremse den.',
    imgSrc: '/header/office-4.webp',
  },
];
