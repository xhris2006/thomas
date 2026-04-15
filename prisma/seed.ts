import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    await prisma.user.upsert({
      where: { email: process.env.ADMIN_EMAIL },
      update: { password: process.env.ADMIN_PASSWORD, role: Role.ADMIN },
      create: {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: Role.ADMIN,
      },
    });
  }

  const announcementCount = await prisma.announcement.count();

  if (!announcementCount) {
    await prisma.announcement.createMany({
      data: [
        {
          title: "Ouverture des inscriptions 2026-2027",
          content:
            "Les demandes d'admission sont ouvertes pour le premier et le second cycle. Les dossiers sont traites dans l'ordre de reception.",
        },
        {
          title: "Journee portes ouvertes",
          content:
            "Les familles sont invitees a rencontrer l'equipe pedagogique et visiter les salles de classe bilingues.",
        },
        {
          title: "Concours de lecture bilingue",
          content:
            "Les eleves participeront a un concours de lecture en francais et en anglais afin de renforcer l'expression orale.",
        },
      ],
    });
  }

  const eventCount = await prisma.event.count();

  if (!eventCount) {
    await prisma.event.create({
      data: {
        title: "Remise des prix d'excellence",
        date: new Date(new Date().getFullYear(), 5, 20),
        category: "Remise des prix",
        photos: {
          create: [{ url: "/images/hero-1.jpg" }],
        },
      },
    });

    await prisma.event.create({
      data: {
        title: "Journee sportive inter-classes",
        date: new Date(new Date().getFullYear(), 6, 12),
        category: "Competition sportive",
        photos: {
          create: [{ url: "/images/hero-2.jpg" }],
        },
      },
    });

    await prisma.event.create({
      data: {
        title: "Fete culturelle bilingue",
        date: new Date(new Date().getFullYear(), 7, 4),
        category: "Fete scolaire",
        photos: {
          create: [{ url: "/images/hero-3.jpg" }],
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
