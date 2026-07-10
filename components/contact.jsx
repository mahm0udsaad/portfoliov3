"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { sendEmail } from "@/app/actions/send-email";

const ContactForm = () => {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setStatus({ type: "success", message: "Message sent successfully!" });
        document.getElementById("contact-form")?.reset();
      } else {
        setStatus({
          type: "error",
          message: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    }
    setIsSubmitting(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="font-serif font-normal text-3xl mb-6 text-center">
        Send a message
      </h3>

      {status.message && (
        <div
          className={`mb-5 rounded-xl px-4 py-3 text-sm ${
            status.type === "success"
              ? "bg-accent text-accent-foreground"
              : "bg-destructive/10 text-destructive"
          }`}
        >
          {status.message}
        </div>
      )}

      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <Input type="text" name="name" placeholder="Your name" required />
        <Input type="email" name="email" placeholder="Your email" required />
        <Textarea
          name="message"
          placeholder="Your message"
          required
          className="min-h-[140px] rounded-xl border-[1.5px] border-input bg-card/60 text-[15px] focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/15 focus-visible:ring-offset-0"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2.5 bg-ink text-ink-foreground py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send message <span className="text-lg">→</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
