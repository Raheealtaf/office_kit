"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HistoryTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/tools/")) {
      let history = JSON.parse(
        localStorage.getItem("officekit.io_history") || "[]"
      );

      // Remove if already exists to move to front
      history = history.filter((p: string) => p !== pathname);

      // Add to start
      history.unshift(pathname);

      // Keep only last 8
      localStorage.setItem(
        "officekit.io_history",
        JSON.stringify(history.slice(0, 8))
      );
    }
  }, [pathname]);

  return null;
}
