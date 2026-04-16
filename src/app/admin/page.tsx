import Link from "next/link";
import { AdminSidebar } from "@/components/admin-sidebar";
import { getAdminStats } from "@/lib/data";
import { requireAdmin } from "@/lib/guards";

export default async function AdminOverviewPage() {
  await requireAdmin();
  const stats = await getAdminStats();

  const cards = [
    ["Total admissions", stats.totalAdmissions],
    ["Admissions en attente", stats.pendingAdmissions],
    ["Evenements", stats.totalEvents],
    ["Annonces", stats.totalAnnouncements],
  ];

  return (
    <>
      <AdminSidebar />
      <section className="md:ml-64 py-16">
        <div className="section-shell">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Administration</p>
              <h1 className="font-display text-4xl font-bold text-brand-blue">Vue d&rsquo;ensemble</h1>
            </div>
            <div className="hidden md:flex gap-3">
              <Link href="/admin/admissions" className="button-primary">
                Admissions
              </Link>
              <Link href="/admin/annonces" className="button-primary">
                Annonces
              </Link>
              <Link href="/admin/galerie" className="button-primary">
                Galerie
              </Link>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {cards.map(([label, value]) => (
              <article key={label} className="card-panel p-6">
                <p className="text-sm font-semibold text-brand-blue/60">{label}</p>
                <p className="mt-4 font-display text-4xl font-bold text-brand-blue">{value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
