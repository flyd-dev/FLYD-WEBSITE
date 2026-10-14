import { ButtonLink } from '@/components/Button';

/**
 * «Gi oss en anmeldelse på Google» i besøkskortet på kontorsidene. Lenken
 * kommer fra `googleReviewUrls` i data/offices.ts; uten lenke vises ingenting.
 * Åpnes i ny fane (ButtonLink external setter rel="noopener noreferrer").
 */
export default function GoogleAnmeldelse({ url }: { url?: string }) {
  if (!url) return null;
  return (
    <div className="mt-3">
      <ButtonLink href={url} variant="secondary" withArrow external className="w-full">
        Gi oss en anmeldelse på Google
      </ButtonLink>
      {/* Skifer, ikke Flyd-teal: liten tekst på lys bunn */}
      <p className="mt-2 text-center text-[14px] text-flyd-skifer">Åpnes i ny fane</p>
    </div>
  );
}
