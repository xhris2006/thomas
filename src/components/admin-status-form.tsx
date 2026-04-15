"use client";

import { useTransition } from "react";

export function AdminStatusForm({
  admissionId,
  status,
}: {
  admissionId: string;
  status: "APPROVED" | "REJECTED";
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await fetch(`/api/admin/admissions/${admissionId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
          });
          window.location.reload();
        })
      }
      className={`rounded-full px-3 py-2 text-xs font-semibold ${
        status === "APPROVED"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {pending ? "Traitement..." : status === "APPROVED" ? "Approuver" : "Rejeter"}
    </button>
  );
}
