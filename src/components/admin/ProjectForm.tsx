"use client";

import { useState } from "react";
import { slugify } from "@/lib/slug";

export interface ImageOption {
  id: string;
  url: string;
  filename: string;
}

export interface ProjectFormValues {
  title: string;
  slug: string;
  description: string;
  repoUrl: string;
  demoUrl: string;
  order: number;
  coverImageId: string | null;
}

export function ProjectForm({
  action,
  defaultValues,
  images,
}: {
  action: (formData: FormData) => void;
  defaultValues?: ProjectFormValues;
  images: ImageOption[];
}) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);

  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Title</label>
        <input
          name="title"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (!slugTouched) setSlug(slugify(e.target.value));
          }}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Slug</label>
        <input
          name="slug"
          required
          value={slug}
          onChange={(e) => {
            setSlugTouched(true);
            setSlug(e.target.value);
          }}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Description</label>
        <textarea
          name="description"
          required
          defaultValue={defaultValues?.description}
          rows={4}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-600 dark:text-neutral-400">Repo URL</label>
          <input
            name="repoUrl"
            defaultValue={defaultValues?.repoUrl}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          />
        </div>
        <div>
          <label className="text-sm text-neutral-600 dark:text-neutral-400">Demo URL</label>
          <input
            name="demoUrl"
            defaultValue={defaultValues?.demoUrl}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-neutral-600 dark:text-neutral-400">Cover image</label>
          <select
            name="coverImageId"
            defaultValue={defaultValues?.coverImageId ?? ""}
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
        <div>
          <label className="text-sm text-neutral-600 dark:text-neutral-400">Order</label>
          <input
            name="order"
            type="number"
            defaultValue={defaultValues?.order ?? 0}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          />
        </div>
      </div>

      <button
        type="submit"
        className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
      >
        Lưu
      </button>
    </form>
  );
}
