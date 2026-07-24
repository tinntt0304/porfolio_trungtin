import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "@/actions/projects";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Projects
        </h1>
        <Link
          href="/admin/projects/new"
          className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          + Dự án mới
        </Link>
      </div>

      <div className="space-y-2">
        {projects.map((project) => {
          const boundDelete = deleteProject.bind(null, project.id);
          return (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div>
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  {project.title}
                </p>
                <p className="text-xs text-neutral-500">
                  /{project.slug} · order {project.order}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/projects/${project.id}/edit`}
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
        {projects.length === 0 && (
          <p className="text-sm text-neutral-500">Chưa có dự án nào.</p>
        )}
      </div>
    </div>
  );
}
