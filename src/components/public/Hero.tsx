import Image from "next/image";

interface Profile {
  name: string;
  title: string;
  avatar?: { url: string } | null;
}

export function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section className="grid lg:grid-cols-2 lg:items-stretch">
      <div className="flex flex-col justify-center gap-6 px-4 py-16 sm:px-6 sm:py-20 lg:px-12">
        <p className="text-xs font-semibold tracking-[0.2em] text-muted uppercase">
          Portfolio — Est. {new Date().getFullYear()}
        </p>
        <h1 className="text-6xl leading-[0.95] font-black tracking-tight uppercase sm:text-7xl">
          {profile?.name ?? "Your Name"}
          <span className="text-red-500">.</span>
        </h1>
        <p className="text-sm font-semibold tracking-[0.2em] text-muted uppercase sm:text-base">
          {profile?.title ?? "Full-stack Developer"}
        </p>
        <div className="mt-2 flex gap-4">
          <a
            href="#projects"
            className="flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-xs font-semibold tracking-widest text-background uppercase transition-opacity hover:opacity-80"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            Xem dự án
          </a>
          <a
            href="#contact"
            className="rounded-full border border-foreground px-6 py-3 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-foreground hover:text-background"
          >
            Liên hệ
          </a>
        </div>
        <p className="mt-6 text-xs font-semibold tracking-widest text-muted uppercase">
          Cuộn để khám phá
        </p>
      </div>

      <div className="relative h-[60vh] w-full sm:h-[75vh] lg:h-screen">
        {profile?.avatar ? (
          <Image
            src={profile.avatar.url}
            alt={profile.name}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-foreground/5 text-xs font-semibold tracking-widest text-muted uppercase">
            Ảnh đại diện
          </div>
        )}
      </div>
    </section>
  );
}
