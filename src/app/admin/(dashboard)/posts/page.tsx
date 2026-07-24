import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePost } from "@/actions/posts";

export default async function AdminPostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Posts
        </h1>
        <Link
          href="/admin/posts/new"
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          + Bài viết mới
        </Link>
      </div>

      <div className="space-y-2">
        {posts.map((post) => {
          const boundDelete = deletePost.bind(null, post.id);
          return (
            <div
              key={post.id}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {post.title}
                </p>
                <p className="text-xs text-neutral-500">
                  /{post.slug} ·{" "}
                  <span
                    className={
                      post.status === "PUBLISHED" ? "text-green-600" : "text-amber-600"
                    }
                  >
                    {post.status}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/posts/${post.id}/edit`}
                  className="text-sm text-neutral-700 hover:underline dark:text-neutral-300"
                >
                  Sửa
                </Link>
                <form action={boundDelete}>
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Xóa
                  </button>
                </form>
              </div>
            </div>
          );
        })}
        {posts.length === 0 && (
          <p className="text-sm text-neutral-500">Chưa có bài viết nào.</p>
        )}
      </div>
    </div>
  );
}
