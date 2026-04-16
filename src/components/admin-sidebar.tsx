"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "@/components/logout-button";

const adminNavItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: "📊" },
  { href: "/admin/admissions", label: "Admissions", icon: "📝" },
  { href: "/admin/annonces", label: "Annonces", icon: "📢" },
  { href: "/admin/galerie", label: "Galerie", icon: "🖼️" },
];

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue text-white shadow-lg"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:z-30 md:h-screen md:w-64 md:bg-brand-blue md:text-white md:flex md:flex-col md:pt-8">
        <div className="px-6 mb-8">
          <p className="font-display text-xl font-bold">Admin Panel</p>
          <p className="text-xs text-brand-gold mt-1">Complexe Scolaire</p>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
            >
              <span>{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/20 p-4 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors text-sm"
          >
            ← Retour au site
          </Link>
          <div className="px-4 py-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-brand-blue text-white flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <p className="font-display text-lg font-bold">Admin</p>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-2 p-4">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-blue-dark transition-colors"
                >
                  <span>{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/20 p-4 space-y-3">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-brand-blue-dark transition-colors text-sm"
              >
                ← Retour au site
              </Link>
              <div className="px-4 py-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
