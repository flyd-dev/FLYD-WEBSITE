export type Office = {
  city: string;
  name: string;
  street: string;
  postal: string;
  mapsUrl: string;
  lat: number;
  lng: number;
};

export const offices: Office[] = [
  {
    city: 'Stavanger',
    name: 'FOMO',
    street: 'Grenseveien 21',
    postal: '4313 Sandnes',
    mapsUrl: 'https://maps.google.com/?q=Grenseveien+21,+4313+Sandnes',
    lat: 58.8529,
    lng: 5.7354,
  },
  {
    city: 'Egersund',
    name: 'Torvgården',
    street: 'Torget 2',
    postal: '4370 Egersund',
    mapsUrl: 'https://maps.google.com/?q=Torget+2,+4370+Egersund',
    lat: 58.4514,
    lng: 5.9989,
  },
  {
    city: 'Sokndal',
    name: 'Sokndal',
    street: 'Gamleveien 13',
    postal: '4380 Hauge i Dalane',
    mapsUrl: 'https://maps.google.com/?q=Gamleveien+13,+4380+Hauge+i+Dalane',
    lat: 58.3374,
    lng: 6.2714,
  },
  {
    city: 'Moi',
    name: 'Moi',
    street: 'Øyevollveien 10',
    postal: '4460 Moi',
    mapsUrl: 'https://maps.google.com/?q=Øyevollveien+10,+4460+Moi',
    lat: 58.4621,
    lng: 6.5334,
  },
  {
    city: 'Sirdal',
    name: 'Handleriet',
    street: 'Sirdalsveien 7432',
    postal: '4443 Tjørhom',
    mapsUrl: 'https://maps.google.com/?q=Sirdalsveien+7432,+4443+Tjørhom',
    lat: 58.9091,
    lng: 6.8094,
  },
  {
    city: 'Flekkefjord',
    name: 'S32',
    street: 'Strandgaten 32',
    postal: '4400 Flekkefjord',
    mapsUrl: 'https://maps.google.com/?q=Strandgaten+32,+4400+Flekkefjord',
    lat: 58.2967,
    lng: 6.6628,
  },
];
