import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Role } from "@prisma/client";
import { authOptions } from "@/lib/auth";

export async function requireSession() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/connexion");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireSession();

  if (session.user.role !== Role.ADMIN) {
    redirect("/connexion");
  }

  return session;
}
