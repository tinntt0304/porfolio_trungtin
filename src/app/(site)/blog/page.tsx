import Link from "next/link";
import { prisma } from "@/lib/prisma";

const PAGE_SIZE = 10;

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, Number(pageParam) || 1);

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.post.count({ where: { status: "PUBLISHED" } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        Blog
      </h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-xl font-semibold text-neutral-900 hover:underline dark:text-neutral-100"
            >
              {post.title}
            </Link>
            {post.publishedAt && (
              <p className="mt-1 text-xs text-neutral-500">
                {post.publishedAt.toLocaleDateString("vi-VN")}
              </p>
            )}
            {post.excerpt && (
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                {post.excerpt}
              </p>
            )}
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-neutral-500">Chưa có bài viết nào được xuất bản.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex gap-2 text-sm">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/blog?page=${p}`}
              className={
                p === page
                  ? "font-semibold text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-500 hover:underline"
              }
            >
              {p}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
