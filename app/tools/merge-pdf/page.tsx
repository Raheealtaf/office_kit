// app/tools/merge-pdf/page.tsx
import type { Metadata } from "next";
import MergeClient from "./MergeClient"; // Import the client logic

export const metadata: Metadata = {
  title: "Merge PDF - Combine PDF Files Online",
  description:
    "Join multiple PDF documents into one single file. Drag, drop, reorder pages, and merge instantly.",
  keywords: ["merge pdf", "combine pdf", "pdf joiner", "merge pdf files free"],
  alternates: {
    canonical: "/tools/merge-pdf",
  },
};

export default function MergePage() {
  return <MergeClient />;
}
