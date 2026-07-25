import Link from "next/link";
import { MobileMenuToggle } from "./MobileMenuToggle";

interface MenuLink {
  id: string;
  label: string;
  href: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "P";
}

export function Header({
  siteName,
  items,
}: {
  siteName: string;
  items: MenuLink[];
}) {
  return (
    <header className="sticky top-4 z-50 px-4">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-border bg-background/90 px-3 py-3 backdrop-blur">
        <Link
          href="/"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground text-sm font-black text-background"
        >
          {getInitials(siteName)}
        </Link>

        <nav className="hidden items-center gap-1 rounded-full sm:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-full px-4 py-2 text-xs font-semibold tracking-widest text-muted uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-xs font-semibold tracking-widest text-background uppercase sm:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
          Liên hệ
        </a>

        <MobileMenuToggle items={items} />
      </div>
    </header>
  );
}
