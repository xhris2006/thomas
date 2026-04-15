import Image from "next/image";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { EventForm } from "@/components/event-form";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { formatDate } from "@/lib/utils";

export default async function AdminGalleryPage() {
  await requireAdmin();

  const events = await prisma.event.findMany({
    include: { photos: true },
    orderBy: { date: "desc" },
  });

  return (
    <section className="section-shell grid gap-8 py-16 xl:grid-cols-[0.95fr,1.05fr]">
      <div className="card-panel p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Nouvel evenement</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-brand-blue">Gerer la galerie</h1>
        <div className="mt-6">
          <EventForm />
        </div>
      </div>

      <div className="space-y-8">
        {events.map((event) => (
          <article key={event.id} className="card-panel p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">{event.category}</p>
                <h2 className="font-display text-2xl font-semibold text-brand-blue">{event.title}</h2>
                <p className="text-sm text-brand-blue/70">{formatDate(event.date)}</p>
              </div>
              <AdminDeleteButton endpoint={`/api/admin/events/${event.id}`} label="Supprimer l'evenement" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {event.photos.map((photo) => (
                <div key={photo.id} className="overflow-hidden rounded-3xl border border-brand-blue/10 bg-white">
                  <div className="relative h-48">
                    <Image src={photo.url} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <AdminDeleteButton endpoint={`/api/admin/photos/${photo.id}`} label="Supprimer la photo" />
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
