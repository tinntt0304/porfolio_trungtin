import { prisma } from "@/lib/prisma";
import { createPost } from "@/actions/posts";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const images = await prisma.image.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Bài viết mới
      </h1>
      <PostForm action={createPost} images={images} />
    </div>
  );
}
