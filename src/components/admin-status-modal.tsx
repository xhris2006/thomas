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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl animate-in zoom-in-95">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isAdmin 
                  ? "bg-brand-blue/10 text-brand-blue" 
                  : "bg-emerald-100 text-emerald-600"
              }`}
            >
              {isAdmin ? (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              )}
            </div>
          </div>

          <h2 className="font-display text-2xl font-bold text-brand-blue mb-2">
            {isAdmin ? "Administrateur" : "Utilisateur"}
          </h2>

          <p className="text-brand-blue/70 mb-8">
            {isAdmin
              ? "Vous avez accès à l'espace d'administration."
              : "Bienvenue dans votre espace personnel."}
          </p>

          <div className="space-y-3">
            {isAdmin ? (
              <>
                <Link
                  href="/admin"
                  className="block w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Accéder au tableau de bord
                </Link>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full border-2 border-brand-blue text-brand-blue font-semibold py-3 rounded-lg hover:bg-brand-blue/5 transition-all duration-300"
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full bg-brand-blue text-white font-semibold py-3 rounded-lg hover:bg-brand-blue/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Continuer
                </button>
              </>
            )}

            <a
              href={`https://wa.me/?text=Bonjour, je voudrais contacter l'administration du Complexe Scolaire Bilingue Thomas D'Acquin`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-emerald-500 text-white font-semibold py-3 rounded-lg hover:bg-emerald-600 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371 0-.57 0-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.2-5.674 6.694-5.674 11.744 0 3.213.798 6.337 2.314 9.053l-2.425 7.674h7.894l2.410-7.312c2.079-1.245 3.922-3.03 5.166-5.454 1.526-3.009 2.395-6.4 2.395-10.033C20.718 11.39 17.224 6.979 12.051 6.979m0-2C18.487 4.979 24 10.466 24 17.479c0 7.083-5.516 12.811-12.051 12.811S-.051 24.562-.051 17.479C-.051 10.466 5.516 4.979 12.051 4.979z" />
              </svg>
              Contacter par WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
