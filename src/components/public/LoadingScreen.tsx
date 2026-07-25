"use client";

import { useEffect, useState } from "react";
import { getInitials } from "@/lib/text";

const COUNT_MS = 1100;
const EXIT_MS = 450;

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function LoadingScreen({ name }: { name?: string }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / COUNT_MS);
      setProgress(Math.round(easeOutExpo(t) * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setExiting(true);
        setTimeout(() => setVisible(false), EXIT_MS);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background transition-transform ease-[cubic-bezier(0.76,0,0.24,1)] ${
        exiting ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
      aria-hidden="true"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground text-sm font-black text-background opacity-0"
        style={{ animation: "loader-pop 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards" }}
      >
        {getInitials(name || "Portfolio")}
      </div>

      <div
        className="flex items-baseline gap-1 opacity-0"
        style={{ animation: "loader-fade-up 0.5s ease 0.15s forwards" }}
      >
        <span className="text-6xl font-black tabular-nums tracking-tight">
          {progress}
        </span>
        <span className="text-3xl font-black">%</span>
      </div>

      <div
        className="h-px w-40 overflow-hidden bg-border opacity-0"
        style={{ animation: "loader-fade-up 0.5s ease 0.25s forwards" }}
      >
        <div
          className="h-px bg-foreground transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p
        className="text-xs font-semibold tracking-[0.3em] text-muted uppercase opacity-0"
        style={{ animation: "loader-fade-up 1.5s ease 0.35s forwards" }}
      >
        Đang tìm hiểu về tôi
      </p>
    </div>
  );
}
