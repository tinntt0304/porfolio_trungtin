import { prisma } from "@/lib/prisma";
import { createProject } from "@/actions/projects";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default async function NewProjectPage() {
  const images = await prisma.image.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Dự án mới
      </h1>
      <ProjectForm action={createProject} images={images} />
    </div>
  );
}
