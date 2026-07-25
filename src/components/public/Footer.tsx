interface ProfileLinks {
  name: string;
  email?: string | null;
  github?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  facebook?: string | null;
}

export function Footer({ profile }: { profile: ProfileLinks | null }) {
  const links = [
    { label: "GitHub", href: profile?.github },
    { label: "LinkedIn", href: profile?.linkedin },
    { label: "Twitter", href: profile?.twitter },
    { label: "Facebook", href: profile?.facebook },
    { label: "Email", href: profile?.email ? `mailto:${profile.email}` : null },
  ].filter((link) => link.href);

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center">
        <p className="text-xs font-semibold tracking-widest text-muted uppercase">
          {profile?.name ?? "Portfolio"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href!}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noreferrer"
              className="text-xs font-semibold tracking-widest uppercase hover:opacity-60"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {profile?.name ?? ""}
        </p>
      </div>
    </footer>
  );
}
