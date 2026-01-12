import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import HistoryTracker from "./component/HistoryTracker"; // Import the tracker

export const metadata: Metadata = {
  metadataBase: new URL("https://officekit.io.com"),
  title: {
    default: "officekit.io - Free Online PDF Tools",
    template: "%s | officekit.io",
  },
  description:
    "Convert Word to PDF, Merge PDFs, Split files, and more. 100% Free, secure, and client-side processing.",
  keywords: [
    "pdf converter",
    "word to pdf",
    "merge pdf",
    "free pdf tools",
    "client side pdf",
  ],
  openGraph: {
    title: "officekit.io - Free PDF Tools",
    description: "Secure, fast, and free PDF tools running in your browser.",
    type: "website",
    locale: "en_US",
    siteName: "officekit.io",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Invisible logic component to track user history */}
        <HistoryTracker />

        <Navbar />
        <main className="mt-20 min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
