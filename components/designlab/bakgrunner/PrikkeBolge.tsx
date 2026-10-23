'use client';

import { useRef } from 'react';
import { useLerret } from './useLerret';

/**
 * «Prikkebølge» (designlab): en bølge som glir sakte over flaten, tegnet med
 * logoens punktum som rastertrykk – jo dypere i bølgen, jo større og lysere
 * punktum, og et lysere punktum langs kammen. «Flyt» laget av punktum. Idé
 * fra «Shader Dithering» og «Sonar Grid» på 21st.dev. Canvas 2D, punktumene
 * samles i noen få lysstyrketrinn og fylles samlet, så det er billig å tegne.
 */

const RUTE = 14; // px mellom punktumene
const TRINN = 10;

export default function PrikkeBolge() {
  const ref = useRef<HTMLCanvasElement>(null);

  useLerret(
    ref,
    (lerret) => {
      const ctx = lerret.getContext('2d');
      if (!ctx) return null;
      let B = 0;
      let H = 0;
      const sm = (a: number, b: number, x: number) => {
        const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
        return t * t * (3 - 2 * t);
      };
      return {
        tilpass: (b, h, dpr) => {
          B = b;
          H = h;
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        },
        tegn: (tid) => {
          const t = tid;
          ctx.clearRect(0, 0, B, H);
          const stier = Array.from({ length: TRINN }, () => new Path2D());
          const kamStier = Array.from({ length: TRINN }, () => new Path2D());
          // Bølgen regnes i piksler, så den har samme form på mobil og desktop.
          const amp = Math.min(H, 600);
          for (let x = RUTE / 2; x < B; x += RUTE) {
            const u = x / B;
            const k = x / 1200;
            const vekt = 0.3 + 0.7 * sm(0.05, 0.75, u);
            // Bølgenes høyde fra bunnen i piksler: én tydelig bølge og én svakere bak, for dybde.
            const h1 = H * 0.25 + amp * (0.15 * Math.sin(k * 5 + t * 0.32) + 0.06 * Math.sin(k * 11 - t * 0.45) + 0.03 * Math.sin(k * 2 + t * 0.2));
            const h2 = H * 0.42 + amp * (0.1 * Math.sin(k * 4 - t * 0.25 + 1.7) + 0.05 * Math.sin(k * 9 + t * 0.38));
            for (let y = RUTE / 2; y < H; y += RUTE) {
              const yb = H - y;
              const dyp1 = Math.min(1, Math.max(0, (h1 - yb) / (amp * 0.38)));
              const dyp2 = Math.min(1, Math.max(0, (h2 - yb) / (amp * 0.5))) * 0.35;
              const kam = Math.exp(-Math.abs(yb - h1) / 16) * 0.9;
              const v = Math.max(dyp1 * 0.75, dyp2, kam) * vekt;
              if (v < 0.04) continue;
              const side = 1 + 3.6 * v;
              const trinn = Math.min(TRINN - 1, Math.floor(v * TRINN));
              (kam > dyp1 * 0.75 && kam > 0.35 ? kamStier : stier)[trinn].rect(x - side / 2, y - side / 2, side, side);
            }
          }
          for (let i = 0; i < TRINN; i++) {
            const a = 0.14 + (i / (TRINN - 1)) * 0.7;
            ctx.fillStyle = `rgba(139, 194, 187, ${a.toFixed(3)})`;
            ctx.fill(stier[i]);
            ctx.fillStyle = `rgba(248, 246, 241, ${(a * 0.9).toFixed(3)})`;
            ctx.fill(kamStier[i]);
          }
        },
      };
    },
    { maksDpr: 2, fps: 30 },
  );

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
