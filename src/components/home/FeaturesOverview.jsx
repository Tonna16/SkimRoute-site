import { Compass, MessageSquare, Keyboard, Map, Lock, FileText, ScanText, Search } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "Smart Starting Point",
    description: "Finds the most useful section automatically, but only when confidence is strong enough. No false starts.",
  },
  {
    icon: Search,
    title: "Find Any Section",
    description: "Search locally for a phrase like 'pricing', 'setup', or 'main claim' and jump to the closest matching section.",
  },
  {
    icon: Map,
    title: "Search Result Focus",
    description: "Helps focus AI Overviews, direct answers, People Also Ask, top results, videos, maps, shopping, and related searches.",
  },
  {
    icon: ScanText,
    title: "PDF Mode + OCR",
    description: "Extracts selectable PDF text locally, can run OCR for scanned PDFs, and offers Better OCR when fast OCR is too weak.",
  },
  {
    icon: MessageSquare,
    title: "AI Chat Navigation",
    description: "Detects turns, final answers, summaries, topic changes, and code blocks in ChatGPT, Claude, Gemini, and more.",
  },
  {
    icon: FileText,
    title: "Documentation + Tutorials",
    description: "Works well on documentation pages, tutorials, research pages, recipes, and other structured long-form web content.",
  },
  {
    icon: Keyboard,
    title: "Page Map + Shortcuts",
    description: "Use the collapsible Page Map, buttons, Alt+J, or Alt+N to move through sections without losing your place.",
  },
  {
    icon: Lock,
    title: "Completely Private",
    description: "Everything runs locally. No signup, no backend, no analytics, no remote AI calls. Your browsing and PDFs stay yours.",
  },
];

export default function FeaturesOverview() {
  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-inter font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Everything you need to navigate smarter
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Built for articles, tutorials, documentation pages, research pages, recipes, discussions, search results, long AI conversations, and PDFs.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon size={20} className="text-primary" />
              </div>
              <h3 className="font-inter font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
