import type { Metadata } from "next";
import Link from "next/link";
import {
  Wand2,
  ScanLine,
  Zap,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "How to Scan & Enhance Documents Online for Free | officekit.io",
  description:
    "Transform phone photos into professional scans. Learn how to crop, brighten, and apply B&W filters to your documents without any apps.",
};

export default function DocumentScannerBlog() {
  return (
    <article className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <Link
          href="/blog"
          className="text-blue-600 flex items-center gap-2 text-sm font-bold mb-8 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO BLOG
        </Link>
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
          <ScanLine className="w-4 h-4" /> Digital Transformation
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          How to Turn Smartphone Photos into Professional Document Scans
        </h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm border-b pb-8">
          <span>By officekit.io Team</span>
          <span>•</span>
          <span>Jan 20, 2026</span>
          <span>•</span>
          <span>4 min read</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 prose prose-slate prose-lg">
        <p className="lead text-xl text-slate-600">
          We’ve all tried it: taking a photo of a contract or a receipt to send
          via email. The result? <strong>Shadowy, blurry, and crooked.</strong>{" "}
          It looks unprofessional and is often impossible to print.
        </p>
        <p>
          Most people think they need a physical flatbed scanner or a paid
          mobile app to get professional results. In reality, all you need is
          your browser and the right enhancement workflow.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6">
          The 3 Pillars of a Perfect Digital Scan
        </h2>
        <p>
          To make a photo look like a real document, you must address three
          specific technical issues that standard smartphone cameras ignore.
        </p>

        {/* Ad Placeholder */}
        <div className="my-10 p-6 bg-blue-50 border border-blue-100 rounded-xl">
          <span className="text-[10px] text-blue-400 uppercase font-bold block mb-2">
            Advertisement
          </span>
          <div className="h-48 bg-white border border-dashed border-blue-200 rounded flex items-center justify-center text-slate-400 italic text-sm">
            Google AdSense (Responsive Display Ad)
          </div>
        </div>

        <h3 className="text-2xl font-bold mt-8 mb-4">
          1. Precision Manual Cropping
        </h3>
        <p>
          Auto-crop algorithms often fail because they can't distinguish between
          the white paper and a white tabletop. <strong>Manual cropping</strong>
          allows you to pull the corners tight against the document edge,
          removing background clutter like your desk or keyboard.
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">
          2. Brightness & Text Extraction
        </h3>
        <p>
          Phone cameras adjust for the whole room, which usually makes paper
          look gray. By boosting <strong>brightness and contrast</strong>, you
          force the background to pure white, making the black text "pop" for
          better readability and OCR (Optical Character Recognition).
        </p>

        <h3 className="text-2xl font-bold mt-8 mb-4">
          3. The Xerox (B&W) Filter
        </h3>
        <p>
          This is the secret used by professional scanners. Converting a
          document to high-contrast grayscale removes color noise and shadows,
          giving it that clean "office machine" look that is required for legal
          and official submissions.
        </p>

        <ul className="not-prose space-y-4 my-12">
          <li className="flex items-start gap-3 text-slate-700">
            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">Privacy First:</strong> Using a
              browser-based tool like officekit.io means your sensitive
              documents never touch a server—everything happens on your device.
            </div>
          </li>
          <li className="flex items-start gap-3 text-slate-700">
            <CheckCircle2 className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900">No App Required:</strong> Save
              precious storage space on your phone by using our web scanner.
            </div>
          </li>
        </ul>

        <h2 className="text-3xl font-bold mt-12 mb-6">
          How to Scan on officekit.io
        </h2>
        <ol className="space-y-4">
          <li>
            <strong>Upload:</strong> Drop your image into our Scanner Tool.
          </li>
          <li>
            <strong>Crop:</strong> Use the handles to select the paper area.
          </li>
          <li>
            <strong>Adjust:</strong> Move the brightness slider until the
            background is clean.
          </li>
          <li>
            <strong>Filter:</strong> Toggle the "Black & White" mode for a
            professional finish.
          </li>
          <li>
            <strong>Export:</strong> Download your high-quality PNG or PDF.
          </li>
        </ol>

        {/* CTA Section */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

          <div className="relative z-10">
            <Wand2 className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Try the officekit.io Scanner
            </h3>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Ready to clean up your documents? Use our free manual crop and
              enhancement tool to create perfect scans in seconds.
            </p>
            <Link
              href="/tools/scan-document"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-all hover:scale-105 shadow-lg shadow-blue-900/50"
            >
              <Zap className="w-4 h-4" /> Start Scanning Now
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
