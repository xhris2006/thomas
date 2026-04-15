"use client";

import { useTransition } from "react";

export function AdminDeleteButton({
  endpoint,
  label,
}: {
  endpoint: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() =>
        startTransition(async () => {
          await fetch(endpoint, { method: "DELETE" });
          window.location.reload();
        })
      }
      className="rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
    >
      {pending ? "Suppression..." : label}
    </button>
  );
}
