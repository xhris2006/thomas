"use client";

import Image from "next/image";
import { useState } from "react";

type GalleryItem = {
  id: string;
  title: string;
  date: string;
  url: string;
};

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(item)}
            className="card-panel overflow-hidden text-left"
          >
            <div className="relative h-64">
              <Image src={item.url} alt={item.title} fill className="object-cover" />
            </div>
            <div className="space-y-2 p-5">
              <h3 className="font-display text-xl font-semibold text-brand-blue">{item.title}</h3>
              <p className="text-sm text-brand-blue/60">{item.date}</p>
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-blue/80 p-4">
          <button type="button" className="absolute right-6 top-6 text-3xl text-white" onClick={() => setActive(null)}>
            ×
          </button>
          <div className="relative h-[70vh] w-full max-w-5xl overflow-hidden rounded-3xl">
            <Image src={active.url} alt={active.title} fill className="object-contain" />
          </div>
        </div>
      ) : null}
    </>
  );
}
