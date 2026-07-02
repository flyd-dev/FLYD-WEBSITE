export type Office = {
  city: string;
  slug: string;
  name: string;
  street: string;
  postal: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  /** 2–3 setninger til kontorsiden (/kontor/[slug]) og meta description. */
  blurb: string;
};

export const offices: Office[] = [
  {
    city: 'Stavanger',
    slug: 'stavanger',
    name: 'FOMO',
    street: 'Grenseveien 21',
    postal: '4313 Sandnes',
    mapsUrl: 'https://maps.google.com/?q=Grenseveien+21,+4313+Sandnes',
    lat: 58.8529,
    lng: 5.7354,
    blurb:
      'Regionkontoret vårt ligger i FOMO-miljøet på Forus, midt i Stavanger-regionen. Herfra betjener vi kunder på hele Nord-Jæren – fra gründere til etablerte industri- og eiendomsselskaper.',
  },
  {
    city: 'Egersund',
    slug: 'egersund',
    name: 'Torvgården',
    street: 'Torget 2',
    postal: '4370 Egersund',
    mapsUrl: 'https://maps.google.com/?q=Torget+2,+4370+Egersund',
    lat: 58.4514,
    lng: 5.9989,
    blurb:
      'Kontoret ligger i Torvgården, midt på torget i Egersund. Her sitter vi tett på næringslivet i Eigersund og resten av Dalane – kom gjerne innom for en regnskapsprat.',
  },
  {
    city: 'Sokndal',
    slug: 'sokndal',
    name: 'Banken',
    street: 'Gamleveien 13',
    postal: '4380 Hauge i Dalane',
    mapsUrl: 'https://maps.google.com/?q=Gamleveien+13,+4380+Hauge+i+Dalane',
    lat: 58.3374,
    lng: 6.2714,
    blurb:
      'I Sokndal holder vi til i «Banken» i Hauge i Dalane. Kort vei for deg som driver virksomhet i Sokndal og omegn – med hele Flyds fagmiljø i ryggen.',
  },
  {
    city: 'Moi',
    slug: 'moi',
    name: 'Moi',
    street: 'Øyevollveien 10',
    postal: '4460 Moi',
    mapsUrl: 'https://maps.google.com/?q=Øyevollveien+10,+4460+Moi',
    lat: 58.4621,
    lng: 6.5334,
    blurb:
      'Moi-kontoret betjener Lund og områdene langs E39 mellom Egersund og Flekkefjord. En lokal regnskapspartner – med kompetansen til hele kompetansehuset bak seg.',
  },
  {
    city: 'Sirdal',
    slug: 'sirdal',
    name: 'Handleriet',
    street: 'Sirdalsveien 7432',
    postal: '4443 Tjørhom',
    mapsUrl: 'https://maps.google.com/?q=Sirdalsveien+7432,+4443+Tjørhom',
    lat: 58.9091,
    lng: 6.8094,
    blurb:
      'På Tjørhom i Sirdal finner du oss i Handleriet. Vi jobber tett med hytte-, bygg- og reiselivsnæringen i fjellbygda – og er til stede der verdiene skapes.',
  },
  {
    city: 'Flekkefjord',
    slug: 'flekkefjord',
    name: 'Flekkefjord',
    street: 'Elvegaten 22',
    postal: '4400 Flekkefjord',
    mapsUrl: 'https://maps.google.com/?q=Elvegaten+22,+4400+Flekkefjord',
    lat: 58.2967,
    lng: 6.6628,
    blurb:
      'I Flekkefjord sitter vi sentralt i Elvegaten 22. Kontoret betjener næringslivet i Lister-regionen – med kort vei til både kunder og kollegaer.',
  },
];

export function getOfficeBySlug(slug: string): Office | undefined {
  return offices.find((o) => o.slug === slug);
}
