import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 10;

export default async function AnnoncesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Math.max(1, Number(searchParams.page ?? "1"));
  const [announcements, total] = await Promise.all([
    prisma.announcement.findMany({
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.announcement.count(),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <section className="section-shell py-16">
      <div className="mb-10 space-y-3">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Annonces</p>
        <h1 className="font-display text-4xl font-bold text-brand-blue">Toutes les annonces publiees</h1>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <article key={announcement.id} className="card-panel overflow-hidden">
            {announcement.imageUrl ? (
              <div className="relative h-72">
                <Image src={announcement.imageUrl} alt={announcement.title} fill className="object-cover" />
              </div>
            ) : null}
            <div className="space-y-4 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold">
                {formatDate(announcement.publishedAt)}
              </p>
              <h2 className="font-display text-3xl font-semibold text-brand-blue">{announcement.title}</h2>
              <p className="text-sm leading-8 text-brand-blue/75">{announcement.content}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-between">
        <Link
          href={`/annonces?page=${Math.max(1, page - 1)}`}
          className={`rounded-full px-4 py-2 ${page === 1 ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-brand-blue text-white"}`}
        >
          Precedent
        </Link>
        <p className="text-sm text-brand-blue/70">
          Page {page} sur {totalPages}
        </p>
        <Link
          href={`/annonces?page=${Math.min(totalPages, page + 1)}`}
          className={`rounded-full px-4 py-2 ${page === totalPages ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-brand-blue text-white"}`}
        >
          Suivant
        </Link>
      </div>
    </section>
  );
}
