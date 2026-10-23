'use client';

import { useRef } from 'react';
import { useLerret } from './useLerret';

/**
 * «Glassbrett» (designlab): gjennomsiktige glassplater i Flyd-teal, brettet
 * over hverandre, med et svakt Mint-lys i brettene og en myk skygge under.
 * Platene bærer uttrykket, ikke strekene: lyset i brettene er dempet, så det
 * ikke blir striper bak teksten.
 * Idé fra «Glass Fold» (meerbahadin10) på 21st.dev, skrevet på nytt som en
 * liten WebGL-shader i Flyds farger. Platene er svakest til venstre, der
 * teksten står. Tegnes uten retina-oppløsning, 30 bilder i sekundet, og bare
 * når flaten er synlig.
 */

const rgb = (hex: string) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

const BUNN = { skog: rgb('#17292A'), petrol: rgb('#24494B') };
const GLASS = rgb('#4C8687');
const LYS = rgb('#8BC2BB');

const vert = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const frag = `
precision mediump float;
uniform vec2 uRes;
uniform float uTid;
uniform vec3 uBunn;
uniform vec3 uGlass;
uniform vec3 uLys;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  vec3 col = uBunn;
  col = mix(col, uGlass * 0.6, smoothstep(0.2, 1.5, uv.x + uv.y * 0.4) * 0.35);
  float t = uTid * 0.06;
  float vekt = mix(0.12, 1.0, smoothstep(0.15, 0.85, uv.x));
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float fase = fi * 2.1;
    float kurve = -0.35 + fi * 0.32 + 0.55 * uv.x
      + 0.10 * sin(p.x * 1.6 + t + fase)
      + 0.05 * sin(p.x * 3.1 - t * 1.4 + fase * 1.7);
    float d = p.y - kurve;
    float over = smoothstep(-0.002, 0.004, d);
    float plate = over * (0.12 + 0.6 * exp(-d * 3.0));
    col = mix(col, mix(uGlass, uLys, 0.3), plate * 0.42 * vekt);
    float under = 1.0 - step(0.0, d);
    col *= 1.0 - 0.28 * vekt * under * exp(d * 9.0);
    float kant = exp(-abs(d) * 260.0) * 0.18 + exp(-abs(d) * 18.0) * 0.12;
    col += uLys * kant * vekt * (0.6 + 0.12 * fi);
  }
  col += (hash(gl_FragCoord.xy) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function GlassBrett({ tone = 'skog' }: { tone?: 'skog' | 'petrol' }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useLerret(
    ref,
    (lerret) => {
      const gl = lerret.getContext('webgl', { antialias: false, premultipliedAlpha: false });
      if (!gl) return null;
      const lag = (type: number, kilde: string) => {
        const s = gl.createShader(type)!;
        gl.shaderSource(s, kilde);
        gl.compileShader(s);
        return s;
      };
      const prog = gl.createProgram()!;
      gl.attachShader(prog, lag(gl.VERTEX_SHADER, vert));
      gl.attachShader(prog, lag(gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
      gl.useProgram(prog);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(prog, 'aPos');
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      const uRes = gl.getUniformLocation(prog, 'uRes');
      const uTid = gl.getUniformLocation(prog, 'uTid');
      gl.uniform3fv(gl.getUniformLocation(prog, 'uBunn'), BUNN[tone]);
      gl.uniform3fv(gl.getUniformLocation(prog, 'uGlass'), GLASS);
      gl.uniform3fv(gl.getUniformLocation(prog, 'uLys'), LYS);
      return {
        tilpass: () => {
          gl.viewport(0, 0, lerret.width, lerret.height);
          gl.uniform2f(uRes, lerret.width, lerret.height);
        },
        tegn: (tid) => {
          gl.uniform1f(uTid, tid);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
        },
        // Ikke loseContext her: React kjører effekten to ganger i utvikling, og da ville
        // den andre runden fått en død kontekst (hvit flate).
        rydd: () => {
          gl.deleteBuffer(buf);
          gl.deleteProgram(prog);
        },
      };
    },
    { maksDpr: 1, fps: 30 },
  );

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
