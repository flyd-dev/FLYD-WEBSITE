import type { MetadataRoute } from 'next';

/**
 * Valget om AI-crawlere (okt. 2026): alle slippes inn.
 *
 * Målet for flyd.no er at Flyd skal nevnes og lenkes når noen spør en
 * AI-assistent om regnskap, ERP og integrasjoner i Rogaland og Agder. Det
 * krever at søke- og brukerhentere (OAI-SearchBot, ChatGPT-User,
 * Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User) kan lese
 * sidene. Treningscrawlerne (GPTBot, ClaudeBot, Google-Extended, CCBot,
 * Applebot-Extended, meta-externalagent) er også tillatt: innholdet er
 * offentlig markedsføring, og at modellene kjenner Flyd er en fordel.
 *
 * Vil Flyd stenge for trening, endres `allow` til `disallow` for gruppen
 * «trening» under – søkehenterne påvirkes ikke.
 *
 * Hver bot står eksplisitt, så valget er synlig. NB: en bot med egen gruppe
 * leser bare den gruppen, ikke «*».
 */
const aiSok = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
];

const aiTrening = [
  'GPTBot',
  'ClaudeBot',
  'Google-Extended',
  'Applebot-Extended',
  'CCBot',
  'meta-externalagent',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiSok, allow: '/' },
      { userAgent: aiTrening, allow: '/' },
    ],
    sitemap: 'https://www.flyd.no/sitemap.xml',
  };
}
