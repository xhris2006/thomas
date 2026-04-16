"use client";

import { useState } from "react";
import { Admission } from "@prisma/client";
import { AdminStatusForm } from "@/components/admin-status-form";
import { formatDate } from "@/lib/utils";

export function AdmissionsList({ admissions }: { admissions: Admission[] }) {
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);

  return (
    <>
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
              <tr
                key={admission.id}
                className="border-b border-brand-blue/10 cursor-pointer hover:bg-brand-blue/5 transition"
                onClick={() => setSelectedAdmission(admission)}
              >
                <td className="px-4 py-4 font-semibold text-brand-blue">
                  {admission.prenom} {admission.nom}
                </td>
                <td className="px-4 py-4">{admission.classDemandee}</td>
                <td className="px-4 py-4">{formatDate(admission.createdAt)}</td>
                <td className="px-4 py-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      admission.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-700"
                        : admission.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {admission.status}
                  </span>
                </td>
                <td className="flex gap-2 px-4 py-4" onClick={(e) => e.stopPropagation()}>
                  <AdminStatusForm admissionId={admission.id} status="APPROVED" />
                  <AdminStatusForm admissionId={admission.id} status="REJECTED" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal with admission details */}
      {selectedAdmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold text-brand-blue">
                Détails de l&apos;admission
              </h2>
              <button
                onClick={() => setSelectedAdmission(null)}
                className="text-brand-blue/60 hover:text-brand-blue"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Informations de l&apos;élève */}
              <div>
                <h3 className="font-semibold text-brand-blue mb-3">Informations de l&apos;élève</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-brand-blue/70">Prénom</p>
                    <p className="font-semibold">{selectedAdmission.prenom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-blue/70">Nom</p>
                    <p className="font-semibold">{selectedAdmission.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-blue/70">Date de naissance</p>
                    <p className="font-semibold">{formatDate(selectedAdmission.dateNaissance)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-brand-blue/70">Classe demandée</p>
                    <p className="font-semibold">{selectedAdmission.classDemandee}</p>
                  </div>
                </div>
              </div>

              {/* Informations des parents */}
              <div>
                <h3 className="font-semibold text-brand-blue mb-3">Informations du parent</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-brand-blue/70">Nom complet</p>
                    <p className="font-semibold">{selectedAdmission.nomParent}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-brand-blue/70">Email</p>
                      <p className="font-semibold break-all">{selectedAdmission.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-brand-blue/70">Téléphone</p>
                      <p className="font-semibold">{selectedAdmission.telephone}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-brand-blue/70">Adresse</p>
                    <p className="font-semibold">{selectedAdmission.adresse}</p>
                  </div>
                </div>
              </div>

              {/* Document */}
              {selectedAdmission.documentUrl && (
                <div>
                  <h3 className="font-semibold text-brand-blue mb-3">Document justificatif</h3>
                  <a
                    href={selectedAdmission.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-blue text-white px-4 py-2 rounded-lg hover:bg-brand-blue/90 transition text-sm"
                  >
                    📄 Télécharger le document
                  </a>
                </div>
              )}

              {/* Statut */}
              <div>
                <h3 className="font-semibold text-brand-blue mb-3">Statut</h3>
                <p className="mb-4">
                  <span
                    className={`text-sm font-semibold px-4 py-2 rounded-full inline-block ${
                      selectedAdmission.status === "APPROVED"
                        ? "bg-emerald-100 text-emerald-700"
                        : selectedAdmission.status === "REJECTED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {selectedAdmission.status}
                  </span>
                </p>
                <div className="flex gap-2">
                  <AdminStatusForm admissionId={selectedAdmission.id} status="APPROVED" />
                  <AdminStatusForm admissionId={selectedAdmission.id} status="REJECTED" />
                </div>
              </div>

              {/* Date */}
              <div className="text-sm text-brand-blue/70 border-t pt-4">
                Soumis le: {formatDate(selectedAdmission.createdAt)}
              </div>
            </div>

            <button
              onClick={() => setSelectedAdmission(null)}
              className="w-full mt-6 bg-brand-blue/10 text-brand-blue font-semibold py-3 rounded-lg hover:bg-brand-blue/20 transition"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
