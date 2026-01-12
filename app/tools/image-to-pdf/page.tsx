import type { Metadata } from "next";
import ImageClient from "./ImgtopdfClient";

export const metadata: Metadata = {
  title: "Image to PDF - JPG, PNG to PDF Converter",
  description:
    "Turn your images into a PDF document. Perfect for creating PDFs from photos, screenshots, and scans. 100% Free and Private.",
  keywords: [
    "jpg to pdf",
    "png to pdf",
    "image to pdf converter",
    "photos to pdf",
  ],
  alternates: {
    canonical: "/tools/image-to-pdf",
  },
};

export default function ImageToPdfPage() {
  return <ImageClient />;
}
