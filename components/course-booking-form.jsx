"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { bookCourse } from "@/app/actions/book-course";

export default function CourseBookingForm() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [willing, setWilling] = useState(false);
  const [done, setDone] = useState(false);
  const [firstName, setFirstName] = useState("");

  async function handleSubmit(formData) {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    setFirstName(
      ((formData.get("name") || "").toString().trim().split(" ")[0]) || "",
    );
    try {
      const result = await bookCourse(formData);
      if (result.success) {
        setDone(true);
      } else {
        setStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    }
    setIsSubmitting(false);
  }

  if (done) {
    return (
      <div className="text-center py-8 [animation:pop_0.35s_ease]">
        <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground grid place-items-center text-3xl mx-auto mb-5">
          ✓
        </div>
        <h3 className="font-serif font-normal text-2xl mb-2.5">
          Your seat is reserved!
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Thanks{firstName ? `, ${firstName}` : ""} — check your inbox. We&apos;ll
          send the schedule &amp; details within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form action={handleSubmit}>
      <label htmlFor="name" className="block text-sm font-semibold mb-2">
        Full name <span className="text-primary">*</span>
      </label>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="e.g. Ahmed Hassan"
        required
        className="mb-[18px]"
      />

      <label htmlFor="email" className="block text-sm font-semibold mb-2">
        Email <span className="text-primary">*</span>
      </label>
      <Input
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        required
        className="mb-[18px]"
      />

      <label htmlFor="phone" className="block text-sm font-semibold mb-2">
        Phone{" "}
        <span className="text-muted-foreground/80 font-medium">(optional)</span>
      </label>
      <Input
        id="phone"
        name="phone"
        type="tel"
        placeholder="+20 1XX XXX XXXX"
        className="mb-[22px]"
      />

      {/* Willing-to-pay toggle */}
      <label
        className={`flex gap-3 p-[15px] rounded-2xl border-[1.5px] cursor-pointer mb-6 transition-colors ${
          willing
            ? "border-primary/60 bg-accent/60"
            : "border-border bg-card/60 hover:border-ink/25"
        }`}
      >
        <input
          type="checkbox"
          name="willing_to_pay"
          checked={willing}
          onChange={(e) => setWilling(e.target.checked)}
          className="sr-only"
        />
        <span
          className={`shrink-0 w-[22px] h-[22px] rounded-md border-[1.5px] grid place-items-center text-[13px] font-extrabold mt-px transition-colors ${
            willing
              ? "border-primary bg-primary text-white"
              : "border-ink/25 bg-card text-transparent"
          }`}
        >
          ✓
        </span>
        <span>
          <span className="block text-[14.5px] font-semibold leading-snug">
            Yes, I&apos;m willing to pay 1000 EGP for the course.
          </span>
          <span className="block text-[13px] text-muted-foreground leading-snug mt-0.5">
            Optional — this just helps us prioritize serious learners for the
            first cohort.
          </span>
        </span>
      </label>

      {status.type === "error" && (
        <div className="rounded-xl bg-destructive/10 text-destructive text-sm px-4 py-3 mb-4">
          {status.message}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2.5 bg-ink text-ink-foreground py-[17px] rounded-full font-semibold text-base hover:bg-primary transition-colors disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Reserving your seat...
          </>
        ) : (
          <>
            Reserve my seat <span className="text-lg">→</span>
          </>
        )}
      </button>

      <p className="text-[13px] text-muted-foreground text-center leading-relaxed mt-4">
        No payment required now. Cancel your reservation anytime.
      </p>
    </form>
  );
}
