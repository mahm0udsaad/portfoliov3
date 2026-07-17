"use client";
import { useMemo, useState } from "react";
import { Loader2, Phone, CalendarCheck2, CheckCircle2 } from "lucide-react";
import { bookCall } from "@/app/actions/book-call";

const defaultLabels = {
  heading: "Book a quick call",
  subheading: "Drop your number, pick a time — I'll call you. That's it.",
  phone: "Your phone number",
  dayLabel: "Which day?",
  timeLabel: "What time?",
  send: "Book my call",
  sending: "Booking...",
  success: "Done! I'll call you at the time you picked.",
  error: "Couldn't book the call. Please try again.",
  today: "Today",
  tomorrow: "Tomorrow",
  locale: "en",
  dateLocale: "en-US",
};

const TIME_SLOTS = [
  { value: "10:00", label: "10:00 AM", labelAr: "١٠ صباحًا" },
  { value: "14:00", label: "2:00 PM", labelAr: "٢ ظهرًا" },
  { value: "18:00", label: "6:00 PM", labelAr: "٦ مساءً" },
  { value: "21:00", label: "9:00 PM", labelAr: "٩ مساءً" },
];

function dayOptions(t) {
  const days = [];
  for (let offset = 0; offset < 4; offset++) {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    // Local date parts — toISOString() is UTC and can be off by a day at night.
    const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    let label;
    if (offset === 0) label = t.today;
    else if (offset === 1) label = t.tomorrow;
    else
      label = date.toLocaleDateString(t.dateLocale, {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    days.push({ iso, label });
  }
  return days;
}

const ContactForm = ({ labels = {} }) => {
  const t = { ...defaultLabels, ...labels };
  const isAr = t.locale === "ar";

  const days = useMemo(() => dayOptions(t), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [phone, setPhone] = useState("");
  const [day, setDay] = useState(days[1].iso); // default: tomorrow
  const [time, setTime] = useState("18:00");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      const formData = new FormData();
      formData.set("phone", phone);
      formData.set("meetingAt", `${day} ${time}`);
      formData.set("locale", t.locale);
      const result = await bookCall(formData);
      if (result.success) {
        setStatus({ type: "success", message: t.success });
        setPhone("");
      } else {
        setStatus({ type: "error", message: t.error });
      }
    } catch {
      setStatus({ type: "error", message: t.error });
    }
    setIsSubmitting(false);
  }

  if (status.type === "success") {
    return (
      <div className="mx-auto max-w-2xl py-6 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
        <p className="text-lg font-medium">{status.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h3 className="mb-2 text-center font-serif text-3xl font-normal">
        {t.heading}
      </h3>
      <p className="mb-7 text-center text-[15px] text-muted-foreground">
        {t.subheading}
      </p>

      {status.type === "error" && (
        <div className="mb-5 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phone — the only thing to type */}
        <div className="relative">
          <Phone className="pointer-events-none absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="tel"
            name="phone"
            dir="ltr"
            inputMode="tel"
            autoComplete="tel"
            required
            minLength={8}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t.phone}
            className="h-14 w-full rounded-2xl border-[1.5px] border-input bg-card/60 ps-12 pe-4 text-left text-[16px] tracking-wide outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15"
          />
        </div>

        {/* Day — one tap */}
        <fieldset>
          <legend className="mb-2.5 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <CalendarCheck2 className="h-4 w-4" /> {t.dayLabel}
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {days.map((d) => (
              <button
                key={d.iso}
                type="button"
                onClick={() => setDay(d.iso)}
                aria-pressed={day === d.iso}
                className={`h-12 rounded-xl border text-[14px] font-medium transition-colors ${
                  day === d.iso
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-card/60 hover:border-primary/40"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </fieldset>

        {/* Time — one tap */}
        <fieldset>
          <legend className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {t.timeLabel}
          </legend>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot.value}
                type="button"
                onClick={() => setTime(slot.value)}
                aria-pressed={time === slot.value}
                className={`h-12 rounded-xl border text-[14px] font-medium transition-colors ${
                  time === slot.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-input bg-card/60 hover:border-primary/40"
                }`}
              >
                {isAr ? slot.labelAr : slot.label}
              </button>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink text-base font-semibold text-ink-foreground transition-colors hover:bg-primary disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              {t.sending}
            </>
          ) : (
            <>
              {t.send} <span className="text-lg rtl:hidden">→</span>
              <span className="hidden text-lg rtl:inline">←</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
