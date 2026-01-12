"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
// ADDED "Zap" to the imports below
import {
  Clock,
  ArrowRight,
  FileStack,
  Wand2,
  Pencil,
  RefreshCw,
  Zap,
} from "lucide-react";

const TOOL_MAP: Record<string, any> = {
  "/tools/merge-pdf": {
    name: "Merge PDF",
    icon: <FileStack className="text-purple-500" />,
  },
  "/tools/scan-document": {
    name: "Doc Scanner",
    icon: <Wand2 className="text-blue-500" />,
  },
  "/tools/sign-pdf": {
    name: "Sign PDF",
    icon: <Pencil className="text-emerald-500" />,
  },
  "/tools/pdf-to-word": {
    name: "PDF to Word",
    icon: <RefreshCw className="text-orange-500" />,
  },
};

export default function RecentTools() {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const history = JSON.parse(
        localStorage.getItem("officekit.io_history") || "[]"
      );
      // Filter out any paths that might not exist in your tool map if you want
      // or just show the last 4
      setRecent(Array.isArray(history) ? history.slice(0, 4) : []);
    } catch (e) {
      console.error("Failed to parse history", e);
      setRecent([]);
    }
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 mb-16">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
            Continue Working
          </h2>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("officekit.io_history");
            setRecent([]);
          }}
          className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-widest transition-colors"
        >
          Clear History
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recent.map((path) => {
          // If the path isn't in our map (e.g. a new tool you added later),
          // it uses the Zap icon as a fallback
          const tool = TOOL_MAP[path] || {
            name: "Tool",
            icon: <Zap className="text-blue-500" />,
          };

          return (
            <Link
              key={path}
              href={path}
              className="group bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-500/30 transition-all flex flex-col gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1 mt-1">
                  Re-open <ArrowRight size={10} />
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
