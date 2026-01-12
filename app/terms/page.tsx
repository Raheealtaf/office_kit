import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | officekit.io",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Terms of Service
        </h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-slate-600 font-medium">
            By using officekit.io, you agree to these terms. If you do not
            agree, please do not use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            2. Use of Service
          </h2>
          <p className="text-slate-600">
            You may use officekit.io for personal or commercial use. You are
            responsible for ensuring you have the legal right to the documents
            you process.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            3. Limitation of Liability
          </h2>
          <p className="text-slate-600 italic">
            officekit.io is provided "as is." We are not liable for any data
            loss, file corruption, or errors that may occur during the
            browser-side conversion process.
          </p>
        </section>
      </div>
    </div>
  );
}
