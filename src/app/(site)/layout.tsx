import { prisma } from "@/lib/prisma";
import { Header } from "@/components/public/Header";
import { Footer } from "@/components/public/Footer";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, menuItems] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.menuItem.findMany({
      where: { parentId: null, isVisible: true },
      orderBy: { order: "asc" },
    }),
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header siteName={profile?.name ?? "Portfolio"} items={menuItems} />
      <main className="flex-1">{children}</main>
      <Footer profile={profile} />
    </div>
  );
}
