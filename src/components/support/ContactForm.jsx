import { useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { SUPPORT_EMAIL } from "@/lib/links";

const REQUEST_TYPES = [
  "General question",
  "Bug report",
  "Feature request",
  "PDF issue",
  "Other",
];
const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function getEasternDateStamp(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}${values.month}${values.day}`;
}

function createSubmissionId() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const suffix = Array.from(bytes, (byte) => ID_ALPHABET[byte % ID_ALPHABET.length]).join("");
  return `SR-${getEasternDateStamp()}-${suffix}`;
}

function createEmptyForm() {
  return {
    type: "General question",
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  };
}

async function saveSupportSubmission(form, submissionId) {
  const response = await fetch("/api/support", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...form, submissionId }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.ok) {
    throw new Error(data.error || `Support request failed with status ${response.status}`);
  }

  return data;
}

export default function ContactForm() {
  const submissionLockRef = useRef(false);
  const [form, setForm] = useState(createEmptyForm);
  const [submissionId, setSubmissionId] = useState(createSubmissionId);
  const [sentSubmissionId, setSentSubmissionId] = useState("");
  const [sent, setSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [deliveryWarning, setDeliveryWarning] = useState(false);

  const canSubmit = useMemo(() => {
    return (
      REQUEST_TYPES.includes(form.type) &&
      form.name.trim() &&
      form.email.trim() &&
      form.subject.trim() &&
      form.message.trim()
    );
  }, [form]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // React state updates are asynchronous, so this ref blocks a second submit
    // immediately, even if the user double-clicks before the button re-renders.
    if (submissionLockRef.current) return;

    setError("");
    setDeliveryWarning(false);

    if (!canSubmit) {
      setError("Please fill out all fields before sending.");
      return;
    }

    submissionLockRef.current = true;
    setIsSending(true);
    try {
      // The Vercel endpoint now owns the complete operation: duplicate check,
      // Sheet save, support notification, and auto-reply. Retries with the same
      // ID only resend an email whose recorded delivery previously failed.
      const saveResult = await saveSupportSubmission(form, submissionId);
      const acceptedSubmissionId = saveResult.submissionId || submissionId;
      setDeliveryWarning(Boolean(saveResult.deliveryWarning));

      setSentSubmissionId(acceptedSubmissionId);
      setSent(true);
      setForm(createEmptyForm());
      setSubmissionId(createSubmissionId());
    } catch (err) {
      console.error("Support form submission failed:", err);
      setError(`Sorry, your message could not be saved right now. Please try again or email ${SUPPORT_EMAIL} directly.`);
    } finally {
      submissionLockRef.current = false;
      setIsSending(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-card rounded-2xl border border-border p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <CheckCircle size={28} className="text-primary" />
        </div>
        <h3 className="font-inter font-bold text-xl text-foreground mb-2">Message sent!</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          {deliveryWarning
            ? "Thanks for reaching out. Your message was saved successfully, but the email confirmation may be delayed. SkimRoute Support can still see your submission."
            : "Thanks for reaching out. Your message has been saved and sent to SkimRoute Support, and you should receive an auto-reply shortly."}
        </p>
        {sentSubmissionId ? (
          <p className="mt-3 text-sm text-foreground">
            Reference ID: <span className="font-mono font-semibold">{sentSubmissionId}</span>
          </p>
        ) : null}
        <button
          onClick={() => {
            setSent(false);
            setError("");
            setDeliveryWarning(false);
            setSentSubmissionId("");
          }}
          className="mt-5 text-sm text-primary hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
      <h2 className="font-inter font-bold text-2xl text-foreground mb-2">Send me a message</h2>
      <p className="text-sm text-muted-foreground mb-6">
        Have a question, bug report, or feature request? Send it here and it will go to <span className="text-foreground font-medium">{SUPPORT_EMAIL}</span>.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="hidden" aria-hidden="true">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="request-type" className="text-sm font-medium">Request type</Label>
          <select
            id="request-type"
            name="type"
            required
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {REQUEST_TYPES.map((requestType) => (
              <option key={requestType} value={requestType}>{requestType}</option>
            ))}
          </select>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium">Name</Label>
            <Input
              id="name"
              name="name"
              required
              placeholder="Your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
          <Input
            id="subject"
            name="subject"
            required
            placeholder="What's this about?"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="message" className="text-sm font-medium">Message</Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Describe your question, issue, or idea..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {error ? (
          <div className="flex items-start gap-2 rounded-xl border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        ) : null}

        <div className="space-y-3">
          <button
            type="submit"
            disabled={isSending}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSending ? "Sending..." : (
              <>
                <Send size={15} />
                Send Message
              </>
            )}
          </button>

          <p className="text-xs leading-relaxed text-muted-foreground max-w-2xl">
            By submitting this form, you agree that SkimRoute may store your name, email address, and message for support purposes. See the{" "}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </form>
    </div>
  );
}
