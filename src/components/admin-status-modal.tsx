"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function AdminStatusModal() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Afficher le modal seulement si l'utilisateur est connecté
    if (session?.user) {
      // Vérifier si on a déjà affiché le modal dans cette session
      const shown = sessionStorage.getItem("adminStatusModalShown");
      if (!shown) {
        setShowModal(true);
        sessionStorage.setItem("adminStatusModalShown", "true");
      }
    }
  }, [session]);

  if (!showModal) return null;

  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-lg">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl ${
                isAdmin ? "bg-brand-blue/10" : "bg-emerald-100"
              }`}
            >
              {isAdmin ? "🔐" : "👤"}
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-brand-blue mb-2">
            {isAdmin ? "Administrateur" : "Utilisateur"}
          </h2>

          <p className="text-brand-blue/70 mb-6">
            {isAdmin
              ? "Vous avez accès à l'espace d'administration."
              : "Bienvenue dans votre espace personnel."}
          </p>

          <div className="space-y-3">
            {isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="block w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue/90 transition"
                >
                  Accéder au tableau de bord
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full border-2 border-brand-blue text-brand-blue font-semibold py-3 rounded-lg hover:bg-brand-blue/5 transition"
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue/90 transition"
                >
                  Continuer
                </button>
              </>
            )}

            <a
              href={`https://wa.me/?text=Bonjour, je voudrais contacter l'administration du Complexe Scolaire Bilingue Thomas D'Acquin`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition text-sm"
            >
              💬 Contacter par WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
