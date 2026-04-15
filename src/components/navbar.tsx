import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SiteLogo } from "@/components/site-logo";
import { LogoutButton } from "@/components/logout-button";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/inscription", label: "Inscriptions" },
  { href: "/annonces", label: "Annonces" },
  { href: "/galerie", label: "Galerie" },
];

export async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-40 border-b border-brand-blue/10 bg-white/90 backdrop-blur">
      <div className="section-shell flex flex-wrap items-center justify-between gap-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <SiteLogo />
          <div>
            <p className="font-display text-lg font-bold text-brand-blue">
              Collège Saint Thomas d'Aquin
            </p>
            <p className="text-xs uppercase tracking-[0.24em] text-brand-gold">
              Excellence bilingue
            </p>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-brand-blue">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 hover:bg-brand-blue/5">
              {item.label}
            </Link>
          ))}
          {session?.user ? (
            <>
              <Link href={session.user.role === "ADMIN" ? "/admin" : "/dashboard"} className="button-primary">
                Tableau de bord
              </Link>
              <LogoutButton />
            </>
          ) : (
            <Link href="/connexion" className="button-primary">
              Connexion
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
