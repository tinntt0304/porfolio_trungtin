import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env before seeding",
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Your Name",
      title: "Full-stack Developer",
      bio: "Xin chào! Đây là đoạn giới thiệu ngắn về bạn. Hãy chỉnh sửa trong trang Admin > Settings.",
      email: adminEmail,
    },
  });

  const menuItems = [
    { label: "Home", href: "/", order: 0 },
    { label: "About", href: "/#about", order: 1 },
    { label: "Skills", href: "/#skills", order: 2 },
    { label: "Projects", href: "/#projects", order: 3 },
    { label: "Blog", href: "/blog", order: 4 },
    { label: "Contact", href: "/#contact", order: 5 },
  ];
  for (const item of menuItems) {
    const existing = await prisma.menuItem.findFirst({
      where: { label: item.label, parentId: null },
    });
    if (!existing) {
      await prisma.menuItem.create({ data: item });
    }
  }

  const samplePost = await prisma.post.findUnique({
    where: { slug: "hello-world" },
  });
  if (!samplePost) {
    await prisma.post.create({
      data: {
        title: "Hello World",
        slug: "hello-world",
        excerpt: "Bài viết mẫu — xóa hoặc chỉnh sửa trong Admin > Posts.",
        content:
          "# Hello World\n\nĐây là bài viết mẫu (trạng thái **draft**). Vào **Admin > Posts** để chỉnh sửa hoặc xuất bản.",
        status: "DRAFT",
      },
    });
  }

  const sampleProject = await prisma.project.findUnique({
    where: { slug: "sample-project" },
  });
  if (!sampleProject) {
    await prisma.project.create({
      data: {
        title: "Sample Project",
        slug: "sample-project",
        description: "Dự án mẫu — chỉnh sửa trong Admin > Projects.",
        order: 0,
      },
    });
  }

  console.log("Seed complete. Admin login:", adminEmail);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
