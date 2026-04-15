import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";

export const runtime = "nodejs";

async function assertAdmin() {
  const session = await getServerSession(authOptions);
  return session?.user.role === "ADMIN";
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  const imageUrl =
    image instanceof File && image.size > 0
      ? await saveUploadedFile(image, "announcements")
      : undefined;

  await prisma.announcement.update({
    where: { id: params.id },
    data: {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      publishedAt: new Date(String(formData.get("publishedAt") ?? new Date())),
      ...(imageUrl ? { imageUrl } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.announcement.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
