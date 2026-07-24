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
    <footer className="border-t border-neutral-200 py-8 dark:border-neutral-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-4 text-sm text-neutral-500">
        <div className="flex gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href!}
              target={link.label === "Email" ? undefined : "_blank"}
              rel="noreferrer"
              className="hover:text-neutral-800 dark:hover:text-neutral-200"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p>
          © {new Date().getFullYear()} {profile?.name ?? ""}
        </p>
      </div>
    </footer>
  );
}
