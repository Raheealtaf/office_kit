"use client";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

const PdfSignerClient = dynamic(() => import("./PdfSignerClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white">
      <Loader2 className="animate-spin" />
    </div>
  ),
});

export default function Page() {
  return <PdfSignerClient />;
}
