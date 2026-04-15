import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { saveUploadedFile } from "@/lib/upload";

export const runtime = "nodejs";

async function assertAdmin() {
  const session = await getServerSession(authOptions);

  if (session?.user.role !== "ADMIN") {
    return false;
  }

  return true;
}

export async function POST(request: Request) {
  if (!(await assertAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const image = formData.get("image");
  const imageUrl =
    image instanceof File && image.size > 0
      ? await saveUploadedFile(image, "announcements")
      : undefined;

  await prisma.announcement.create({
    data: {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      publishedAt: new Date(String(formData.get("publishedAt") ?? new Date())),
      imageUrl,
    },
  });

  return NextResponse.json({ ok: true });
}
