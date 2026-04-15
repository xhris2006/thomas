"use client";

import { FormEvent, useState } from "react";

export function EventForm() {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const body = new FormData(event.currentTarget);
    await fetch("/api/admin/events", { method: "POST", body });
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input name="title" required placeholder="Titre de l'evenement" className="input-field" />
      <div className="grid gap-4 md:grid-cols-2">
        <input name="date" type="date" required className="input-field" />
        <select name="category" required className="input-field">
          <option value="">Categorie</option>
          <option value="Fete scolaire">Fete scolaire</option>
          <option value="Competition sportive">Competition sportive</option>
          <option value="Remise des prix">Remise des prix</option>
        </select>
      </div>
      <input name="photos" type="file" accept="image/*" multiple required className="input-field py-2.5" />
      <button type="submit" disabled={submitting} className="button-primary w-full sm:w-fit">
        {submitting ? "Ajout..." : "Ajouter l'evenement"}
      </button>
    </form>
  );
}
