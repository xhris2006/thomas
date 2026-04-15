import Image from "next/image";
import Link from "next/link";
import { HeroSlider } from "@/components/hero-slider";
import { getHomepageData } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const { announcements, events } = await getHomepageData();

  return (
    <div>
      <HeroSlider />

      <section id="apropos" className="section-shell py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
              A propos
            </p>
            <h2 className="font-display text-4xl font-bold text-brand-blue">
              Une mission educative qui conjugue foi, savoir et leadership.
            </h2>
            <p className="text-base leading-8 text-brand-blue/75">
              Le Collège Saint Thomas d'Aquin accompagne chaque eleve dans la
              construction d'un parcours exigeant, bilingue et ouvert sur le
              monde. Notre communaute scolaire encourage l'excellence academique,
              le sens des responsabilites et l'epanouissement personnel.
            </p>
          </div>
          <div className="card-panel bg-school-radial p-8 text-white">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Nos piliers</p>
              <ul className="space-y-3 text-sm text-white/85">
                <li>Enseignement bilingue francais-anglais</li>
                <li>Suivi pedagogique et accompagnement familial</li>
                <li>Vie scolaire disciplinee et ouverte aux talents</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-blue py-16 text-white">
        <div className="section-shell">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Annonces</p>
              <h2 className="font-display text-3xl font-bold">Dernieres informations</h2>
            </div>
            <Link href="/annonces" className="button-secondary">
              Voir tout
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {announcements.map((announcement) => (
              <article key={announcement.id} className="rounded-3xl border border-white/10 bg-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-brand-gold">
                  {formatDate(announcement.publishedAt)}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">{announcement.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/80">
                  {announcement.content.slice(0, 180)}...
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Evenements</p>
            <h2 className="font-display text-3xl font-bold text-brand-blue">
              Apercu des prochains rendez-vous
            </h2>
          </div>
          <Link href="/galerie" className="button-primary">
            Explorer la galerie
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {events.map((event) => (
            <article key={event.id} className="card-panel overflow-hidden">
              <div className="relative h-60">
                <Image
                  src={event.photos[0]?.url ?? "/images/hero-1.jpg"}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-3 p-6">
                <span className="inline-flex rounded-full bg-brand-gold/15 px-3 py-1 text-xs font-semibold text-brand-blue">
                  {event.category}
                </span>
                <h3 className="font-display text-2xl font-semibold text-brand-blue">{event.title}</h3>
                <p className="text-sm text-brand-blue/70">{formatDate(event.date)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
