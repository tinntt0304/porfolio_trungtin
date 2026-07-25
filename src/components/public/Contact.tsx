interface ProfileContact {
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
}

export function Contact({ profile }: { profile: ProfileContact | null }) {
  const links = [
    { label: "Email", href: profile?.email ? `mailto:${profile.email}` : null },
    { label: "GitHub", href: profile?.github },
    { label: "LinkedIn", href: profile?.linkedin },
    { label: "Twitter", href: profile?.twitter },
    { label: "Facebook", href: profile?.facebook },
  ].filter((link) => link.href);

  return (
    <section
      id="contact"
      className="border-t border-border px-4 py-24 text-center sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          (04) — Bắt đầu
        </p>
        <h2 className="mb-6 text-5xl font-black tracking-tight uppercase sm:text-6xl">
          Liên hệ.
        </h2>
        <p className="mb-10 text-lg text-muted">
          Bạn muốn hợp tác hoặc trao đổi công việc? Liên hệ mình qua các kênh dưới đây.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href!}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noreferrer"
              className="border border-foreground px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors hover:bg-foreground hover:text-background"
            >
              {link.label}
            </a>
          ))}
          {links.length === 0 && (
            <p className="text-sm text-muted">Chưa có thông tin liên hệ.</p>
          )}
        </div>
      </div>
    </section>
  );
}
