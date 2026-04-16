import { AdmissionStatus } from "@prisma/client";
import { AdminSidebar } from "@/components/admin-sidebar";
import { AdmissionsList } from "@/components/admissions-list";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";

export default async function AdminAdmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: AdmissionStatus }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const selectedStatus = params.status;
  const admissions = await prisma.admission.findMany({
    where: selectedStatus ? { status: selectedStatus } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <AdminSidebar />
      <section className="md:ml-64 py-16">
        <div className="section-shell">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Administration</p>
              <h1 className="font-display text-4xl font-bold text-brand-blue">Admissions</h1>
            </div>
            <form className="flex gap-3">
              <select name="status" defaultValue={selectedStatus ?? ""} className="input-field min-w-[180px]">
                <option value="">Tous les statuts</option>
                <option value="PENDING">En attente</option>
                <option value="APPROVED">Approuve</option>
                <option value="REJECTED">Rejete</option>
              </select>
              <button className="button-primary">Filtrer</button>
            </form>
          </div>

          <AdmissionsList admissions={admissions} />
        </div>
      </section>
    </>
  );
}
