import Image from "next/image";
import Link from "next/link";
import CourseBookingForm from "@/components/course-booking-form";
import { courseSchema, courseFaqSchema, COURSE_FAQ, JsonLd } from "@/lib/seo";

export const metadata = {
  title: "AI Video Editing Course — Learn Video Editing with AI (Online)",
  description:
    "Join the AI video editing course by Mahmoud Saad. Learn to create and edit professional videos with AI — from zero to publishing for Reels, TikTok & YouTube. Beginner-friendly online cohort. Reserve your seat free — no payment now.",
  keywords: [
    "AI video editing course",
    "video editing course",
    "AI video editing",
    "learn video editing",
    "video editing with AI",
    "AI video course",
    "online video editing course",
    "content creation course",
    "video editing for beginners",
    "كورس مونتاج",
    "كورس مونتاج بالذكاء الاصطناعي",
  ],
  alternates: {
    canonical: "/book",
  },
  openGraph: {
    type: "website",
    title: "AI Video Editing Course — Learn Video Editing with AI (Online)",
    description:
      "Create and edit scroll-stopping videos with AI — even if you've never touched a timeline. Beginner-friendly online cohort. Reserve your seat free.",
    url: "/book",
    images: [{ url: "/website.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Video Editing Course — Learn Video Editing with AI",
    description:
      "Create and edit scroll-stopping videos with AI. Beginner-friendly online cohort. Reserve your seat free.",
    images: ["/website.jpg"],
  },
};

const learnItems = [
  "Generate video, images & voiceovers with the latest AI tools",
  "Edit like a pro: cuts, transitions, captions & color grading",
  "Automate repetitive editing with AI-powered workflows",
  "Turn a single idea into content for Reels, TikTok & YouTube",
  "Build a repeatable system to publish faster than everyone else",
  "Real projects you can add to your portfolio from day one",
];

const forWho = [
  "Content creators who want to produce more, faster",
  "Freelancers & marketers adding video to their services",
  "Total beginners — no editing experience needed",
];

const proofStats = [
  { value: "6 weeks", label: "Live online cohort" },
  { value: "10+", label: "AI tools you'll master" },
  { value: "0", label: "Experience required" },
];

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={courseSchema()} />
      <JsonLd data={courseFaqSchema()} />
      {/* NAV */}
      <nav className="flex items-center justify-between px-6 md:px-14 py-6 border-b border-border">
        <Link href="/" className="font-serif text-[22px] tracking-tight">
          Mahmoud Saad<span className="text-primary">.</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-muted-foreground">
          <Link href="/book" className="text-foreground font-semibold">
            Course
          </Link>
          <Link href="/#projects" className="hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link href="/#about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/#contact" className="hover:text-foreground transition-colors">
            Contact
          </Link>
          <a
            href="#reserve"
            className="bg-ink text-ink-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary transition-colors"
          >
            Reserve a seat
          </a>
        </div>
        <a
          href="#reserve"
          className="md:hidden bg-ink text-ink-foreground px-4 py-2 rounded-full font-semibold text-sm"
        >
          Reserve
        </a>
      </nav>

      <section className="mx-auto max-w-[1280px] px-6 md:px-14 pt-10 md:pt-14 pb-20 grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-[72px] items-start">
        {/* LEFT — pitch */}
        <div>
          <div className="inline-flex items-center gap-2 text-[12.5px] font-semibold tracking-[0.1em] uppercase text-primary mb-6 bg-accent/60 border border-primary/20 rounded-full px-3.5 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Cohort 01 · Online · Limited seats
          </div>

          <h1 className="font-serif font-normal text-[40px] md:text-[54px] lg:text-[60px] leading-[1.05] tracking-[-0.015em] mb-5">
            The <em className="text-primary">AI Video Editing</em> course
            <br className="hidden sm:block" /> for creators.
          </h1>

          <p className="text-[17.5px] leading-relaxed text-muted-foreground max-w-[480px] mb-8">
            Learn to create and edit scroll-stopping videos with AI — even if
            you&apos;ve never touched an editing timeline before. A hands-on,
            beginner-friendly online video editing course that takes you from
            zero to publishing.
          </p>

          {/* Proof stats */}
          <div className="grid grid-cols-3 gap-3 mb-10 max-w-[480px]">
            {proofStats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card px-4 py-3.5 text-center"
              >
                <div className="font-serif text-2xl md:text-[26px] leading-none text-foreground">
                  {s.value}
                </div>
                <div className="text-[11.5px] leading-tight text-muted-foreground mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* What you'll learn */}
          <SectionLabel>What you&apos;ll learn</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-x-7 gap-y-[18px] mb-11">
            {learnItems.map((item) => (
              <div key={item} className="flex gap-3">
                <span className="shrink-0 w-[22px] h-[22px] rounded-full bg-accent text-accent-foreground grid place-items-center text-xs font-bold mt-px">
                  ✓
                </span>
                <span className="text-[15.5px] leading-normal text-foreground/85">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Who it's for */}
          <SectionLabel>Who it&apos;s for</SectionLabel>
          <div className="flex flex-col gap-3.5 mb-11">
            {forWho.map((item) => (
              <div key={item} className="flex gap-3 items-baseline">
                <span className="text-primary font-bold">→</span>
                <span className="text-[15.5px] text-foreground/85">{item}</span>
              </div>
            ))}
          </div>

          {/* Instructor card */}
          <div className="flex items-center gap-[18px] bg-card border border-border rounded-[18px] p-5 md:px-6">
            <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden bg-muted relative">
              <Image
                src="/me.jpg"
                alt="Mahmoud Saad — AI video editing course instructor"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-serif text-lg mb-1">Taught by Mahmoud Saad</p>
              <p className="text-sm leading-normal text-muted-foreground">
                Full-stack developer &amp; builder. You&apos;ll learn directly from
                him, with feedback on your own projects.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div id="reserve" className="lg:sticky lg:top-8 scroll-mt-24">
          <div className="bg-card border border-border rounded-[22px] shadow-[0_24px_60px_oklch(0.23_0.01_70_/_0.08)] overflow-hidden">
            <div className="bg-ink text-ink-foreground px-[30px] py-6">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <p className="font-serif text-2xl">Reserve your seat</p>
                <span className="text-[13px] font-semibold text-ink-foreground/70 whitespace-nowrap">
                  Free now
                </span>
              </div>
              <p className="text-sm leading-normal text-ink-foreground/70">
                Just your name &amp; number — no payment now. We&apos;ll message
                you on WhatsApp with the schedule within 24 hours.
              </p>
            </div>
            <div className="p-[26px] md:px-[30px] pb-[30px]">
              <CourseBookingForm />
            </div>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-[13px] text-muted-foreground mt-4">
            🔒 Your details are stored securely and never shared.
          </p>
        </div>
      </section>

      {/* FAQ — mirrors the FAQ JSON-LD for rich results */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-[820px] px-6 md:px-14 pt-16 md:pt-20 pb-28 md:pb-20">
          <h2 className="font-serif font-normal text-[30px] md:text-[38px] leading-tight text-center mb-3">
            Frequently asked questions
          </h2>
          <p className="text-center text-muted-foreground text-[15.5px] mb-10">
            Everything you need to know about the AI video editing course.
          </p>
          <div className="flex flex-col gap-3">
            {COURSE_FAQ.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-border bg-card px-5 md:px-6 py-1 open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 font-semibold text-[16px] md:text-[17px]">
                  {q}
                  <span className="shrink-0 text-primary text-xl transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="text-[15px] leading-relaxed text-muted-foreground pb-5 -mt-1">
                  {a}
                </p>
              </details>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="#reserve"
              className="inline-flex items-center gap-2.5 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              Reserve my seat — it&apos;s free <span className="text-lg">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Sticky mobile CTA — keeps the reserve action one tap away */}
      <a
        href="#reserve"
        className="lg:hidden fixed bottom-4 inset-x-4 z-40 flex items-center justify-center gap-2 bg-ink text-ink-foreground py-4 rounded-full font-semibold text-base shadow-[0_10px_30px_oklch(0.23_0.01_70_/_0.25)]"
      >
        Reserve my seat — free <span className="text-lg">→</span>
      </a>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-muted-foreground border-b border-border pb-3.5 mb-5">
      {children}
    </div>
  );
}
