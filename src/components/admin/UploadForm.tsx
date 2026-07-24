"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export function UploadForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);
  const router = useRouter();

  async function handleChange() {
    const files = inputRef.current?.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("file", file));

    setStatus("Đang tải lên...");
    const res = await fetch("/api/upload", { method: "POST", body: formData });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setStatus(data.error ?? "Tải lên thất bại");
      return;
    }

    setStatus("Tải lên thành công");
    if (inputRef.current) inputRef.current.value = "";
    router.refresh();
  }

  return (
    <div className="mb-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        multiple
        onChange={handleChange}
        className="text-sm text-neutral-700 dark:text-neutral-300"
      />
      {status && <p className="mt-2 text-sm text-neutral-500">{status}</p>}
    </div>
  );
}
