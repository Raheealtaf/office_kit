import Link from "next/link";
import {
  FileText,
  Image,
  Files,
  Scissors,
  ShieldCheck,
  Minimize2,
  FileType2,
  PenLine,
  Presentation,
  Zap,
  Globe,
  ArrowRight,
  Edit3,
  Pencil,
  ScanLine,
} from "lucide-react";
import RecentTools from "./component/RecentTools"; // Import the recent tools component

/* -------------------- CUSTOM ICON -------------------- */
const PdfToWordIcon = () => (
  <div className="flex items-center gap-1">
    <FileText className="w-6 h-6 text-red-600" />
    <ArrowRight className="w-4 h-4 text-gray-500" />
    <FileText className="w-6 h-6 text-blue-600" />
  </div>
);

/* -------------------- TOOLS DATA -------------------- */
const tools = [
  {
    title: "Word to PDF",
    description:
      "Convert DOCX to high-quality PDF files without losing formatting.",
    icon: FileText,
    iconColor: "text-blue-600",
    href: "/tools/word-to-pdf",
  },
  {
    title: "Image to PDF",
    description: "Transform JPG, PNG, and WebP images into a single document.",
    icon: Image,
    iconColor: "text-emerald-600",
    href: "/tools/image-to-pdf",
  },
  {
    title: "Merge PDF",
    description:
      "Combine multiple PDF files into one neatly organized document.",
    icon: Files,
    iconColor: "text-purple-600",
    href: "/tools/merge-pdf",
  },
  {
    title: "Split PDF",
    description: "Extract specific pages or split one PDF into multiple files.",
    icon: Scissors,
    iconColor: "text-rose-600",
    href: "/tools/split-pdf",
  },
  {
    title: "Edit PDF",
    description:
      "Add text, annotations, or watermarks to your PDF pages easily.",
    icon: Edit3,
    iconColor: "text-orange-600",
    href: "/tools/edit-pdf",
  },
  {
    title: "PDF to Word",
    description: "Convert PDF documents into editable Word files quickly.",
    icon: FileType2, // Changed to a generic File Type icon if you don't have a custom one
    iconColor: "text-blue-700",
    href: "/tools/pdf-to-word",
  },
  {
    title: "Sign PDF",
    description: "Add digital signatures to your PDF documents securely.",
    icon: PenLine, // Changed from Pencil to PenLine (looks more like a signature)
    iconColor: "text-indigo-600",
    href: "/tools/sign-pdf",
  },
  {
    title: "PDF to PowerPoint",
    description: "Convert PDF slides into editable PowerPoint presentations.",
    icon: Presentation, // The perfect icon for Slides/PPT
    iconColor: "text-orange-500", // PowerPoint brand color
    href: "/tools/pdf-to-powerpoint",
  },
  {
    title: "Scan Document",
    description: "Scan physical documents and convert them into PDF format.",
    icon: ScanLine,
    iconColor: "text-cyan-600",
    href: "/tools/scan-document",
  },
  {
    title: "Compress PDF",
    description: "Reduce file size while maintaining quality.",
    icon: Minimize2, // The standard icon for "Compress" / "Shrink"
    iconColor: "text-red-500",
    href: "/tools/compress-pdf",
  },
];

/* -------------------- PAGE -------------------- */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HERO */}
      <section className="bg-slate-900 py-24 px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6">
          <Zap className="w-4 h-4" /> 100% Client-Side Processing
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
          The Smart Way to <span className="text-blue-500">Manage PDFs</span>
        </h1>

        <p className="text-slate-400 max-w-3xl mx-auto">
          Fast, secure, and free. Files never leave your device.
        </p>
      </section>

      {/* RECENT TOOLS - Integrated here */}
      <div className="mt-8">
        <RecentTools />
      </div>

      {/* TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em] mb-8 text-center md:text-left">
          All PDF Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group bg-white p-8 rounded-2xl shadow-xl border border-slate-100 hover:border-blue-500 hover:-translate-y-2 transition-all"
              >
                <div className="p-4 bg-slate-50 rounded-2xl mb-6 flex items-center justify-center">
                  {tool.iconColor ? (
                    <Icon className={`w-8 h-8 ${tool.iconColor}`} />
                  ) : (
                    <Icon />
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  {tool.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition text-blue-600" />
                </h3>

                <p className="text-slate-500 text-sm">{tool.description}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-white py-24 mt-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          <Feature icon={ShieldCheck} title="Secure by Design" />
          <Feature icon={Zap} title="Instant Speed" />
          <Feature icon={Globe} title="Access Anywhere" />
        </div>
      </section>
    </div>
  );
}

/* -------------------- FEATURE COMPONENT -------------------- */
function Feature({ icon: Icon, title }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-600">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-xl font-bold mb-2">{title}</h4>
      <p className="text-slate-500">
        End-to-end local processing ensures privacy.
      </p>
    </div>
  );
}
