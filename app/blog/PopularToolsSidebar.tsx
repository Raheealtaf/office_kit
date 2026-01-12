"use client";

import Link from "next/link";
import { Zap, FileStack, Wand2, Pencil, RefreshCw, Star } from "lucide-react";

const tools = [
  {
    name: "Merge PDF",
    desc: "Combine files",
    icon: <FileStack className="w-4 h-4 text-purple-500" />,
    href: "/tools/merge-pdf",
  },
  {
    name: "Doc Scanner",
    desc: "Scan & Enhance",
    icon: <Wand2 className="w-4 h-4 text-blue-500" />,
    href: "/tools/scan-document",
  },
  {
    name: "Sign PDF",
    desc: "Digital Signature",
    icon: <Pencil className="w-4 h-4 text-emerald-500" />,
    href: "/tools/sign-pdf",
  },
  {
    name: "PDF to Word",
    desc: "Editable Docs",
    icon: <RefreshCw className="w-4 h-4 text-orange-500" />,
    href: "/tools/pdf-to-word",
  },
];

export default function PopularToolsSidebar() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
      <div className="flex items-center gap-2 mb-6 text-slate-900">
        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        <h3 className="font-black text-xs uppercase tracking-widest">
          Popular Tools
        </h3>
      </div>

      <div className="space-y-3">
        {tools.map((tool) => (
          <Link
            key={tool.name}
            href={tool.href}
            className="group flex items-center gap-4 p-3 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
              {tool.icon}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {tool.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">
                {tool.desc}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-6 w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
      >
        <Zap className="w-3 h-3" /> View Tools
      </Link>
    </div>
  );
}
