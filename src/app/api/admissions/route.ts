import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendMail } from "@/lib/mailer";
import { saveUploadedFile } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const document = formData.get("document");
  let documentUrl: string | undefined;

  if (document instanceof File && document.size > 0) {
    documentUrl = await saveUploadedFile(document, "admissions");
  }

  const admission = await prisma.admission.create({
    data: {
      nom: String(formData.get("nom") ?? ""),
      prenom: String(formData.get("prenom") ?? ""),
      dateNaissance: new Date(String(formData.get("dateNaissance") ?? "")),
      sexe: String(formData.get("sexe") ?? ""),
      classDemandee: String(formData.get("classDemandee") ?? ""),
      nomParent: String(formData.get("nomParent") ?? ""),
      telephone: String(formData.get("telephone") ?? ""),
      email: String(formData.get("email") ?? ""),
      adresse: String(formData.get("adresse") ?? ""),
      documentUrl,
    },
  });

  await sendMail({
    to: admission.email,
    subject: "Confirmation de reception de votre dossier",
    html: `<p>Bonjour,</p><p>Votre demande d'admission a bien ete recue sous la reference <strong>${admission.reference}</strong>.</p>`,
  });

  return NextResponse.json({ reference: admission.reference });
}
