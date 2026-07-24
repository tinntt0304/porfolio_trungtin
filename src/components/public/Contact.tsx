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
    <section id="contact" className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h2 className="mb-4 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Liên hệ
      </h2>
      <p className="mb-6 text-neutral-500">
        Bạn muốn hợp tác hoặc trao đổi công việc? Liên hệ mình qua các kênh dưới đây.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href!}
            target={link.label === "Email" ? undefined : "_blank"}
            rel="noreferrer"
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
          >
            {link.label}
          </a>
        ))}
        {links.length === 0 && (
          <p className="text-sm text-neutral-400">Chưa có thông tin liên hệ.</p>
        )}
      </div>
    </section>
  );
}
