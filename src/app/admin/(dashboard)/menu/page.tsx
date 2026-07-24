import { prisma } from "@/lib/prisma";
import { createMenuItem, updateMenuItem, deleteMenuItem } from "@/actions/menu";

export default async function MenuAdminPage() {
  const items = await prisma.menuItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Menu
      </h1>

      <div className="space-y-3">
        {items.map((item) => {
          const boundUpdate = updateMenuItem.bind(null, item.id);
          const boundDelete = deleteMenuItem.bind(null, item.id);
          return (
            <div
              key={item.id}
              className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <form action={boundUpdate} className="grid grid-cols-12 items-end gap-2">
                <div className="col-span-3">
                  <label className="text-xs text-neutral-500">Label</label>
                  <input
                    name="label"
                    defaultValue={item.label}
                    required
                    className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs text-neutral-500">Href</label>
                  <input
                    name="href"
                    defaultValue={item.href}
                    required
                    className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </div>
                <div className="col-span-3">
                  <label className="text-xs text-neutral-500">Parent</label>
                  <select
                    name="parentId"
                    defaultValue={item.parentId ?? ""}
                    className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                  >
                    <option value="">(none)</option>
                    {items
                      .filter((other) => other.id !== item.id)
                      .map((other) => (
                        <option key={other.id} value={other.id}>
                          {other.label}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-xs text-neutral-500">Order</label>
                  <input
                    name="order"
                    type="number"
                    defaultValue={item.order}
                    className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
                  />
                </div>
                <div className="col-span-1 flex items-center gap-1">
                  <input
                    id={`visible-${item.id}`}
                    name="isVisible"
                    type="checkbox"
                    defaultChecked={item.isVisible}
                  />
                  <label htmlFor={`visible-${item.id}`} className="text-xs text-neutral-500">
                    Hiện
                  </label>
                </div>
                <div className="col-span-1">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-neutral-900 px-2 py-1 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
                  >
                    Lưu
                  </button>
                </div>
              </form>
              <form action={boundDelete} className="mt-2 text-right">
                <button
                  type="submit"
                  className="text-xs text-red-600 hover:underline"
                >
                  Xóa
                </button>
              </form>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-dashed border-neutral-300 p-4 dark:border-neutral-700">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
          Thêm mục menu
        </h2>
        <form action={createMenuItem} className="grid grid-cols-12 items-end gap-2">
          <div className="col-span-3">
            <label className="text-xs text-neutral-500">Label</label>
            <input
              name="label"
              required
              className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </div>
          <div className="col-span-3">
            <label className="text-xs text-neutral-500">Href</label>
            <input
              name="href"
              required
              className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </div>
          <div className="col-span-3">
            <label className="text-xs text-neutral-500">Parent</label>
            <select
              name="parentId"
              defaultValue=""
              className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            >
              <option value="">(none)</option>
              {items.map((other) => (
                <option key={other.id} value={other.id}>
                  {other.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1">
            <label className="text-xs text-neutral-500">Order</label>
            <input
              name="order"
              type="number"
              defaultValue={items.length}
              className="w-full rounded-md border border-neutral-300 px-2 py-1 text-sm dark:border-neutral-700 dark:bg-neutral-800"
            />
          </div>
          <div className="col-span-1 flex items-center gap-1">
            <input id="new-visible" name="isVisible" type="checkbox" defaultChecked />
            <label htmlFor="new-visible" className="text-xs text-neutral-500">
              Hiện
            </label>
          </div>
          <div className="col-span-1">
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
  );
}
