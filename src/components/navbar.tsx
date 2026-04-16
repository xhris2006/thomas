"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SiteLogo } from "@/components/site-logo";
import { LogoutButton } from "@/components/logout-button";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Accueil" },
];

export function Navbar() {
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-brand-blue/10 bg-white/90 backdrop-blur">
        <div className="section-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <Link href="/" className="flex items-center gap-3">
            <SiteLogo />
            <div>
              <p className="font-display text-lg font-bold text-brand-blue">
                Complexe Scolaire Bilingue Thomas D&rsquo;Acquin
              </p>
              <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
                Travail · Discipline · Succès
              </p>
            </div>
          </Link>

          {/* Hamburger button for mobile */}
          <button
            className="md:hidden p-2 text-brand-blue"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <nav className="hidden md:flex flex-wrap items-center gap-4 text-sm font-semibold text-brand-blue">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="px-4 py-2 rounded-lg transition-all hover:bg-brand-blue hover:text-white">
                {item.label}
              </Link>
            ))}
            {session?.user ? (
              <>
                <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"} className="button-primary">
                  Tableau de bord
                </Link>
              </>
            ) : (
              <Link href="/connexion" className="button-primary">
                Connexion
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all" onClick={() => setSidebarOpen(false)} />
          <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-brand-blue to-brand-blue/95 text-white shadow-2xl animate-in slide-in-from-left">
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <p className="font-display text-lg font-bold">Menu</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col p-4 space-y-2 text-sm font-semibold">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className="px-4 py-3 rounded-lg hover:bg-white/20 transition-all duration-300 hover:translate-x-1"
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {session?.user ? (
                <>
                  <Link 
                    href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"} 
                    className="px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 mt-4"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Tableau de bord
                  </Link>
                  <div className="pt-4 border-t border-white/20">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <Link 
                  href="/connexion" 
                  className="px-4 py-3 rounded-lg bg-white/20 hover:bg-white/30 transition-all duration-300 mt-4"
                  onClick={() => setSidebarOpen(false)}
                >
                  Connexion
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
