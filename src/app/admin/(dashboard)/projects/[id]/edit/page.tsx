import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProject } from "@/actions/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, images] = await Promise.all([
    prisma.project.findUnique({ where: { id } }),
    prisma.image.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  if (!project) {
    notFound();
  }

  const boundUpdate = updateProject.bind(null, project.id);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Sửa dự án
      </h1>
      <ProjectForm
        action={boundUpdate}
        images={images}
        defaultValues={{
          title: project.title,
          slug: project.slug,
          description: project.description,
          repoUrl: project.repoUrl ?? "",
          demoUrl: project.demoUrl ?? "",
          order: project.order,
          coverImageId: project.coverImageId,
        }}
      />
    </div>
  );
}
