import { ArrowRight } from "lucide-react";
import ChromeIcon from "../ChromeIcon";
import logoUrl from "@/images/icon128.png";
import { CHROME_WEB_STORE_URL } from "@/lib/links";

export default function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 rounded-3xl p-10 md:p-14 border border-primary/10">
          <img src={logoUrl} alt="SkimRoute" className="w-16 h-16 rounded-2xl mx-auto mb-6 shadow-lg" />
          <h2 className="font-inter font-extrabold text-3xl sm:text-4xl text-foreground tracking-tight mb-4">
            Stop scrolling. Start navigating.
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Skip the fluff on long pages, AI chats, search results, and PDFs. SkimRoute is free, local-only, and private.
          </p>
          <a
            href={CHROME_WEB_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            <ChromeIcon size={20} />
            Add to Chrome; it's free
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
