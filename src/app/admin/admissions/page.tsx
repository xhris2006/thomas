import { AdmissionStatus } from "@prisma/client";
import { AdminStatusForm } from "@/components/admin-status-form";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guards";
import { formatDate } from "@/lib/utils";

export default async function AdminAdmissionsPage({
  searchParams,
}: {
  searchParams: { status?: AdmissionStatus };
}) {
  await requireAdmin();

  const selectedStatus = searchParams.status;
  const admissions = await prisma.admission.findMany({
    where: selectedStatus ? { status: selectedStatus } : {},
    orderBy: { createdAt: "desc" },
  });

  return (
    <section className="section-shell py-16">
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

      <div className="card-panel overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-brand-blue/10 bg-brand-blue/5">
            <tr>
              <th className="px-4 py-4">Nom</th>
              <th className="px-4 py-4">Classe</th>
              <th className="px-4 py-4">Date</th>
              <th className="px-4 py-4">Statut</th>
              <th className="px-4 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((admission) => (
              <tr key={admission.id} className="border-b border-brand-blue/10">
                <td className="px-4 py-4 font-semibold text-brand-blue">
                  {admission.prenom} {admission.nom}
                </td>
                <td className="px-4 py-4">{admission.classDemandee}</td>
                <td className="px-4 py-4">{formatDate(admission.createdAt)}</td>
                <td className="px-4 py-4">{admission.status}</td>
                <td className="flex gap-2 px-4 py-4">
                  <AdminStatusForm admissionId={admission.id} status="APPROVED" />
                  <AdminStatusForm admissionId={admission.id} status="REJECTED" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
