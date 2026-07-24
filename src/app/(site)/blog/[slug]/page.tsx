import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { markdownToHtml } from "@/lib/markdown";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
    include: { tags: { include: { tag: true } }, coverImage: true },
  });

  if (!post || post.status !== "PUBLISHED") {
    notFound();
  }

  const html = await markdownToHtml(post.content);

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
        {post.title}
      </h1>
      {post.publishedAt && (
        <p className="mt-2 text-xs text-neutral-500">
          {post.publishedAt.toLocaleDateString("vi-VN")}
        </p>
      )}
      {post.tags.length > 0 && (
        <div className="mt-3 flex gap-2">
          {post.tags.map(({ tag }) => (
            <span
              key={tag.id}
              className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}
      <div
        className="prose prose-neutral mt-8 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </article>
  );
}
