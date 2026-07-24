import Image from "next/image";

interface Profile {
  name: string;
  title: string;
  avatar?: { url: string } | null;
}

export function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-24 text-center">
      {profile?.avatar && (
        <div className="relative h-32 w-32 overflow-hidden rounded-full">
          <Image
            src={profile.avatar.url}
            alt={profile.name}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      )}
      <h1 className="text-4xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-5xl">
        {profile?.name ?? "Your Name"}
      </h1>
      <p className="text-lg text-neutral-500">{profile?.title ?? "Full-stack Developer"}</p>
      <div className="flex gap-3">
        <a
          href="#projects"
          className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
        >
          Xem dự án
        </a>
        <a
          href="#contact"
          className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 dark:border-neutral-700 dark:text-neutral-300"
        >
          Liên hệ
        </a>
      </div>
    </section>
  );
}
