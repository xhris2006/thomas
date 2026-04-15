"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function AdmissionForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/admissions", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      setError(result.error ?? "Une erreur est survenue.");
      setSubmitting(false);
      return;
    }

    router.push(`/inscription/success?reference=${result.reference}`);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
      {error ? (
        <p className="md:col-span-2 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div>
        <label className="label-text">Nom</label>
        <input name="nom" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Prenom</label>
        <input name="prenom" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Date de naissance</label>
        <input name="dateNaissance" required type="date" className="input-field" />
      </div>
      <div>
        <label className="label-text">Sexe</label>
        <select name="sexe" required className="input-field">
          <option value="">Selectionner</option>
          <option value="Masculin">Masculin</option>
          <option value="Feminin">Feminin</option>
        </select>
      </div>
      <div>
        <label className="label-text">Classe demandee</label>
        <input name="classDemandee" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Nom du parent / tuteur</label>
        <input name="nomParent" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Telephone</label>
        <input name="telephone" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Email</label>
        <input name="email" required type="email" className="input-field" />
      </div>
      <div className="md:col-span-2">
        <label className="label-text">Adresse</label>
        <textarea name="adresse" required rows={4} className="input-field resize-none" />
      </div>
      <div className="md:col-span-2">
        <label className="label-text">Document justificatif (PDF ou image)</label>
        <input name="document" type="file" accept=".pdf,image/*" className="input-field py-2.5" />
      </div>
      <div className="md:col-span-2">
        <button type="submit" disabled={submitting} className="button-primary w-full sm:w-auto">
          {submitting ? "Envoi en cours..." : "Soumettre la demande"}
        </button>
      </div>
    </form>
  );
}
