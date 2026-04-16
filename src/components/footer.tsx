import Link from "next/link";
import { SiteLogo } from "@/components/site-logo";

export function Footer() {
  return (
    <footer className="mt-20 bg-brand-blue text-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr,1fr,1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <SiteLogo />
            <div>
              <p className="font-display text-xl font-bold">Collège Saint Thomas d&rsquo;Aquin</p>
              <p className="text-sm text-white/70">Former, servir, rayonner.</p>
            </div>
          </div>
          <p className="max-w-md text-sm text-white/80">
            Etablissement bilingue dedie a l&rsquo;excellence academique, a la discipline
            et au developpement integral de chaque eleve.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-brand-gold">Contact</p>
          <p>Avenue de l&rsquo;Education, Quartier Saint Joseph</p>
          <p>+234 800 123 4567</p>
          <p>contact@sta-college.edu</p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-semibold text-brand-gold">Suivez-nous</p>
          <div className="flex gap-3">
            <Link href="#" className="rounded-full border border-white/20 px-4 py-2">
              Facebook
            </Link>
            <Link href="#" className="rounded-full border border-white/20 px-4 py-2">
              Instagram
            </Link>
          </div>
          <p className="pt-4 text-white/60">
            © {new Date().getFullYear()} Complexe Scolaire Bilingue Thomas D&rsquo;Acquin.
          </p>
        </div>
      </div>
    </footer>
  );
}
