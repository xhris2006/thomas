import { Role } from "@prisma/client";
import { prisma } from "@/lib/db";

let hasBootstrapped = false;

export async function ensureBootstrappedData() {
  if (hasBootstrapped) {
    return;
  }

  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    const adminCount = await prisma.user.count({
      where: { role: Role.ADMIN },
    });

    if (!adminCount) {
      await prisma.user.create({
        data: {
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
          role: Role.ADMIN,
        },
      });
    }
  }

  const announcementCount = await prisma.announcement.count();

  if (!announcementCount) {
    await prisma.announcement.createMany({
      data: [
        {
          title: "Bienvenue sur notre portail bilingue",
          content:
            "Notre college forme des eleves enracinés dans l'excellence academique, la foi et le service communautaire.",
        },
        {
          title: "Campagne d'inscription en cours",
          content:
            "Les familles peuvent deposer un dossier d'admission en ligne et suivre l'evolution du traitement par reference.",
        },
        {
          title: "Atelier parents-eleves",
          content:
            "Une rencontre d'orientation est organisee pour presenter le projet educatif bilingue et les filieres disponibles.",
        },
      ],
    });
  }

  const eventCount = await prisma.event.count();

  if (!eventCount) {
    await prisma.event.createMany({
      data: [
        {
          title: "Semaine culturelle bilingue",
          date: new Date(new Date().getFullYear(), 8, 14),
          category: "Fete scolaire",
        },
        {
          title: "Tournoi sportif inter-classes",
          date: new Date(new Date().getFullYear(), 9, 22),
          category: "Competition sportive",
        },
        {
          title: "Ceremonie de remise des prix",
          date: new Date(new Date().getFullYear(), 10, 5),
          category: "Remise des prix",
        },
      ],
    });

    const events = await prisma.event.findMany({
      orderBy: { createdAt: "asc" },
    });

    await prisma.eventPhoto.createMany({
      data: [
        { eventId: events[0].id, url: "/images/hero-1.jpg" },
        { eventId: events[1].id, url: "/images/hero-2.jpg" },
        { eventId: events[2].id, url: "/images/hero-3.jpg" },
      ],
    });
  }

  hasBootstrapped = true;
}
