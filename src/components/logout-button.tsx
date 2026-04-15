"use client";

import { signOut } from "next-auth/react";

export function LogoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-brand-blue/20 px-4 py-2 text-sm font-semibold text-brand-blue"
    >
      Deconnexion
    </button>
  );
}
