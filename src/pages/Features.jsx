import { Compass, MessageSquare, Map, Keyboard, EyeOff, Lock, Monitor, Code, Layers, Bookmark, ArrowRight, FileText, ScanText, Highlighter, FolderOpen, Search } from "lucide-react";
import ChromeIcon from "../components/ChromeIcon";
import featureImg1 from "@/images/professionalSRSS-7.png";
import featureImg2 from "@/images/professionalSRSS-6.png";
import featureImg3 from "@/images/professionalSRSS-2.png";
import featureImg4 from "@/images/professionalSRSS-5.png";
import featureImg5 from "@/images/professionalSRSS-3.png";
import { CHROME_WEB_STORE_URL } from "@/lib/links";

const coreFeatures = [
  { icon: Compass, title: "Smart Jump", desc: "Detects the most useful section and jumps there when confidence is strong enough." },
  { icon: Search, title: "Section Find", desc: "Searches locally for the part you need and jumps to the best matching section." },
  { icon: Map, title: "Search Results", desc: "Focuses AI Overviews, direct answers, People Also Ask, top results, and other result blocks." },
  { icon: FileText, title: "Documentation Pages", desc: "Works well on structured documentation pages, tutorials, research pages, and recipes." },
  { icon: FileText, title: "PDF Mode", desc: "Opens a SkimRoute-controlled PDF viewer for more reliable section scrolling and highlighting." },
  { icon: ScanText, title: "OCR + Better OCR", desc: "Uses local OCR for scanned PDFs and can retry with Better OCR when fast OCR is weak." },
  { icon: MessageSquare, title: "AI Chat Nav", desc: "Maps long AI conversations, detecting turns, answers, summaries, and topic shifts." },
  { icon: Lock, title: "Fully Private", desc: "Everything runs locally in your browser. No signup, analytics, backend, or remote AI calls." },
];

const detailedFeatures = [
  {
    title: "Smart Starting Point Detection",
    description: "SkimRoute analyzes structure locally and finds the most useful section to jump to, but only when confidence is strong enough. It avoids guessing when a page is short or low-structure.",
    icon: Compass,
    image: featureImg3,
    details: [
      "Analyzes heading hierarchy, content density, and section relevance",
      "Stays quiet on dashboards, admin panels, product pages, short pages, and low-structure pages",
      "Works across articles, documentation pages, tutorials, research, recipes, discussions, search results, chats, and PDFs",
    ],
  },
  {
    title: "Local Section Find",
    description: "Use the popup or sidebar search box to find the part of a page that mentions a topic, phrase, setup step, answer, or code block. SkimRoute searches locally against the mapped structure and can jump to the best match.",
    icon: Search,
    image: featureImg2,
    details: [
      "Search text stays in your browser and is not logged or uploaded",
      "Works on mapped web pages, AI chats, selectable PDFs, and OCR-backed PDFs",
      "Shows confidence, snippets, alternatives, and a confirmation path when a match is weak",
    ],
  },
  {
    title: "Search Result Navigation",
    description: "SkimRoute now understands search-result pages well enough to focus useful result areas. It still works best after you open a result, but it can help you get oriented on the results page itself.",
    icon: Map,
    image: featureImg1,
    details: [
      "Prioritizes AI Overview or direct answer blocks when they are available",
      "Can move through People Also Ask, sources, top results, videos, maps, shopping, and related searches",
      "Keeps search result handling cautious so noisy result pages do not outrank stronger reading pages",
    ],
  },
  {
    title: "SkimRoute PDF Mode",
    description: "PDFs are different from normal web pages, so SkimRoute includes a controlled PDF Mode. It renders PDFs in a SkimRoute-owned viewer so section navigation, scrolling, and highlighting are more reliable than relying on Chrome's built-in PDF viewer alone.",
    icon: FileText,
    image: featureImg4,
    details: [
      "Extracts selectable PDF text locally and maps important sections by page",
      "Opens or reuses SkimRoute PDF Mode when you jump to important PDF sections",
      "Highlights the current section you selected from the Page Map, buttons, or keyboard shortcuts",
      "Uses page-based fallback navigation when Chrome's native PDF viewer blocks direct control",
    ],
  },
  {
    title: "OCR Fallback and Better OCR",
    description: "When a PDF does not expose selectable text, SkimRoute can fall back to local OCR. If fast OCR produces weak text, it can preserve your query and offer a Better OCR retry that runs locally.",
    icon: ScanText,
    image: featureImg5,
    details: [
      "Runs OCR locally in the browser; PDF content is not uploaded",
      "Builds page-aware sections from recovered OCR text",
      "Supports best-section and next-section navigation in OCR-backed PDFs",
      "Better OCR may take longer, especially on scanned documents",
      "OCR quality can vary on encrypted, damaged, huge, or low-resolution scans",
    ],
  },
  {
    title: "AI Conversation Navigation",
    description: "Long AI chats become instantly navigable. SkimRoute detects conversation structure across major AI platforms and generic chatbot-style pages.",
    icon: MessageSquare,
    image: featureImg1,
    details: [
      "Supports ChatGPT, Claude, Gemini, Perplexity, Copilot, Grok, GitHub Copilot web, and more",
      "Detects assistant/user turns, final answers, revised answers, summaries, and topic changes",
      "Highlights substantial code blocks and long answer sections locally",
    ],
  },
  {
    title: "Keyboard-First Shortcuts",
    description: "Power through content without reaching for the mouse. Two shortcuts cover the main navigation flow across web pages, search results, AI chats, and PDFs.",
    icon: Keyboard,
    image: featureImg2,
    details: [
      "Alt+J / Option+J: jump to the best useful section",
      "Alt+N / Option+N: move to the next important section",
      "Works alongside the visual Page Map, Find box, section buttons, and PDF Mode",
    ],
  },
];

