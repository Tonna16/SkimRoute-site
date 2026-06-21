import { Compass } from "lucide-react";

export default function LogoMark({ className = "" }) {
  return (
    <div
      className={`w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground flex items-center justify-center shadow-sm ${className}`}
      aria-hidden="true"
    >
      <Compass size={20} strokeWidth={2.2} />
    </div>
  );
}
