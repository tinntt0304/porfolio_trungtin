interface Skill {
  id: string;
  name: string;
  level: number | null;
}

export function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          (02) — Kỹ năng
        </p>
        <h2 className="mb-10 text-3xl font-black tracking-tight sm:text-4xl">
          Những gì tôi làm được.
        </h2>
        <div className="divide-y divide-border border-t border-border">
          {skills.map((skill, index) => (
            <div
              key={skill.id}
              className="flex items-center gap-6 py-4 sm:gap-10"
            >
              <span className="w-8 shrink-0 text-sm font-semibold text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-40 shrink-0 text-sm font-semibold sm:w-56 sm:text-base">
                {skill.name}
              </span>
              {skill.level != null && (
                <div className="h-1 w-full bg-border">
                  <div
                    className="h-1 bg-foreground"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
