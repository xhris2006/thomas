"use client";

import { FormEvent, useState } from "react";

type ExistingAnnouncement = {
  id: string;
  title: string;
  content: string;
};

export function AnnouncementForm({ announcement }: { announcement?: ExistingAnnouncement }) {
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const body = new FormData(event.currentTarget);
    const method = announcement ? "PUT" : "POST";
    const endpoint = announcement
      ? `/api/admin/announcements/${announcement.id}`
      : "/api/admin/announcements";

    await fetch(endpoint, { method, body });
    window.location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <input
        name="title"
        required
        defaultValue={announcement?.title}
        placeholder="Titre de l'annonce"
        className="input-field"
      />
      <textarea
        name="content"
        required
        defaultValue={announcement?.content}
        rows={6}
        placeholder="Contenu"
        className="input-field resize-none"
      />
      <input
        name="publishedAt"
        type="date"
        defaultValue={new Date().toISOString().slice(0, 10)}
        className="input-field"
      />
      <input name="image" type="file" accept="image/*" className="input-field py-2.5" />
      <button type="submit" disabled={submitting} className="button-primary w-full sm:w-fit">
        {submitting ? "Enregistrement..." : announcement ? "Mettre a jour" : "Publier"}
      </button>
    </form>
  );
}
