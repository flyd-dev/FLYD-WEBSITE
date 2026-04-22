import { ImageResponse } from 'next/og';

export const alt = 'Flyd – Regnskap, rådgivning og teknologi i samme hus';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FFFFFF',
          padding: '80px 96px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              color: '#8BC0BE',
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
          >
            flyd.
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 68,
              fontWeight: 700,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
              color: '#1F1F1F',
              maxWidth: 920,
            }}
          >
            Regnskap, rådgivning og teknologi – i samme hus.
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 40,
              fontSize: 26,
              color: '#1F1F1F',
              opacity: 0.65,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            670+ kunder · 6 kontorer · Sør-Vest-Norge
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
