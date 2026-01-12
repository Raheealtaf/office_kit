import type { Metadata } from "next";
import Link from "next/link";
import {
  Image as ImageIcon,
  FileImage,
  Scale,
  ArrowLeft,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "5 Tips for Optimizing Images Before Converting to PDF | officekit.io",
  description:
    "Stop sending massive PDF files. Learn how to balance image quality and file size so your documents look professional and email perfectly.",
};

export default function BlogPost() {
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
        <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4">
          <Scale className="w-4 h-4" /> Optimization Guide
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          5 Tips for Optimizing Images Before Converting to PDF
        </h1>
        <div className="flex items-center gap-4 text-slate-500 text-sm border-b pb-8">
          <span>By officekit.io Design Team</span>
          <span>•</span>
          <span>Jan 20, 2026</span>
          <span>•</span>
          <span>4 min read</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 py-12 prose prose-slate prose-lg">
        <p className="lead text-xl text-slate-600">
          We've all received that dreaded email:{" "}
          <em>"Message Blocked: Attachment Too Large."</em>
        </p>
        <p>
          When you take high-resolution photos with a modern phone and convert
          them directly to PDF, the resulting file can easily exceed 25MB. While
          the quality looks great, it's impractical for sharing.
        </p>
        <p>
          The secret to a professional PDF is balancing **visual quality** with
          **file size**. Here are 5 expert tips to prepare your images before
          conversion.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
            1
          </span>
          Choose the Right Format (JPG vs. PNG)
        </h2>
        <p>Not all image formats are created equal when going to PDF.</p>
        <ul>
          <li>
            <strong>Use JPG for Photos:</strong> If you are scanning documents
            or using photographs, JPG is best. It uses "lossy" compression,
            which dramatically reduces file size without noticeable quality loss
            to the naked eye.
          </li>
          <li>
            <strong>Use PNG for Graphics:</strong> For screenshots, logos, or
            images with text and sharp lines, use PNG. It is "lossless" and
            keeps edges crisp, but the file size will be larger.
          </li>
        </ul>

        {/* Ad Placeholder */}
        <div className="my-10 p-6 bg-emerald-50 border border-emerald-100 rounded-xl">
          <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-2">
            Advertisement
          </span>
          <div className="h-64 bg-white border border-dashed border-emerald-200 rounded flex items-center justify-center text-slate-400 italic">
            Google AdSense (In-Article Ad)
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
            2
          </span>
          Understand Resolution (DPI)
        </h2>
        <p>DPI (Dots Per Inch) determines how sharp an image looks.</p>
        <ul>
          <li>
            <strong>For Screens (Email/Web):</strong> You only need about{" "}
            <strong>72 to 96 DPI</strong>. Anything higher is wasted data that
            bloats your PDF file size.
          </li>
          <li>
            <strong>For Printing:</strong> If the PDF is meant to be physically
            printed, aim for <strong>300 DPI</strong>.
          </li>
        </ul>
        <p>
          Most phone cameras shoot at very high resolutions meant for large
          prints, which is unnecessary for a standard PDF document.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
            3
          </span>
          Crop Unnecessary Areas
        </h2>
        <p>
          Did you scan a receipt on a large table? Crop out the table! Every
          pixel in an image adds to the file size. By cropping tightly around
          the relevant content, you can reduce the file size significantly
          before conversion.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
            4
          </span>
          Pre-Compress Your Images
        </h2>
        <p>
          Before using a PDF converter, run your JPGs through a dedicated image
          compressor. Tools like TinyJPG can reduce image size by up to 70%
          while maintaining excellent visual quality. Do this <em>before</em>{" "}
          converting to PDF for the smallest possible final file.
        </p>

        <h2 className="text-3xl font-bold mt-12 mb-6 flex items-center gap-3">
          <span className="bg-emerald-100 text-emerald-800 w-8 h-8 rounded-full flex items-center justify-center text-lg">
            5
          </span>
          Use a Smart PDF Converter
        </h2>
        <p>
          Finally, the tool you use matters. Some converters just dump the raw
          images into a PDF container.
        </p>
        <p>
          The <strong>officekit.io Image to PDF</strong> tool is designed to
          handle JPGs and PNGs intelligently, ensuring they fit standard A4
          pages without unnecessary bloating.
        </p>

        <div className="mt-16 bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="bg-white p-4 rounded-xl shadow-sm -rotate-6 hidden md:block">
            <FileImage className="w-16 h-16 text-emerald-500" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-yellow-500" /> Ready to
              convert?
            </h3>
            <p className="text-slate-600 mb-6">
              Take your optimized JPGs or PNGs and turn them into a single,
              professional PDF document in seconds.
            </p>
            <Link
              href="/tools/image-to-pdf"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-lg transition-colors shadow-md shadow-emerald-200"
            >
              <ImageIcon className="w-5 h-5" /> Go to Image to PDF Tool
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
