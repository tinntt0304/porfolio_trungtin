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
    <section id="projects" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          (03) — Dự án
        </p>
        <h2 className="mb-10 text-3xl font-black tracking-tight sm:text-4xl">
          Những gì tôi xây dựng.
        </h2>
        <div className="divide-y divide-border border-t border-border">
          {projects.map((project, index) => {
            const link = project.demoUrl ?? project.repoUrl;
            return (
              <div key={project.id} className="flex items-start gap-6 py-6 sm:gap-10">
                <span className="w-8 shrink-0 text-sm font-semibold text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.coverImage && (
                  <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden border border-border sm:block">
                    <Image
                      src={project.coverImage.url}
                      alt={project.title}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-bold sm:text-xl">{project.title}</h3>
                  <p className="mt-1 text-sm text-muted">{project.description}</p>
                </div>
                <div className="flex shrink-0 gap-4 text-xs font-semibold tracking-widest uppercase">
                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 hover:opacity-60"
                    >
                      Xem <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
