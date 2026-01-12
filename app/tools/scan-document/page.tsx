"use client";
import dynamic from "next/dynamic";

const DocumentScannerClient = dynamic(() => import("./DocumentScannerClient"), {
  ssr: false,
});

export default function Page() {
  return <DocumentScannerClient />;
}
