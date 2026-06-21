import { Shield, Lock, Eye, HardDrive, Key, FileText, ScanText, SquareStack, Search } from "lucide-react";
import logoUrl from "@/images/icon128.png";

const permissions = [
  {
    icon: Key,
    name: "activeTab",
    description: "Lets SkimRoute interact with the current tab when you open the popup, run Find, or use SkimRoute controls.",
  },
  {
    icon: SquareStack,
    name: "tabs",
    description: "Lets SkimRoute update the current PDF tab when it needs to use page-based PDF navigation fallback, such as opening a PDF at #page=7.",
  },
  {
    icon: HardDrive,
    name: "scripting",
    description: "Allows SkimRoute to inject or recover its navigation layer on the active page when the automatic content script has not finished loading.",
  },
  {
    icon: Lock,
    name: "storage",
    description: "Remembers lightweight local state like onboarding, collapsed sections, minimized state, PDF Mode state, and temporary per-page snooze. All data stays in your browser.",
  },
  {
    icon: Eye,
    name: "Host permissions",
    description: "Lets SkimRoute read supported web pages, search result pages, and PDFs, including local file PDFs when file access is enabled. Content is processed locally and is not transmitted to a backend.",
  },
];

export default function Privacy() {
  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <Shield size={14} />
            Privacy Policy
          </div>
          <h1 className="font-inter font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
            Your data stays yours
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            SkimRoute is designed around local processing. Web pages, search results, AI chats, PDFs, OCR results, and Find searches stay in your browser.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="bg-card rounded-2xl border border-border p-8">
            <div className="flex items-center gap-3 mb-5">
              <img src={logoUrl} alt="SkimRoute" className="w-10 h-10 rounded-xl" />
              <h2 className="font-inter font-bold text-xl text-foreground">The Short Version</h2>
            </div>
            <div className="space-y-3 text-foreground text-sm leading-relaxed font-bold">
              <p>SkimRoute analyzes page structure locally in your browser using its content script. Page content and section-search queries are never sent to any SkimRoute server.</p>
              <p>There is no signup, no analytics, and no remote AI processing. The SkimRoute Chrome extension itself remains local-only. The website support form uses a limited server function only to save and deliver messages you choose to submit.</p>
              <p>PDF text extraction, SkimRoute PDF Mode, and OCR fallback run locally in the browser. PDFs, extracted text, and OCR results are not uploaded.</p>
              <p>Stored page state, like snooze preferences and UI settings, is local to your browser. Support-form details are handled separately as described below.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Search size={20} className="text-primary" />
              </div>
              <h2 className="font-inter font-bold text-lg text-foreground mb-2">Local Find</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Section searches run locally against the mapped page, chat, PDF, or OCR text. Search terms are not uploaded or logged by SkimRoute.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <FileText size={20} className="text-primary" />
              </div>
              <h2 className="font-inter font-bold text-lg text-foreground mb-2">PDF Processing</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                SkimRoute can extract selectable PDF text locally and render PDFs in SkimRoute PDF Mode for navigation and highlighting. The original PDF stays in your browser.
              </p>
            </div>
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <ScanText size={20} className="text-primary" />
              </div>
              <h2 className="font-inter font-bold text-lg text-foreground mb-2">OCR Fallback</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                For scanned PDFs, SkimRoute can use local OCR fallback when selectable text is unavailable. OCR data is used locally to build page-aware sections.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-inter font-bold text-2xl text-foreground mb-6">Permission Breakdown</h2>
            <div className="space-y-4">
              {permissions.map((perm) => (
                <div key={perm.name} className="bg-card rounded-xl border border-border p-5 flex items-start gap-4 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <perm.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-inter font-semibold text-foreground mb-1 flex items-center gap-2">
                      <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">{perm.name}</code>
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{perm.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
            <h2 className="font-inter font-bold text-xl text-foreground">What SkimRoute Does NOT Do</h2>
            <ul className="space-y-3">
              {[
                "Collect or transmit browsing data to SkimRoute servers",
                "Upload web page content, PDF content, extracted text, OCR results, or Find queries",
                "Track your behavior or usage patterns with analytics",
                "Use remote AI or cloud processing",
                "Require an account, login, or registration",
                "Store browsing content, PDF content, OCR results, Find queries, or extension page state outside your local browser",
                "Sell, share, or monetize user data",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-destructive text-xs font-bold">x</span>
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-muted/50 rounded-2xl p-8 space-y-4">
            <h2 className="font-inter font-bold text-xl text-foreground">Data Storage Details</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                SkimRoute uses Chrome's local <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">storage</code> API to remember:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>First-use tips and onboarding completion status</li>
                <li>Per-page snooze state</li>
                <li>Sidebar collapsed/expanded preferences</li>
                <li>Minimized state for the edge tab</li>
                <li>Lightweight PDF Mode UI state</li>
              </ul>
              <p>
                Find query text is used to locate matching sections and is not stored by SkimRoute outside the current local page state. All stored data is local to your browser, tied to the extension, and can be cleared by removing the extension or clearing extension data in Chrome settings.
              </p>
            </div>
          </div>



          <div className="bg-card rounded-2xl border border-border p-8 space-y-4">
            <h2 className="font-inter font-bold text-xl text-foreground">Support Form Submissions</h2>
            <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
              <p>
                When you voluntarily submit the website support form, SkimRoute receives the name, email address, request type, subject, and message you provide, along with a submission reference ID and submission time.
              </p>
              <p>
                This information is sent to the SkimRoute support inbox and stored in a private Google Sheet so support requests can be tracked, answered, and marked as resolved. Email delivery is handled through EmailJS, and spreadsheet storage is handled through Google Sheets.
              </p>
              <p>
                Support-form information is used only for support and product-feedback purposes. It is not sold or used to track your browsing activity. Do not include passwords, payment-card details, or other highly sensitive information in a support message.
              </p>
            </div>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4">
            <p>Last updated: June 2026</p>
            <p className="mt-1">
              Questions about privacy?{" "}
              <a href="/support" className="text-primary hover:underline">Contact me</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
