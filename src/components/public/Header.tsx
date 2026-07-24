import Link from "next/link";
import { MobileMenuToggle } from "./MobileMenuToggle";

interface MenuLink {
  id: string;
  label: string;
  href: string;
}

export function Header({
  siteName,
  items,
}: {
  siteName: string;
  items: MenuLink[];
}) {
  return (
    <header className="relative border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="font-semibold text-neutral-900 dark:text-neutral-100">
          {siteName}
        </Link>
        <nav className="hidden gap-6 sm:flex">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenuToggle items={items} />
      </div>
    </header>
  );
}
