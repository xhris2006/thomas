import { NextResponse } from "next/server";
import { AdmissionStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/mailer";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as { status: AdmissionStatus };

  const admission = await prisma.admission.update({
    where: { id: params.id },
    data: { status: body.status },
  });

  await sendMail({
    to: admission.email,
    subject: "Mise a jour de votre admission",
    html: `<p>Bonjour,</p><p>Le statut de votre dossier ${admission.reference} est maintenant: <strong>${body.status}</strong>.</p>`,
  });

  return NextResponse.json({ ok: true });
}
