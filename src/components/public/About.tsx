export function About({ bio }: { bio: string | undefined }) {
  return (
    <section id="about" className="border-t border-border px-4 py-20">
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          (01) — Giới thiệu
        </p>
        <h2 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">
          Về tôi.
        </h2>
        <p className="text-lg leading-relaxed whitespace-pre-line text-muted">
          {bio}
        </p>
      </div>
    </section>
  );
}
