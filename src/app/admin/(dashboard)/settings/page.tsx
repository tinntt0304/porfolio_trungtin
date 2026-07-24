import { prisma } from "@/lib/prisma";
import {
  updateProfile,
  createSkill,
  updateSkill,
  deleteSkill,
} from "@/actions/settings";

export default async function SettingsPage() {
  const [profile, images, skills] = await Promise.all([
    prisma.profile.findUnique({ where: { id: 1 } }),
    prisma.image.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="max-w-3xl space-y-10">
      <div>
        <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Settings
        </h1>
        <form action={updateProfile} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Tên</label>
              <input
                name="name"
                required
                defaultValue={profile?.name}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Chức danh</label>
              <input
                name="title"
                required
                defaultValue={profile?.title}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-neutral-600 dark:text-neutral-400">Giới thiệu</label>
            <textarea
              name="bio"
              required
              rows={4}
              defaultValue={profile?.bio}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </div>

          <div>
            <label className="text-sm text-neutral-600 dark:text-neutral-400">Avatar</label>
            <select
              name="avatarId"
              defaultValue={profile?.avatarId ?? ""}
              className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            >
              <option value="">(none)</option>
              {images.map((image) => (
                <option key={image.id} value={image.id}>
                  {image.filename}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Email</label>
              <input
                name="email"
                defaultValue={profile?.email ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">GitHub</label>
              <input
                name="github"
                defaultValue={profile?.github ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">LinkedIn</label>
              <input
                name="linkedin"
                defaultValue={profile?.linkedin ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Twitter</label>
              <input
                name="twitter"
                defaultValue={profile?.twitter ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Facebook</label>
              <input
                name="facebook"
                defaultValue={profile?.facebook ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600 dark:text-neutral-400">Resume URL</label>
              <input
                name="resumeUrl"
                defaultValue={profile?.resumeUrl ?? ""}
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
          </div>

          <button
            type="submit"
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Lưu profile
          </button>
        </form>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          Skills
        </h2>
        <div className="space-y-2">
          {skills.map((skill) => {
            const boundUpdate = updateSkill.bind(null, skill.id);
            const boundDelete = deleteSkill.bind(null, skill.id);
            return (
              <div
                key={skill.id}
                className="rounded-lg border border-neutral-200 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <form action={boundUpdate} className="grid grid-cols-12 items-end gap-2">
                  <div className="col-span-5">
                    <label className="text-xs text-neutral-500">Name</label>
                    <input
                      name="name"
                      defaultValue={skill.name}
                      required
                      className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                    />
                  </div>
                  <div className="col-span-3">
                    <label className="text-xs text-neutral-500">Level (1-5)</label>
                    <input
                      name="level"
                      type="number"
                      min={1}
                      max={5}
                      defaultValue={skill.level ?? ""}
                      className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-neutral-500">Order</label>
                    <input
                      name="order"
                      type="number"
                      defaultValue={skill.order}
                      className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                    />
                  </div>
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                    >
                      Lưu
                    </button>
                  </div>
                </form>
                <form action={boundDelete} className="mt-1 text-right">
                  <button type="submit" className="text-xs text-red-600 hover:underline">
                    Xóa
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        <div className="mt-4 rounded-lg border border-dashed border-neutral-300 p-4 dark:border-neutral-700">
          <h3 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Thêm skill
          </h3>
          <form action={createSkill} className="grid grid-cols-12 items-end gap-2">
            <div className="col-span-5">
              <label className="text-xs text-neutral-500">Name</label>
              <input
                name="name"
                required
                className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div className="col-span-3">
              <label className="text-xs text-neutral-500">Level (1-5)</label>
              <input
                name="level"
                type="number"
                min={1}
                max={5}
                className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-neutral-500">Order</label>
              <input
                name="order"
                type="number"
                defaultValue={skills.length}
                className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
              />
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
              >
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
