import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does SkimRoute work?",
    answer:
      "SkimRoute scans page structure locally in your browser, finds useful sections, and gives you a Page Map, local Find box, jump buttons, and keyboard shortcuts so you can navigate faster.",
  },
  {
    question: "Does SkimRoute send my data anywhere?",
    answer:
      "No. The extension is local-only. It does not use a backend, analytics, or remote AI calls, and page content, PDF text, OCR results, and Find queries are not uploaded.",
  },
  {
    question: "Which pages does SkimRoute support?",
    answer:
      "It works best on long articles, documentation pages, tutorials, research pages, recipes, discussions, long AI conversations, and PDFs. It can also help focus useful search-result blocks, while still working best after you open a result.",
  },
  {
    question: "Can I search for a specific part of a page?",
    answer:
      "Yes. Use the Find box in the popup or sidebar to search locally for a topic or phrase. SkimRoute can show the best match, alternatives, snippets, and a confirmation option when a match is weak.",
  },
  {
    question: "How does it handle search results?",
    answer:
      "On supported result pages, SkimRoute can focus AI Overview or direct answer blocks, People Also Ask, sources, top results, videos, maps, shopping, and related searches. Result pages are noisy, so SkimRoute handles them cautiously.",
  },
  {
    question: "Does SkimRoute work on PDFs?",
    answer:
      "Yes. SkimRoute can extract selectable PDF text locally and map important sections by page. It also includes SkimRoute PDF Mode for more reliable PDF scrolling and highlighting.",
  },
  {
    question: "What about scanned PDFs that need OCR?",
    answer:
      "SkimRoute can use a local OCR fallback for scanned or image-based PDFs when selectable text is not available. If fast OCR is too weak, it can offer a Better OCR retry. OCR quality can vary on low-resolution, encrypted, damaged, or very large PDFs.",
  },
  {
    question: "Can I use it on AI chats?",
    answer:
      "Yes. SkimRoute is designed to navigate long AI conversations on ChatGPT and other chatbot-style pages by detecting turns, answers, summaries, topic changes, and code blocks.",
  },
  {
    question: "What if SkimRoute stays quiet?",
    answer:
      "That usually means the page is short, low-structure, or not a good fit for navigation. SkimRoute is designed to stay out of the way when it cannot help much.",
  },
  {
    question: "Is SkimRoute free?",
    answer:
      "Yes. The extension is free to install and use.",
  },
];

export default function FAQSection() {
  return (
    <section className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <p className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
          FAQ
        </p>
        <h2 className="font-inter font-bold text-2xl sm:text-3xl text-foreground tracking-tight">
          Common questions
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          A few quick answers before you send a message.
        </p>
      </div>

      <div className="bg-card rounded-2xl border border-border p-4 sm:p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
