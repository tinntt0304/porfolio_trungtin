"use client";

import { useState } from "react";
import Link from "next/link";

interface MenuLink {
  id: string;
  label: string;
  href: string;
}

export function MobileMenuToggle({ items }: { items: MenuLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-[calc(100%+0.5rem)] rounded-3xl border border-border bg-background p-4 shadow-lg">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-xs font-semibold tracking-widest text-muted uppercase"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
