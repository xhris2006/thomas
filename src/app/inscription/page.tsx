import { AdmissionForm } from "@/components/admission-form";

export default function InscriptionPage() {
  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-4xl card-panel p-8 sm:p-10">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-gold">
            Admission
          </p>
          <h1 className="font-display text-4xl font-bold text-brand-blue">
            Formulaire d&rsquo;inscription
          </h1>
          <p className="text-sm leading-7 text-brand-blue/70">
            Remplissez soigneusement les informations de l&rsquo;eleve et joignez un
            document justificatif pour lancer le traitement du dossier.
          </p>
        </div>
        <AdmissionForm />
      </div>
    </section>
  );
}
