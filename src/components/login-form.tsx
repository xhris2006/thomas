"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (!result || result.error) {
      setError("Identifiants invalides.");
      setSubmitting(false);
      return;
    }

    window.location.href = result.url ?? callbackUrl;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
      <div>
        <label className="label-text">Email</label>
        <input name="email" type="email" required className="input-field" />
      </div>
      <div>
        <label className="label-text">Mot de passe</label>
        <input name="password" type="password" required className="input-field" />
      </div>
      <button type="submit" disabled={submitting} className="button-primary w-full">
        {submitting ? "Connexion..." : "Se connecter"}
      </button>
      <p className="text-sm text-brand-blue/70">
        Pas encore de dossier ?{" "}
        <Link href="/inscription" className="font-semibold text-brand-gold">
          Commencer une inscription
        </Link>
      </p>
    </form>
  );
}
