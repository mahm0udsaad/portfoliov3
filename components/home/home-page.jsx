import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, Linkedin, Mail, Plus } from "lucide-react";
import ContactForm from "@/components/contact";
import HeroVideos from "@/components/hero-videos";
import VideoFeature from "@/components/video-feature";
import DesignGallery from "@/components/design-gallery";
import MobileNav from "@/components/mobile-nav";
import ProjectStack from "@/components/project-stack";
import ServiceCards from "@/components/service-cards";
import ScrollIntro from "@/components/scroll-intro";
import SkillOrbit from "@/components/skill-orbit";
import VoiceNotes from "@/components/voice-notes-loader";
import TechBadge from "@/components/ui/techBadge";
import WhatsAppIcon from "@/components/ui/whatsapp-icon";
import NewReleases from "@/components/home/new-releases";
import Hero from "@/components/home/hero";
import { DESIGN_WORK } from "@/lib/design-work";
import { HOME_CONTENT } from "@/lib/home-content";
import { AR_FAQ, EN_FAQ, faqSchema, homeGraph, JsonLd } from "@/lib/seo";

const PRIMARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-[15.5px] font-semibold text-ink-foreground transition-[background-color,transform] duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]";
const SECONDARY_BTN =
  "inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-[15px] font-semibold transition-colors hover:border-foreground/40";

