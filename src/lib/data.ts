import { AdmissionStatus } from "@prisma/client";
import { prisma } from "@/lib/db";

export async function getHomepageData() {
  const [announcements, events] = await Promise.all([
    prisma.announcement.findMany({
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
    prisma.event.findMany({
      where: { date: { gte: new Date() } },
      include: { photos: true },
      orderBy: { date: "asc" },
      take: 3,
    }),
  ]);

  return { announcements, events };
}

export async function getAdminStats() {
  const [totalAdmissions, pendingAdmissions, totalEvents, totalAnnouncements] =
    await Promise.all([
      prisma.admission.count(),
      prisma.admission.count({ where: { status: AdmissionStatus.PENDING } }),
      prisma.event.count(),
      prisma.announcement.count(),
    ]);

  return {
    totalAdmissions,
    pendingAdmissions,
    totalEvents,
    totalAnnouncements,
  };
}
