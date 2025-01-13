"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
        // Reset form
        const form = document.getElementById("contact-form");
        form.reset();
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
      <h2 className="text-4xl font-bold mb-8 text-center">Get in Touch</h2>

      {status.message && (
        <Alert
          className={`mb-4 ${
            status.type === "success" ? "bg-green-500/10" : "bg-red-500/10"
          }`}
        >
          <AlertDescription className="text-white">
            {status.message}
          </AlertDescription>
        </Alert>
      )}

      <form id="contact-form" action={handleSubmit} className="space-y-4">
        <Input type="text" name="name" placeholder="Your Name" required />
        <Input type="email" name="email" placeholder="Your Email" required />
        <Textarea
          name="message"
          placeholder="Your Message"
          required
          className="text-black"
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
