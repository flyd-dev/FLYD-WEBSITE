'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * Forhåndsvisning: flere forslag til samme plass på siden. Standard vises
 * først; `?<navn>=<variant>` i adressen bytter, f.eks. `/?kunder=flyt`.
 * Byttet skjer etter lasting, så det statiske HTML-et alltid har standarden.
 */
export default function Variant({
  navn,
  standard,
  varianter,
}: {
  navn: string;
  standard: string;
  varianter: Record<string, ReactNode>;
}) {
  const [valgt, setValgt] = useState(standard);
  const nokler = Object.keys(varianter).join(',');

  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(navn);
    if (v && nokler.split(',').includes(v)) setValgt(v);
  }, [navn, nokler]);

  return <>{varianter[valgt] ?? varianter[standard]}</>;
}
