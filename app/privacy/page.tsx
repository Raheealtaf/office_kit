import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | officekit.io",
  description:
    "Learn how officekit.io protects your data. We offer 100% private, client-side PDF processing.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white py-16 px-6">
      <div className="max-w-3xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-8">
          Privacy Policy
        </h1>
        <p className="text-slate-600 mb-6">Last Updated: January 2026</p>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
          <h2 className="text-blue-800 text-xl font-bold mb-2">
            The "No-Server" Guarantee
          </h2>
          <p className="text-blue-700 text-sm leading-relaxed">
            Unlike other PDF tools,{" "}
            <strong>
              officekit.io does not upload your files to any server.
            </strong>{" "}
            All file conversions and processing happen locally within your
            browser using JavaScript. Your sensitive documents never leave your
            computer.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            1. Data Collection
          </h2>
          <p className="text-slate-600">
            We do not collect, store, or share any personal data or the contents
            of the files you process on our website. Because processing is
            client-side, we have no access to your documents.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            2. Cookies and Ads
          </h2>
          <p className="text-slate-600">
            We use Google AdSense to display advertisements. Google may use
            cookies to serve ads based on a user's prior visits to our website
            or other websites.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            3. Third-Party Services
          </h2>
          <p className="text-slate-600">
            Our site uses Google Analytics to monitor traffic patterns. This
            data is anonymous and used only to improve the user experience.
          </p>
        </section>
      </div>
    </div>
  );
}
