import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePost } from "@/actions/posts";
import { PostForm } from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [post, images] = await Promise.all([
    prisma.post.findUnique({
      where: { id },
      include: { tags: { include: { tag: true } } },
    }),
    prisma.image.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!post) {
    notFound();
  }

  const boundUpdate = updatePost.bind(null, post.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Sửa bài viết
      </h1>
      <PostForm
        action={boundUpdate}
        images={images}
        defaultValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? "",
          content: post.content,
          status: post.status,
          coverImageId: post.coverImageId,
          tags: post.tags.map((t) => t.tag.name).join(", "),
        }}
      />
    </div>
  );
}
