interface Skill {
  id: string;
  name: string;
  level: number | null;
}

export function Skills({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  return (
    <section id="skills" className="bg-neutral-50 py-16 dark:bg-neutral-900/40">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Kỹ năng
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id}>
              <p className="mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                {skill.name}
              </p>
              {skill.level != null && (
                <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="h-1.5 rounded-full bg-neutral-900 dark:bg-neutral-100"
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
