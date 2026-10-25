import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { offices, getOfficeBySlug, atOffice } from "@/data/offices";
import { getKontorside } from "@/data/kontorsider";
import KontorMal from "@/components/maler/KontorMal";

export function generateStaticParams() {
  return offices.map((o) => ({ slug: o.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const office = getOfficeBySlug(params.slug);
  if (!office) return { title: "Kontor ikke funnet" };
  const side = getKontorside(office.slug);
  if (side) {
    return pageMetadata({
      absoluteTitle: side.title,
      description: side.description,
      path: `/kontor/${office.slug}/`,
      image: side.image,
    });
  }
  const description =
    office.meta?.description ??
    `${office.blurb} Regnskap, rådgivning og teknologi – lokalt ${atOffice(office)}.`;
  if (office.meta) {
    return pageMetadata({
      absoluteTitle: office.meta.title,
      description,
      path: `/kontor/${office.slug}/`,
      image: office.meta.image,
    });
  }
  return pageMetadata({
    absoluteTitle: `Flyd ${office.city} – autorisert regnskapsfører ${atOffice(office)}`,
    description,
    path: `/kontor/${office.slug}/`,
  });
}

// Alle kontorene bruker samme mal (components/maler/KontorMal.tsx).
export default function KontorPage({ params }: { params: { slug: string } }) {
  const office = getOfficeBySlug(params.slug);
  if (!office) notFound();
  return <KontorMal office={office} />;
}
