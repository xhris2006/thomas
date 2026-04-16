"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoutButton } from "@/components/logout-button";

const adminNavItems = [
  { href: "/admin", label: "Vue d'ensemble", icon: "chart" },
  { href: "/admin/admissions", label: "Admissions", icon: "clipboard" },
  { href: "/admin/annonces", label: "Annonces", icon: "bell" },
  { href: "/admin/galerie", label: "Galerie", icon: "image" },
];

const IconChart = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const IconClipboard = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
);

const IconBell = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
  </svg>
);

const IconImage = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "chart":
      return <IconChart />;
    case "clipboard":
      return <IconClipboard />;
    case "bell":
      return <IconBell />;
    case "image":
      return <IconImage />;
    default:
      return null;
  }
};

export function AdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-40 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue text-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:z-30 md:h-screen md:w-64 md:bg-gradient-to-b md:from-brand-blue md:to-brand-blue/95 md:text-white md:flex md:flex-col md:pt-8 md:shadow-2xl">
        <div className="px-6 mb-8">
          <p className="font-display text-xl font-bold">Admin</p>
          <p className="text-xs text-brand-gold mt-1">Tableau de bord</p>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-white/20 hover:translate-x-1 group"
            >
              <span className="opacity-80 group-hover:opacity-100 transition-opacity">{getIcon(item.icon)}</span>
              <span className="text-sm font-medium group-hover:font-semibold">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/20 p-4 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm group hover:translate-x-1"
          >
            <svg className="w-4 h-4 opacity-80 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour au site
          </Link>
          <div className="pt-2">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-all"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-brand-blue to-brand-blue/95 text-white flex flex-col shadow-2xl transition-transform duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <p className="font-display text-lg font-bold">Admin</p>
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

            <nav className="flex-1 space-y-2 p-4 overflow-y-auto">
              {adminNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/20 hover:translate-x-1 transition-all duration-300 group"
                >
                  <span className="opacity-80 group-hover:opacity-100 transition-opacity">{getIcon(item.icon)}</span>
                  <span className="text-sm font-medium group-hover:font-semibold">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/20 p-4 space-y-3">
              <Link
                href="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/20 transition-all text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour au site
              </Link>
              <div className="pt-2">
                <LogoutButton />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
