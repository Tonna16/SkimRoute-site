import { ArrowRight, Shield, Zap, Eye, FileText } from "lucide-react";
import ChromeIcon from "../ChromeIcon";
import { CHROME_WEB_STORE_URL } from "@/lib/links";

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Shield size={14} />
              Local &amp; Private; No Remote AI
            </div>
            <h1 className="font-inter font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground leading-tight tracking-tight">
              Navigate pages, chats, and PDFs,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                skip the fluff
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              SkimRoute maps useful sections in long web pages, AI conversations, search results, and PDFs. Jump to the best start, search for the part you need, or open PDF Mode with local text extraction and OCR fallback; no signup, no backend, no tracking.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={CHROME_WEB_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              >
                <ChromeIcon size={18} />
                Add to Chrome; it's free
                <ArrowRight size={16} />
              </a>
              <a
                href="#how-it-works"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-semibold hover:bg-muted transition-colors"
              >
                See How It Works
              </a>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {[
                { icon: Zap, text: "Instant setup" },
                { icon: FileText, text: "Find, PDF Mode + OCR" },
                { icon: Eye, text: "No data leaves your browser" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon size={15} className="text-primary" />
                  {text}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-40" />
            <img
              src={heroImage}
              alt="SkimRoute navigation overlay for long content"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
