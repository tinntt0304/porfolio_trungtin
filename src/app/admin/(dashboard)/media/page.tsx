import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { UploadForm } from "@/components/admin/UploadForm";
import { deleteImage } from "@/actions/media";

export default async function MediaPage() {
  const images = await prisma.image.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
        Media
      </h1>
      <UploadForm />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((image) => {
          const boundDelete = deleteImage.bind(null, image.id);
          return (
            <div
              key={image.id}
              className="rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-neutral-100 dark:bg-neutral-800">
                <Image
                  src={image.url}
                  alt={image.alt ?? image.filename}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
              <p className="mt-1 truncate text-xs text-neutral-500">{image.filename}</p>
              <form action={boundDelete}>
                <button type="submit" className="text-xs text-red-600 hover:underline">
                  Xóa
                </button>
              </form>
            </div>
          );
        })}
      </div>
      {images.length === 0 && (
        <p className="text-sm text-neutral-500">Chưa có hình ảnh nào.</p>
      )}
    </div>
  );
}
