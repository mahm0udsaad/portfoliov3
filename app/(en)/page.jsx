import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
import HeroVideos from "@/components/hero-videos";
import VideoFeature from "@/components/video-feature";
import DesignGallery from "@/components/design-gallery";
import { DESIGN_WORK } from "@/lib/design-work";
import MobileNav from "@/components/mobile-nav";
import ProjectStack from "@/components/project-stack";
import ServiceCards from "@/components/service-cards";
import ScrollIntro from "@/components/scroll-intro";
import SkillOrbit from "@/components/skill-orbit";
import VoiceNotes from "@/components/voice-notes-loader";
import TechBadge from "@/components/ui/techBadge";
import { homeGraph, JsonLd } from "@/lib/seo";
import { voiceNotes } from "@/lib/testimonials";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={homeGraph("en")} />

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <nav className="flex items-center justify-between px-6 md:px-14 py-3 md:py-5">
          <Link href="/" className="font-serif text-[22px] tracking-tight">
            Mahmoud Saad<span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-muted-foreground">
            <Link href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <Link href="#showreel" className="hover:text-foreground transition-colors">
              Showreel
            </Link>
            <Link href="#design" className="hover:text-foreground transition-colors">
              Design
            </Link>
            <Link href="/book" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Course
            </Link>
            <Link href="#about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link
              href="/ar"
              hrefLang="ar"
              className="hover:text-foreground transition-colors"
            >
              العربية
            </Link>
            <Link
              href="#contact"
              className="bg-ink text-ink-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary transition-colors"
            >
              Start a project
            </Link>
          </div>
          <MobileNav
            links={[
              { href: "#projects", label: "Projects" },
              { href: "#services", label: "Services" },
              { href: "#showreel", label: "Showreel" },
              { href: "#design", label: "Design" },
              { href: "/book", label: "Course" },
              { href: "#about", label: "About" },
              { href: "#contact", label: "Contact" },
            ]}
            cta={{ href: "#contact", label: "Start a project" }}
            lang={{ href: "/ar", hrefLang: "ar", label: "العربية" }}
          />
        </nav>
      </header>

      {/* HERO + CLIENT CHAT — one scroll-driven opening scene */}
      <ScrollIntro
        active
        hero={
          <section className="relative grid h-full place-items-center overflow-hidden">
            <div className="hero-enter mx-auto max-w-[1000px] px-6 pb-20 pt-8 sm:pt-24 text-center md:py-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3.5 py-1.5 text-[13px] font-medium text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Available for new projects
          </div>

          <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-7">
            Freelance Full-Stack Developer · Egypt · Remote worldwide
          </div>

          <h1 className="font-serif font-normal text-[42px] md:text-[64px] leading-[1.05] tracking-[-0.015em] mb-7">
            Mahmoud Saad — freelance
            <br className="hidden sm:block" /> <em className="text-primary">web &amp; mobile</em> developer.
          </h1>

          <p className="text-[17.5px] md:text-lg leading-relaxed text-muted-foreground max-w-[640px] mx-auto mb-8 sm:mb-10">
            I design and build fast websites with{" "}
            <span className="text-foreground font-medium">Next.js</span>, mobile
            apps with{" "}
            <span className="text-foreground font-medium">React Native</span>,
            e-commerce platforms, and WhatsApp Business API bots — for startups
            and businesses in Egypt, Saudi Arabia, the Gulf and worldwide.
          </p>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-row sm:gap-3.5 sm:justify-center sm:items-center">
            <Link
              href="#contact"
              className="col-span-2 inline-flex items-center justify-center gap-2 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              Start a project
              <span className="text-lg">→</span>
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center justify-center gap-2 border border-border px-4 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-[15px] sm:text-base hover:border-ink/40 transition-colors"
            >
              View my work
            </Link>
            <Link
              href="https://wa.me/201157337829?text=Hi%20Mahmoud%2C%20I%27d%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#25D366]/60 text-[#128C7E] px-4 py-3.5 sm:px-8 sm:py-4 rounded-full font-semibold text-[15px] sm:text-base hover:bg-[#25D366]/10 transition-colors"
            >
              <MessageCircle className="w-5 h-5 shrink-0" />
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Chat on WhatsApp</span>
            </Link>
          </div>
          <ul className="mt-7 sm:mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-[13px] sm:text-[14px] text-muted-foreground">
            <li>
              <span className="font-serif text-[20px] text-foreground">{projects.length}+</span>{" "}
              projects shipped
            </li>
            <li aria-hidden className="hidden sm:block h-1 w-1 rounded-full bg-border" />
            <li className="hidden sm:list-item">🇪🇬 🇸🇦 🇶🇦 Clients in Egypt, KSA & the Gulf</li>
            <li aria-hidden className="hidden sm:block h-1 w-1 rounded-full bg-border" />
            <li>
              <span className="font-serif text-[20px] text-foreground">{voiceNotes.length}</span>{" "}
              client voice reviews
            </li>
          </ul>
            </div>
          </section>
        }
        chat={<VoiceNotes />}
      />

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-14 gap-5">
            <div>
              <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
                Selected work
              </div>
              <h2 className="font-serif font-normal text-[36px] md:text-[44px] leading-tight tracking-tight mb-4">
                Featured projects
              </h2>
              <p className="text-muted-foreground max-w-xl text-[15.5px] leading-relaxed">
                Real websites, e-commerce platforms, mobile apps and WhatsApp
                bots shipped for clients in Egypt, Saudi Arabia and beyond.
              </p>
            </div>
            <Link
              href="https://github.com/mahm0udsaad"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold group whitespace-nowrap hover:text-primary transition-colors"
            >
              View all on GitHub
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile: scroll-stacked deck. Desktop: classic grid. */}
          <ProjectStack projects={projects} visitLabel="Visit website" />

          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-none hover:shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.tech
                      .slice(0, 3)
                      .join(", ")} project built by Mahmoud Saad`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={project.deploy}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-2.5 font-semibold text-sm shadow hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      Visit website
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-serif text-[22px] leading-tight mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechBadge key={tech} tech={tech} className="text-xs py-0.5" />
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-xs text-muted-foreground self-center px-1">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center mb-12">
            <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
              Services
            </div>
            <h2 className="font-serif font-normal text-[34px] md:text-[42px] leading-tight tracking-tight">
              What I can build for you
            </h2>
          </div>
          <ServiceCards services={services} />
        </div>
      </section>

      {/* VIDEO & DESIGN SHOWREEL */}
      <section id="showreel" className="py-20 px-6 md:px-14 border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-6">
            Video &amp; design
          </div>
          <h2 className="font-serif font-normal text-[34px] md:text-[48px] leading-[1.08] tracking-tight mb-6">
            The ads and brand visuals —{" "}
            <em className="text-primary">made in-house.</em>
          </h2>
          <p className="text-[16.5px] leading-relaxed text-muted-foreground max-w-[620px] mx-auto mb-10">
            Shipping the product is half the job. I also write, edit and direct
            the videos that sell it — AI-assisted commercials, vertical ads for
            Reels and TikTok, plus the packaging and social designs around them.
          </p>

          <VideoFeature
            videoUrl={showreelFeature.videoUrl}
            poster={showreelFeature.poster}
            title="TRES commercial"
            caption="TRES — specialty coffee roaster in Taif. Concept, edit and motion graphics by me, for a brand whose website I also built."
            playLabel="Play the TRES commercial"
          />

          <HeroVideos
            clips={showreelClips}
            altLabel="Vertical ad sample"
            watchHint="▶ Tap to watch — vertical ads cut for WhatsApp status, Reels and TikTok."
          />

          <div className="mt-10 flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              Get a video for your brand
              <span className="text-lg">→</span>
            </Link>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full font-semibold text-base text-ink hover:text-primary transition-colors"
            >
              Or learn to make them yourself
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DESIGN */}
      <section id="design" className="py-20 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center mb-12">
            <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
              Design
            </div>
            <h2 className="font-serif font-normal text-[34px] md:text-[42px] leading-tight tracking-tight mb-4">
              Packaging, print and social —{" "}
              <em className="text-primary">drawn here too.</em>
            </h2>
            <p className="text-muted-foreground max-w-[620px] mx-auto text-[15.5px] leading-relaxed">
              Coffee packaging, cup artwork and campaign creatives for the same
              clients whose products I build. Tap any piece to see it full size.
            </p>
          </div>
          <DesignGallery items={DESIGN_WORK} locale="en" />
        </div>
      </section>

      {/* ABOUT */}
      {/* Rotating ring bounds must not enlarge the mobile scroll viewport. */}
      <section id="about" className="overflow-hidden py-24 px-6 md:px-14 border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[1180px] grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1 py-6">
            <SkillOrbit label="Technical stack of Mahmoud Saad" />
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
              About
            </div>
            <h2 className="font-serif font-normal text-[36px] md:text-[44px] leading-tight tracking-tight mb-6">
              Developer, builder &amp; <em className="text-primary">educator.</em>
            </h2>
            <div className="space-y-4 text-[16px] text-muted-foreground leading-relaxed mb-8">
              <p>
                I&apos;m Mahmoud Saad, a freelance full-stack developer based in
                Egypt. I&apos;ve shipped 15+ production projects — company
                websites, online stores, booking platforms, mobile apps and
                WhatsApp automation — for clients across Egypt, Saudi Arabia
                and the Gulf.
              </p>
              <p>
                With expertise in{" "}
                <span className="text-foreground font-medium">
                  Next.js, React, React Native and Node.js
                </span>
                , I take projects from UI/UX design in Figma to a fast,
                SEO-ready product in production — including bilingual
                Arabic/English websites with full RTL support. I also teach
                what I&apos;ve learned about building fast with AI.
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-primary transition-colors"
              >
                Work with me
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-6 md:px-14 bg-ink text-ink-foreground"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-4">
              Get in touch
            </div>
            <h2 className="font-serif font-normal text-[38px] md:text-[48px] leading-tight tracking-tight mb-4">
              Let&apos;s work together.
            </h2>
            <p className="text-ink-foreground/70 text-lg max-w-xl mx-auto leading-relaxed">
              Have a website, app or automation project in mind — or a question
              about the course? I&apos;d love to hear from you.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-[22px] shadow-xl p-6 md:p-10 mb-12">
            <ContactForm />
          </div>

          <div className="flex flex-wrap justify-center gap-3.5">
            <SocialLink
              href="mailto:101mahm0udsaad@gmail.com"
              icon={<Mail className="w-4 h-4" />}
              label="Email"
            />
            <SocialLink
              href="https://wa.me/+201157337829"
              icon={<Phone className="w-4 h-4" />}
              label="WhatsApp"
            />
            <SocialLink
              href="https://www.linkedin.com/in/mahm0udsaad"
              icon={<Linkedin className="w-4 h-4" />}
              label="LinkedIn"
            />
            <SocialLink
              href="https://github.com/mahm0udsaad"
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
            />
          </div>

          <div className="text-center mt-12 text-ink-foreground/50 text-sm">
            © {new Date().getFullYear()} Mahmoud Saad — Freelance Web &amp;
            Mobile Developer ·{" "}
            <Link href="/ar" hrefLang="ar" className="underline hover:text-ink-foreground">
              العربية
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Helper Components
function SocialLink({ href, icon, label }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="flex items-center gap-2 bg-ink-foreground/10 hover:bg-primary transition-colors px-4 py-2 rounded-full text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// Data
const services = [
  {
    title: "Web Development",
    iconKey: "web",
    visual: "/visuals/service-web.jpg",
    description:
      "Fast, SEO-ready websites and web apps built with Next.js and React — landing pages, company sites, dashboards and platforms.",
  },
  {
    title: "Mobile Apps",
    iconKey: "mobile",
    visual: "/visuals/service-mobile.jpg",
    description:
      "Cross-platform iOS & Android apps with React Native and Expo, sharing one codebase with your web platform.",
  },
  {
    title: "WhatsApp Bots & AI",
    iconKey: "whatsapp",
    visual: "/visuals/service-whatsapp.jpg",
    description:
      "WhatsApp Business API bots for bookings, ordering and customer support — plus AI integrations that automate real work.",
  },
  {
    title: "E-commerce",
    iconKey: "ecommerce",
    visual: "/visuals/service-ecommerce.jpg",
    description:
      "Custom online stores with payments (Paymob & more), inventory, admin dashboards and bilingual Arabic/English storefronts.",
  },
];

/* Showreel media is served from /public so the section keeps working even if
   the storage backend changes. */
const showreelFeature = {
  videoUrl: "/videos/tres-ad.mp4",
  poster: "/videos/tres-ad.jpg",
};
const showreelClips = [
  { videoUrl: "/videos/clip4.mp4", poster: "/videos/clip4.jpg" },
  { videoUrl: "/videos/clip5.mp4", poster: "/videos/clip5.jpg" },
];

const projects = [
  {
    title: "Skylight — Agency Command Center",
    image: "/projects/rawasm/rawasm-1.jpg",
    tech: ["Next.js", "Supabase", "AI Assistant", "RTL Dashboard"],
    description:
      "Arabic-first operating system for a Saudi marketing agency: sales handover, clients, projects, auto-generated tasks, SLA and satisfaction KPIs, plus an in-app AI assistant — replacing a customised Odoo deployment.",
    github: "#",
    deploy: "https://skylight.rwasem.com",
  },
  {
    title: "Kiara Chat",
    image: "/projects/kiara/kiara-1.jpg",
    tech: ["Next.js", "WhatsApp API", "Supabase", "Realtime"],
    description:
      "White-labeled WhatsApp customer-service desk for a spa — live conversations, staff assignment, today's bookings and workload reports in one Arabic dashboard.",
    github: "#",
    deploy: "https://kiara-chat-eight.vercel.app",
  },
  {
    title: "Multi Gates",
    image: "/projects/multigates/multigates-1.jpg",
    tech: ["Next.js", "next-intl", "Supabase", "SEO"],
    description:
      "Bilingual corporate site for an industrial bearings and power-transmission distributor in Egypt — searchable product catalog, brands and industries, all managed from Supabase.",
    github: "#",
    deploy: "https://multigates-eg.vercel.app",
  },
  {
    title: "Nehgz",
    image: "/projects/nehgzbot/nehgzbot-1.png",
    tech: ["Next.js", "WhatsApp API", "AI", "Bot"],
    description:
      "WhatsApp AI Desk that connects businesses' WhatsApp to their booking system — auto-replies to customers and manages appointments 24/7 from one app.",
    github: "#",
    deploy: "https://nehgzbot.com/",
  },
  {
    title: "TRES",
    image: "/projects/tres/tres-1.png",
    tech: ["Next.js", "E‑commerce", "UI/UX"],
    description:
      "Brand and ordering site for a specialty coffee roaster in Taif, blending illustrated storytelling with a bilingual RTL/LTR menu experience.",
    github: "#",
    deploy: "https://tres.com.sa/",
  },
  {
    title: "Postaty",
    image: "/projects/postaty.png",
    tech: ["Next.js", "Supabase", "AI", "Google Nano Banana API"],
    description:
      "Social media post generator built with AI to streamline content creation and publishing workflows.",
    github: "#",
    deploy: "https://www.postaty.com/",
  },
  {
    title: "Wasit Alan",
    image: "/projects/waiseet-alan.png",
    tech: ["Next.js", "Expo", "React Native", "Supabase"],
    description:
      "Mobile app and platform for للتنازل، التعقيب، والخدمات العامة with a shared stack across web and mobile.",
    github: "#",
    deploy: "https://www.wasitalan.com/",
  },
  {
    title: "Augen",
    image: "/projects/augen/augen-1.png",
    tech: ["Next.js", "Admin Dashboard", "Inventory Management", "E-commerce"],
    description:
      "Luxury eyewear e-commerce website with comprehensive admin dashboard for managing orders, inventory, and customer data.",
    github: "#",
    deploy: "http://augeneg.com",
  },
  {
    title: "Tatbela & Tabel",
    image: "/projects/tabel/slide.png",
    tech: ["Next.js", "E-commerce", "B2B", "B2C", "Paymob", "Payment Gateway"],
    description:
      "B2B & B2C e-commerce platform for spices and related products with integrated Paymob payment gateway for seamless transactions.",
    github: "#",
    deploy: "https://tatbela-tabel.vercel.app",
  },
  {
    title: "AbreezGroup Website",
    image: "/projects/abreez-site.jpg",
    tech: ["Next.js", "SSG", "Framer Motion", "Tailwind CSS"],
    description:
      "Designed a user-friendly and visually appealing interface for an eco-friendly product Website. Effectively displayed products using a clean and modern design.",
    github: "#",
    deploy: "https://abreezstock.com/",
  },
  {
    title: "Resume Builder",
    image: "/projects/cohr.jpg",
    tech: ["Next.js", "SSG", "React-PDF", "PDF Generation"],
    description:
      "Web-based tool for dynamic resume building and downloading with Google Sign-In authentication. Implemented serverless functions.",
    github: "#",
    deploy: "https://cv.cohr.sa/",
  },
  {
    title: "Mobile App Landing Page",
    image: "/projects/halaqr-site.jpg",
    tech: ["React Native", "UI/UX", "WhatsApp API"],
    description:
      "Mobile app landing page for designing and sharing invitations via WhatsApp, focused on UI/UX design and frontend development.",
    github: "#",
    deploy: "https://hala-qr-site.vercel.app/",
  },
  {
    title: "Mobile App UI/UX",
    image: "/projects/hala-design.jpg",
    tech: ["Figma", "UI/UX", "Prototyping"],
    description:
      "Designed a user-friendly and visually appealing interface for an invitation designer app. Focused on creating intuitive user flows.",
    github: "#",
    deploy:
      "https://www.figma.com/design/lXpObprsDsVJDQfhbUQO57/Invitation-Designer-UI?node-id=0-1&p=f&t=a9lDdPcGX0te8LUd-0",
  },
  {
    title: "Elsewedy Automation Website",
    image: "/projects/sewedy.jpg",
    tech: ["Next.js", "SSG", "DevOps", "Nginx", "PM2"],
    description:
      "Created company website with Next.js SSG, deployed mail and cloud servers, managed Ubuntu VPS with Nginx and PM2.",
    github: "#",
    deploy: "https://www.elsewedy-automation.com/",
  },
];

