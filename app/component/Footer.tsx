import Link from "next/link";
import { Sparkles, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 mt-auto">
      <div className="max-w-screen-xl mx-auto p-8 md:py-12">
        <div className="md:flex md:justify-between md:items-center">
          {/* Brand Info */}
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <span className="self-center text-xl font-bold whitespace-nowrap text-white tracking-tight">
                officekit.io™
              </span>
            </Link>
            <p className="mt-2 text-sm text-slate-400 max-w-xs">
              Secure, browser-side PDF tools. Your files never leave your
              device.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-medium text-slate-400">
            <Link
              href="/blog"
              className="hover:text-blue-500 transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="hover:text-blue-500 transition-colors"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="hover:text-blue-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-500 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="/contact"
              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            >
              <Mail className="w-4 h-4" />
              Contact
            </a>
          </div>
        </div>

        <hr className="my-8 border-white/5" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-slate-500">
            © 2026{" "}
            <Link href="/" className="hover:underline">
              officekit.io
            </Link>
            . All Rights Reserved.
          </span>
          <div className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">
            Processed 100% Client-Side
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
