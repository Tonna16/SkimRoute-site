import { LifeBuoy, Mail } from "lucide-react";
import FAQSection from "../components/support/FAQSection";
import ContactForm from "../components/support/ContactForm";
import { SUPPORT_EMAIL } from "@/lib/links";

export default function Support() {
  return (
    <div>
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <LifeBuoy size={14} />
            Support
          </div>
          <h1 className="font-inter font-extrabold text-4xl sm:text-5xl text-foreground tracking-tight mb-4">
            I'm here to help
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse common questions below, or send a message if you need help, found a bug, or have an idea for SkimRoute.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <FAQSection />
          <ContactForm />

          <div className="bg-muted/50 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-inter font-semibold text-foreground mb-1">Prefer email?</h3>
              <p className="text-sm text-muted-foreground">
                You can also reach me directly at{" "}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="text-primary hover:underline">
                  {SUPPORT_EMAIL}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
