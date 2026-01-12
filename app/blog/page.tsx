import Link from "next/link";
import { Calendar, Clock, ArrowRight, BookOpen, Search } from "lucide-react";
import type { Metadata } from "next";
import PopularToolsSidebar from "../blog/PopularToolsSidebar";
import pdfimg from "./pdfimg.png";
import pdftopower from "./convert-pdf-to-powerpoint-without-losing-format/pdf-to-powerpoint.jpg";
import sign from "./how-to-sign-pdf-online/sign.png";
import wordtopdf from "./PDF-to-WORD.webp";
import mergpdf from "./merge-large-pdf-files/mergpdf.png";
export const metadata: Metadata = {
  title: "Blog - PDF Tips & Productivity Guides | officekit.io",
  description:
    "Learn how to manage your documents better with our expert guides on PDF conversion, security, and office productivity.",
};

// INTEGRATED DATA: Added the Document Scanner post here
const blogPosts = [
  {
    id: 7,
    slug: "convert-pdf-to-powerpoint-without-losing-format",
    title: "How to Convert PDF to PowerPoint Without Losing Formatting",
    excerpt:
      "Broken tables and messy fonts? Learn the secret to getting perfect, editable PowerPoint files from your PDFs every time.",
    date: "Jan 24, 2026",
    readTime: "6 min read",
    category: "Conversion",
    image: pdftopower,
  },
  {
    id: 6,
    slug: "convert-pdf-to-word-without-losing-format",
    title: "How to Convert PDF to Word Without Losing Formatting",
    excerpt:
      "Broken tables and messy fonts? Learn the secret to getting perfect, editable Word files from your PDFs every time.",
    date: "Jan 24, 2026",
    readTime: "6 min read",
    category: "Conversion",
    image: pdfimg,
  },
  {
    id: 5,
    slug: "how-to-sign-pdf-online",
    title: "The Easiest Way to Sign PDF Documents Without a Printer",
    excerpt:
      "Stop wasting paper. Learn how to draw, place, and save your signature on any PDF using our secure browser-based tool.",
    date: "Jan 22, 2026",
    readTime: "5 min read",
    category: "Security",
    image: sign,
  },
  {
    id: 4,
    slug: "how-to-scan-documents-online",
    title: "How to Turn Smartphone Photos into Professional Document Scans",
    excerpt:
      "Stop sending blurry photos. Learn how to use manual cropping and B&W filters to create office-grade scans in your browser.",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    category: "Tutorial",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 1,
    slug: "safe-document-conversion",
    title: "Is it Safe to Convert Word to PDF Online?",
    excerpt:
      "Most online converters upload your files to a server. Learn why officekit.io’s browser-based approach is the future of privacy.",
    date: "Jan 15, 2026",
    readTime: "6 min read",
    category: "Security",
    image: wordtopdf,
  },
  {
    id: 2,
    slug: "merge-large-pdf-files",
    title: "How to Merge Large PDF Files Without Crashing Your Browser",
    excerpt:
      "Handling 100+ pages? Here are the best practices for merging multiple documents into one single professional PDF.",
    date: "Jan 18, 2026",
    readTime: "5 min read",
    category: "Tutorial",
    image: mergpdf,
  },
  {
    id: 3,
    slug: "optimizing-images-pdf",
    title: "5 Tips for Optimizing Images Before Converting to PDF",
    excerpt:
      "Learn how to balance image quality and file size to ensure your PDF looks great while remaining email-friendly.",
    date: "Jan 20, 2026",
    readTime: "4 min read",
    category: "Optimization",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Blog Hero */}
      <section className="bg-slate-900 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen className="w-3 h-3" /> Knowledge Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Document <span className="text-blue-500">Insights</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Expert tips, security guides, and tutorials to help you master your
            digital document workflow.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog Feed */}
          <div className="lg:col-span-2 space-y-8">
            {blogPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="md:flex h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                    <img
                      // FIX: If it's a string (URL), use it. If it's an import (Object), use .src
                      src={
                        typeof post.image === "string"
                          ? post.image
                          : post.image.src
                      }
                      alt={post.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8 md:w-3/5 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">
                      <span className="px-2 py-1 bg-blue-50 rounded-md">
                        {post.category}
                      </span>
                    </div>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-slate-400 text-xs font-medium border-t border-slate-100 pt-4 mt-auto">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> {post.readTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-1 font-bold text-blue-600 hover:gap-2 transition-all"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar Ads & Search */}
          <aside className="space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Search Articles</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Merge, Convert, Security..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                />
                <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              </div>
            </div>
            <aside className="space-y-8">
              {/* Search Box Code here */}

              {/* YOUR NEW FLOATING WIDGET */}
              <PopularToolsSidebar />

              {/* AdSense Sidebar Code here */}
            </aside>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <span className="text-[10px] uppercase font-bold text-slate-400 block mb-4 text-center tracking-widest">
                Sponsored
              </span>
              <div className="w-full aspect-[300/600] bg-slate-100 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 gap-2">
                <span className="font-semibold">AdSense Sidebar</span>
                <span className="text-xs opacity-75">300x600 px</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">Explore Topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Tutorials",
                  "Security",
                  "PDF Tips",
                  "Business",
                  "Updates",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors border border-slate-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
