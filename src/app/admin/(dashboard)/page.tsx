import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [postCount, draftCount, imageCount, projectCount] = await Promise.all([
    prisma.post.count({ where: { status: "PUBLISHED" } }),
    prisma.post.count({ where: { status: "DRAFT" } }),
    prisma.image.count(),
    prisma.project.count(),
  ]);

  const stats = [
    { label: "Published posts", value: postCount },
    { label: "Draft posts", value: draftCount },
    { label: "Images", value: imageCount },
    { label: "Projects", value: projectCount },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Dashboard
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
          >
            <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {stat.value}
            </p>
            <p className="text-sm text-neutral-500">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
