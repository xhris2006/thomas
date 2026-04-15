import { prisma } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { GalleryLightbox } from "@/components/gallery-lightbox";

export default async function GaleriePage({
  searchParams,
}: {
  searchParams: { year?: string; category?: string };
}) {
  const year = searchParams.year;
  const category = searchParams.category;

  const events = await prisma.event.findMany({
    where: {
      ...(category ? { category } : {}),
      ...(year
        ? {
            date: {
              gte: new Date(`${year}-01-01`),
              lt: new Date(`${Number(year) + 1}-01-01`),
            },
          }
        : {}),
    },
    include: { photos: true },
    orderBy: { date: "desc" },
  });

  const years = Array.from(new Set(events.map((event) => String(new Date(event.date).getFullYear()))));
  const categories = Array.from(new Set(events.map((event) => event.category)));

  const items = events.flatMap((event) =>
    event.photos.map((photo) => ({
      id: photo.id,
      title: event.title,
      date: formatDate(event.date),
      url: photo.url,
    })),
  );

  return (
    <section className="section-shell py-16">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Galerie</p>
          <h1 className="font-display text-4xl font-bold text-brand-blue">Souvenirs des evenements</h1>
        </div>
        <form className="flex flex-wrap gap-3">
          <select name="year" defaultValue={year ?? ""} className="input-field min-w-[160px]">
            <option value="">Toutes les annees</option>
            {years.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
          <select name="category" defaultValue={category ?? ""} className="input-field min-w-[180px]">
            <option value="">Toutes les categories</option>
            {categories.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
          <button className="button-primary" type="submit">
            Filtrer
          </button>
        </form>
      </div>
      <GalleryLightbox items={items} />
    </section>
  );
}
