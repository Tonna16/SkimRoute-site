import { Link } from "react-router-dom";
import logoUrl from "@/images/icon128.png";
import { CHROME_WEB_STORE_URL } from "@/lib/links";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <img src={logoUrl} alt="SkimRoute" className="w-7 h-7 rounded-lg" />
              <span className="font-inter font-bold text-foreground">SkimRoute</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Navigate long pages, AI chats, search results, and PDFs. Local-only, no signup, no analytics, and no remote AI calls.
            </p>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Pages</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Features", path: "/features" },
                { label: "Support", path: "/support" },
                { label: "Privacy", path: "/privacy" },
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-inter font-semibold text-sm text-foreground mb-3">Get Started</h4>
            <ul className="space-y-2">
              <li>
                <a href={CHROME_WEB_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chrome Web Store
                </a>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Get Help
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SkimRoute. All rights reserved.</p>
          <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
