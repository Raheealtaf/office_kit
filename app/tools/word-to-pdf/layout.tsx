import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word to PDF Converter - Free & Secure",
  description:
    "Convert DOCX files to PDF instantly. No uploads, no watermarks, 100% free.",
  keywords: ["word to pdf", "docx to pdf", "convert word to pdf online"],
  alternates: {
    canonical: "/tools/word-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
