// app/tools/split-pdf/page.tsx
import type { Metadata } from "next";
import SplitClient from "./SplitClient";

export const metadata: Metadata = {
  title: "Split PDF - Extract Pages Online Free",
  description:
    "Easily separate PDF pages or extract specific ranges into a new document. 100% private, no file uploads to servers.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "separate pdf files",
    "pdf page cutter",
  ],
  alternates: {
    canonical: "/tools/split-pdf",
  },
};

export default function SplitPage() {
  return <SplitClient />;
}
