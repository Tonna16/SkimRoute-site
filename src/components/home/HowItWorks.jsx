import { Download, Globe, Navigation, Search } from "lucide-react";

const steps = [
  {
    icon: Download,
    number: "01",
    title: "Install in seconds",
    description: "Add SkimRoute from the Chrome Web Store or load it locally. No account needed.",
  },
  {
    icon: Globe,
    number: "02",
    title: "Open long content",
    description: "Open an article, tutorial, AI conversation, search result page, or PDF. SkimRoute activates when it has enough structure to help.",
  },
  {
    icon: Search,
    number: "03",
    title: "Find the part you need",
    description: "Use the Page Map or the local Find box to search for a topic, section, answer, or phrase without sending page content anywhere.",
  },
  {
    icon: Navigation,
    number: "04",
    title: "Jump to what matters",
    description: "Use buttons, Alt+J, Alt+N, PDF Mode, and OCR fallback when needed to move through the most useful sections.",
  },
];

export default function HowItWorks({ image }) {
  return (
    <section id="how-it-works" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-inter font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight">
            Up and running in a few steps
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
            No account, no cloud setup. SkimRoute works locally in your browser.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-14">
          {steps.map((step) => (
            <div key={step.number} className="text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center">
                <step.icon size={24} className="text-primary" />
              </div>
              <div className="text-xs font-bold text-primary tracking-widest">{step.number}</div>
              <h3 className="font-inter font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl">
          <div className="absolute -inset-2 bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl blur-xl" />
          <img
            src={image}
            alt="How SkimRoute works: from install to navigation"
            className="relative w-full rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
