"use client";

import { SessionProvider } from "next-auth/react";
import { AdminStatusModal } from "@/components/admin-status-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminStatusModal />
      {children}
    </SessionProvider>
  );
}