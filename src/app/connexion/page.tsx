import { LoginForm } from "@/components/login-form";

export default function ConnexionPage() {
  return (
    <section className="section-shell py-16">
      <div className="mx-auto grid max-w-5xl gap-10 overflow-hidden rounded-[2rem] bg-white shadow-soft lg:grid-cols-[1fr,1.1fr]">
        <div className="bg-school-radial p-8 text-white sm:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Connexion</p>
          <h1 className="mt-4 font-display text-4xl font-bold">Accedez a votre espace.</h1>
          <p className="mt-4 text-sm leading-7 text-white/80">
            Les parents, eleves et administrateurs peuvent se connecter ici pour
            consulter leur tableau de bord.
          </p>
        </div>
        <div className="p-8 sm:p-10">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
