import Image from "next/image";

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  repoUrl: string | null;
  demoUrl: string | null;
  coverImage?: { url: string } | null;
}

export function Projects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="projects" className="mx-auto max-w-5xl px-4 py-16">
      <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Dự án
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800"
          >
            {project.coverImage && (
              <div className="relative h-40 w-full">
                <Image
                  src={project.coverImage.url}
                  alt={project.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500">{project.description}</p>
              <div className="mt-3 flex gap-4 text-sm">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-700 hover:underline dark:text-neutral-300"
                  >
                    Demo
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-neutral-700 hover:underline dark:text-neutral-300"
                  >
                    Source
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
