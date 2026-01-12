"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// 1. This "ssr: false" option forces Next.js to IGNORE this component on the server.
// This prevents the server from ever seeing the "canvas" requirement.
const PdfToWordClient = dynamic(() => import("./PdfToWordClient"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-[#0F172A] text-slate-400">
      <Loader2 className="w-8 h-8 animate-spin mr-2" />
      Loading Tool...
    </div>
  ),
});

export default function Page() {
  return <PdfToWordClient />;
}
