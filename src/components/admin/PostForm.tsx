"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import { slugify } from "@/lib/slug";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export interface ImageOption {
  id: string;
  url: string;
  filename: string;
}

export interface PostFormValues {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: string;
  coverImageId: string | null;
  tags: string;
}

export function PostForm({
  action,
  defaultValues,
  images,
}: {
  action: (formData: FormData) => void;
  defaultValues?: PostFormValues;
  images: ImageOption[];
}) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [slug, setSlug] = useState(defaultValues?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!defaultValues?.slug);
  const [content, setContent] = useState(defaultValues?.content ?? "");

  return (
    <form action={action} className="max-w-3xl space-y-4">
      <input type="hidden" name="content" value={content} />

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
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Excerpt</label>
        <textarea
          name="excerpt"
          defaultValue={defaultValues?.excerpt}
          rows={2}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
        />
      </div>

      <div>
        <label className="text-sm text-neutral-600 dark:text-neutral-400">Content (Markdown)</label>
        <div className="mt-1" data-color-mode="light">
          <MDEditor value={content} onChange={(v) => setContent(v ?? "")} height={320} />
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
          <label className="text-sm text-neutral-600 dark:text-neutral-400">Status</label>
          <select
            name="status"
            defaultValue={defaultValues?.status ?? "DRAFT"}
            className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-sm text-neutral-600 dark:text-neutral-400">
          Tags (phân cách bằng dấu phẩy)
        </label>
        <input
          name="tags"
          defaultValue={defaultValues?.tags}
          className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
        />
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
