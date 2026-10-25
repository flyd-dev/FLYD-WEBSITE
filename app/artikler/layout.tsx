import ArtikkelInnhold from '@/components/ArtikkelInnhold';

// Innholdsfortegnelsen viser seg bare på artikler med minst tre seksjoner, ikke på oversikten.
export default function ArtiklerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ArtikkelInnhold />
    </>
  );
}
