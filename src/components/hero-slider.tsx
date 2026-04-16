"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-brand-blue">
      <div className="absolute inset-0">
        {slides.map((slide, slideIndex) => (
          <div
            key={slide}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              slideIndex === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image src={slide} alt="" fill priority className="object-cover object-center" />
            <div className="absolute inset-0 bg-brand-blue/70" />
          </div>
        ))}
      </div>

      <div className="section-shell relative grid min-h-[72vh] items-center py-20 text-white">
        <div className="max-w-3xl space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-brand-gold">
            Complexe Scolaire Bilingue
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Bienvenue au Complexe Scolaire Bilingue Thomas D&rsquo;Acquin
          </h1>
          <p className="max-w-2xl text-base text-white/80 sm:text-lg">
            Un cadre d&rsquo;apprentissage exigeant, humain et inspire par les valeurs
            de Travail, Discipline et Succès.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/inscription" className="button-primary">
              Inscriptions
            </Link>
            <Link href="#apropos" className="button-secondary">
              Nous découvrir
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
