import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { reference?: string };
}) {
  return (
    <section className="section-shell py-16">
      <div className="mx-auto max-w-2xl rounded-[2rem] bg-brand-blue p-10 text-white shadow-soft">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-gold">Demande envoyee</p>
        <h1 className="mt-4 font-display text-4xl font-bold">Votre dossier a bien ete enregistre.</h1>
        <p className="mt-4 text-white/80">
          Reference:{" "}
          <span className="font-semibold text-brand-gold">
            {searchParams.reference ?? "indisponible"}
          </span>
        </p>
        <Link href="/" className="button-primary mt-8">
          Retour a l&rsquo;accueil
        </Link>
      </div>
    </section>
  );
}
