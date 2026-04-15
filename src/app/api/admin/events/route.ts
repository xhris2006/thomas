import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const photoEntries = formData.getAll("photos").filter((entry): entry is File => entry instanceof File && entry.size > 0);

  const urls = await Promise.all(photoEntries.map((entry) => saveUploadedFile(entry, "events")));

  await prisma.event.create({
    data: {
      title: String(formData.get("title") ?? ""),
      date: new Date(String(formData.get("date") ?? new Date())),
      category: String(formData.get("category") ?? ""),
      photos: {
        create: urls.map((url) => ({ url })),
      },
    },
  });

  return NextResponse.json({ ok: true });
}
