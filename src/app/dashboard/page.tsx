import { requireSession } from "@/lib/guards";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <section className="section-shell py-16">
      <div className="card-panel p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Espace utilisateur</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-brand-blue">Bonjour {session.user.email}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-brand-blue/70">
          Votre compte est actif. Cet espace peut etre etendu pour le suivi des
          admissions, les communications scolaires et les informations administratives.
        </p>
      </div>
    </section>
  );
}
