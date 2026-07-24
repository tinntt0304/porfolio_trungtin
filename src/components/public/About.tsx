export function About({ bio }: { bio: string | undefined }) {
  return (
    <section id="about" className="mx-auto max-w-3xl px-4 py-16">
      <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Giới thiệu
      </h2>
      <p className="whitespace-pre-line leading-relaxed text-neutral-600 dark:text-neutral-400">
        {bio}
      </p>
    </section>
  );
}
