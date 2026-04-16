import Image from "next/image";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AnnouncementForm } from "@/components/announcement-form";
import { AdminDeleteButton } from "@/components/admin-delete-button";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { formatDate } from "@/lib/utils";

export default async function AdminAnnouncementsPage() {
  await requireAdmin();
  const announcements = await prisma.announcement.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <section className="md:ml-64 py-16">
        <div className="section-shell grid gap-8 xl:grid-cols-[0.95fr,1.05fr]">
          <div className="card-panel p-8">
            <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Nouvelle annonce</p>
            <h1 className="mt-3 font-display text-3xl font-bold text-brand-blue">Publier une annonce</h1>
            <div className="mt-6">
              <AnnouncementForm />
            </div>
          </div>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <article key={announcement.id} className="card-panel overflow-hidden">
                {announcement.imageUrl ? (
                  <div className="relative h-56">
                    <Image src={announcement.imageUrl} alt={announcement.title} fill className="object-cover" />
                  </div>
                ) : null}
                <div className="space-y-4 p-6">
                  <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">
                    {formatDate(announcement.publishedAt)}
                  </p>
                  <h2 className="font-display text-2xl font-semibold text-brand-blue">{announcement.title}</h2>
                  <p className="text-sm leading-7 text-brand-blue/75">{announcement.content}</p>
                  <AnnouncementForm
                    announcement={{
                      id: announcement.id,
                      title: announcement.title,
                      content: announcement.content,
                    }}
                  />
                  <AdminDeleteButton endpoint={`/api/admin/announcements/${announcement.id}`} label="Supprimer" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
