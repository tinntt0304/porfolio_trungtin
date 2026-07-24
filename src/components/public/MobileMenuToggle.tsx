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
        className="rounded-md p-2 text-neutral-700 dark:text-neutral-300"
      >
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <nav className="absolute inset-x-0 top-full border-t border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-sm text-neutral-700 dark:text-neutral-300"
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