export default function HomePage({ locale = "en" }) {
  const t = HOME_CONTENT[locale];
  const isAr = locale === "ar";
  const faq = isAr ? AR_FAQ : EN_FAQ;
  const newest = t.films.releases[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={homeGraph(locale)} />
      <JsonLd data={faqSchema(locale)} />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <nav className="flex items-center justify-between px-4 py-3 sm:px-6 md:px-10 md:py-5 xl:px-14">
          <Link href={t.home} className="font-serif text-[21px] font-semibold tracking-tight">
            {isAr ? "محمود سعد" : "Mahmoud Saad"}
            <span className="text-primary">.</span>
          </Link>
          <div className="hidden items-center gap-7 text-[14.5px] font-medium text-muted-foreground lg:flex">
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                {link.label}
                {link.isNew ? (
                  <span className="rounded-full bg-signal px-1.5 py-px text-[10.5px] font-bold text-signal-foreground">
                    {t.nav.newTag}
                  </span>
                ) : null}
              </Link>
            ))}
            <Link
              href={t.nav.lang.href}
              hrefLang={t.nav.lang.hrefLang}
              className="transition-colors hover:text-foreground"
            >
              {t.nav.lang.label}
            </Link>
            <Link
              href="#contact"
              className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-ink-foreground transition-colors hover:bg-primary"
            >
              {t.nav.cta}
            </Link>
          </div>
          <MobileNav
            links={t.nav.links}
            cta={{ href: "#contact", label: t.nav.cta }}
            lang={t.nav.lang}
            menuLabel={t.nav.menu}
            closeLabel={t.nav.close}
            newTag={t.nav.newTag}
          />
        </nav>
      </header>

      {/* HERO + CLIENT CHAT — one scroll-driven opening scene */}
      <ScrollIntro
        active
        chrome={false}
        hero={<Hero t={t} newest={newest} />}
        chat={<VoiceNotes locale={locale} labels={t.voiceNoteLabels} />}
      />

      {/* WORK */}
      <section id="work" className="scroll-mt-20 border-t border-border px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead
            isAr={isAr}
            title={t.work.title}
            lead={t.work.lead}
            aside={
              <Link
                href="https://github.com/mahm0udsaad"
                target="_blank"
                className="group inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-semibold transition-colors hover:text-primary"
              >
                {t.work.github}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
              </Link>
            }
          />

          {/* Mobile: scroll-stacked deck. Desktop: grid. */}
          <ProjectStack projects={t.projects} visitLabel={t.work.visit} />

          <div className="hidden gap-7 md:grid md:grid-cols-2 lg:grid-cols-3">
            {t.projects.map((project) => (
              <article
                key={project.id}
                className="group flex flex-col overflow-hidden rounded-[20px] border border-border bg-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_-12px_oklch(var(--shadow)_/_0.18)]"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={
                      project.alt ??
                      `${project.title} — ${project.tech.slice(0, 3).join(", ")} project built by Mahmoud Saad`
                    }
                    fill
                    sizes="(max-width: 1024px) 45vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-start justify-between gap-3">
                    <h3 className="font-serif text-[21px] font-semibold leading-tight">
                      {project.title}
                    </h3>
                    <Link
                      href={project.deploy}
                      target="_blank"
                      aria-label={`${t.work.visit} — ${project.title}`}
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:border-ink hover:bg-ink hover:text-ink-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {project.description}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechBadge key={tech} tech={tech} className="py-0.5 text-xs" />
                    ))}
                    {project.tech.length > 4 && (
                      <span className="self-center px-1 text-xs text-muted-foreground">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20 border-t border-border px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead isAr={isAr} title={t.services.title} lead={t.services.lead} />
          <ServiceCards services={t.services.items} />
        </div>
      </section>

      {/* FILMS — dark screening room, newest first */}
      <section id="films" className="theme-ink mx-2 scroll-mt-20 overflow-clip rounded-[30px] px-4 py-16 sm:mx-3 sm:px-6 md:mx-4 md:rounded-[36px] md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-[1180px]">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start lg:pt-4">
              <h2 className={headingClass(isAr)}>{t.films.title}</h2>
              <p className="mt-5 max-w-[52ch] text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">
                {t.films.lead}
              </p>
              <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
                <Link href="#contact" className="inline-flex items-center justify-center rounded-full bg-signal px-7 py-4 text-[15.5px] font-semibold text-signal-foreground transition-transform active:scale-[0.98]">
                  {t.films.primary}
                </Link>
                <Link href="/book" className={SECONDARY_BTN}>
                  {t.films.secondary}
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h3 className="mb-5 flex items-center gap-3 text-[15px] font-semibold">
                <span className="signal-pulse h-2.5 w-2.5 rounded-full bg-signal" aria-hidden />
                {t.films.newHeading}
              </h3>
              <NewReleases
                releases={t.films.releases}
                labels={{ newTag: t.films.newTag, play: t.films.play, soundOff: t.films.soundOff }}
              />
            </div>
          </div>

          <div className="mt-20 border-t border-border pt-14 md:mt-28">
            <h3 className="mb-8 text-[15px] font-semibold text-muted-foreground">
              {t.films.archiveHeading}
            </h3>
            <VideoFeature
              videoUrl={t.films.feature.videoUrl}
              poster={t.films.feature.poster}
              title={t.films.feature.title}
              caption={t.films.feature.caption}
              playLabel={t.films.feature.playLabel}
            />
            <div className="text-center">
              <HeroVideos clips={t.films.clips} altLabel={t.films.clipAlt} watchHint={t.films.clipHint} />
            </div>
          </div>

          <div className="mt-12 grid gap-3 sm:flex sm:justify-center lg:hidden">
            <Link href="#contact" className="inline-flex items-center justify-center rounded-full bg-signal px-7 py-4 text-[15.5px] font-semibold text-signal-foreground">
              {t.films.primary}
            </Link>
            <Link href="/book" className={SECONDARY_BTN}>
              {t.films.secondary}
            </Link>
          </div>
        </div>
      </section>

      {/* DESIGN */}
      <section id="design" className="scroll-mt-20 px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead isAr={isAr} title={t.design.title} lead={t.design.lead} />
          <DesignGallery items={DESIGN_WORK} locale={locale} labels={t.design.labels} />
        </div>
      </section>

      {/* PROCESS — a real sequence, so it's numbered */}
      <section id="process" className="scroll-mt-20 border-t border-border bg-muted/60 px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-[1180px]">
          <SectionHead isAr={isAr} title={t.process.title} lead={t.process.lead} />
          <ol className="grid gap-px overflow-hidden rounded-[22px] border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col bg-card p-6 md:p-7">
                <span className="mb-10 font-serif text-[15px] font-semibold text-primary md:mb-14">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-[21px] font-semibold leading-tight">{step.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ABOUT */}
      {/* Rotating ring bounds must not enlarge the mobile scroll viewport. */}
      <section id="about" className="scroll-mt-20 overflow-hidden border-t border-border px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 py-6 lg:order-1">
            <SkillOrbit label={t.about.stackLabel} />
          </div>
          <div className="order-1 lg:order-2">
            <h2 className={headingClass(isAr)}>{t.about.title}</h2>
            <div className="mt-6 max-w-[60ch] space-y-4 text-[16px] leading-relaxed text-muted-foreground">
              {t.about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
            <Link href="#contact" className={`${PRIMARY_BTN} mt-9`}>
              {t.about.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ — mirrors the FAQPage JSON-LD for rich results */}
      <section id="faq" className="scroll-mt-20 border-t border-border px-4 py-20 sm:px-6 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className={headingClass(isAr)}>{t.faq.title}</h2>
          </div>
          <div className="flex flex-col gap-3 lg:col-span-8">
            {faq.map(({ q, a }) => (
              <details
                key={q}
                className="group rounded-2xl border border-border bg-card px-5 py-1 open:shadow-[0_12px_30px_-12px_oklch(var(--shadow)_/_0.15)] md:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-[16px] font-semibold md:text-[17px] [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="-mt-1 pb-5 text-[15px] leading-relaxed text-muted-foreground">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mx-2 mb-2 scroll-mt-20 rounded-[30px] bg-ink px-4 py-16 text-ink-foreground sm:mx-3 sm:mb-3 sm:px-6 md:mx-4 md:mb-4 md:rounded-[36px] md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 md:mb-12">
            <h2 className={`${headingClass(isAr)} text-ink-foreground`}>{t.contact.title}</h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-foreground/70">
              {t.contact.lead}
            </p>
          </div>

          <div className="mb-10 rounded-[24px] bg-card p-6 text-card-foreground shadow-xl md:p-10">
            <ContactForm labels={t.contactLabels} />
          </div>

          <div className="flex flex-wrap gap-3">
            <SocialLink href={t.hero.whatsappHref} icon={<WhatsAppIcon className="h-4 w-4" />} label={t.contact.whatsapp} />
            <SocialLink href="mailto:101mahm0udsaad@gmail.com" icon={<Mail className="h-4 w-4" />} label={t.contact.email} />
            <SocialLink href="https://www.linkedin.com/in/mahm0udsaad" icon={<Linkedin className="h-4 w-4" />} label={t.contact.linkedin} />
            <SocialLink href="https://github.com/mahm0udsaad" icon={<Github className="h-4 w-4" />} label={t.contact.github} />
          </div>

          <footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-ink-foreground/15 pt-6 text-sm text-ink-foreground/55">
            <span>
              © {new Date().getFullYear()} {t.contact.footer}
            </span>
            <Link
              href={t.contact.langLink.href}
              hrefLang={t.contact.langLink.hrefLang}
              className="underline underline-offset-4 hover:text-ink-foreground"
            >
              {t.contact.langLink.label}
            </Link>
          </footer>
        </div>
      </section>
    </div>
  );
}

function headingClass(isAr) {
  return `font-display-tight font-serif font-semibold tracking-tight ${
    isAr ? "text-[30px] leading-[1.35] md:text-[42px]" : "text-[34px] leading-[1.05] md:text-[48px]"
  }`;
}

function SectionHead({ title, lead, aside, isAr }) {
  return (
    <div className="mb-12 flex flex-col justify-between gap-5 md:mb-16 md:flex-row md:items-end">
      <div className="max-w-[640px]">
        <h2 className={headingClass(isAr)}>
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground md:text-[17px]">{lead}</p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 rounded-full bg-ink-foreground/10 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-signal hover:text-signal-foreground"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
