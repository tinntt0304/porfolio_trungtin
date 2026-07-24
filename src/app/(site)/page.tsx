import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/public/Hero";
import { About } from "@/components/public/About";
import { Skills } from "@/components/public/Skills";
import { Projects } from "@/components/public/Projects";
import { Contact } from "@/components/public/Contact";

export default async function HomePage() {
  const [profile, skills, projects] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 }, include: { avatar: true } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({
      orderBy: { order: "asc" },
      include: { coverImage: true },
    }),
  ]);

  return (
    <>
      <Hero profile={profile} />
      <About bio={profile?.bio} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact profile={profile} />
    </>
  );
}