const moreFeatures = [
  { icon: Map, title: "Nested Page Map", desc: "Collapsible sidebar showing sections and subsections with real-time current-section tracking." },
  { icon: Search, title: "Find on This Page", desc: "Search mapped sections from the sidebar or popup and jump to the closest local match." },
  { icon: Highlighter, title: "Current Target Highlight", desc: "Highlights the section you just navigated to instead of leaving old targets behind." },
  { icon: FolderOpen, title: "Local File PDF Support", desc: "Works with local PDFs when Chrome's file URL access is enabled for the extension." },
  { icon: EyeOff, title: "Smart Silence", desc: "Stays hidden on pages where it is not useful; no interruptions, no false positives." },
  { icon: Monitor, title: "Minimal Edge Tab", desc: "When minimized, a small tab sits at the edge so you can bring it back without feeling lost." },
  { icon: Code, title: "Code Block Detection", desc: "Automatically identifies substantial code blocks in AI conversations and documentation." },
  { icon: Layers, title: "Subsection Collapsing", desc: "Collapse and expand sections in the Page Map for a better overview of deep pages, documentation pages, and PDFs." },
  { icon: Bookmark, title: "Per-Page Snooze", desc: "Temporarily dismiss SkimRoute on pages where you do not need it." },
  { icon: Lock, title: "Zero Data Collection", desc: "No analytics, no remote calls, no signup. SkimRoute processes pages, PDFs, OCR, and searches locally in your browser." },
];

export default function Features() {
  return (
    <div>
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              <Layers size={14} />
              Features
            </div>
            <h1 className="font-inter font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight">
              Built for how you actually read
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Navigate long web pages, search results, AI conversations, and PDFs with smart jumps, local section search, PDF Mode, OCR fallback, and local-only privacy.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
            {coreFeatures.map((f) => (
              <div key={f.title} className="bg-card rounded-2xl border border-border p-5 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5 transition-all duration-200 group">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <f.icon size={18} className="text-primary" />
                </div>
                <h3 className="font-inter font-semibold text-sm text-foreground mb-1.5">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-24">
            {detailedFeatures.map((feature, idx) => (
              <div key={feature.title} className={`grid lg:grid-cols-2 gap-10 items-center ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon size={22} className="text-primary" />
                  </div>
                  <h2 className="font-inter font-bold text-2xl sm:text-3xl text-foreground mb-3">{feature.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">{feature.description}</p>
                  <ul className="space-y-2.5">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        </div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="relative">
                    <div className="absolute -inset-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-50" />
                    <img src={feature.image} alt={feature.title} className="relative rounded-2xl shadow-lg w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-inter font-extrabold text-3xl text-foreground text-center mb-12 tracking-tight">
            And there's more
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {moreFeatures.map((f) => (
              <div key={f.title} className="bg-card rounded-xl border border-border p-5 hover:border-primary/20 transition-colors">
                <f.icon size={18} className="text-primary mb-3" />
                <h3 className="font-inter font-semibold text-sm text-foreground mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="font-inter font-bold text-2xl text-foreground mb-4">Ready to navigate smarter?</h2>
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
          >
            <ChromeIcon size={18} />
            Add to Chrome; it's free
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </div>
  );
}
