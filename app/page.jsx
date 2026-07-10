import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
import HeroVideos from "@/components/hero-videos";
import TechBadge, { SkillCard } from "@/components/ui/techBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <nav className="flex items-center justify-between px-6 md:px-14 py-5">
          <Link href="/" className="font-serif text-[22px] tracking-tight">
            Mahmoud Saad<span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-muted-foreground">
            <Link href="/book" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              Course
            </Link>
            <Link href="#projects" className="hover:text-foreground transition-colors">
              Projects
            </Link>
            <Link href="#about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <Link
              href="/book"
              className="bg-ink text-ink-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary transition-colors"
            >
              Reserve a seat
            </Link>
          </div>
          <Link
            href="/book"
            className="md:hidden bg-ink text-ink-foreground px-4 py-2 rounded-full font-semibold text-sm"
          >
            Reserve a seat
          </Link>
        </nav>
      </header>

      {/* HERO — course launch */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1000px] px-6 pt-20 pb-24 md:pt-28 md:pb-28 text-center">
          <div className="text-[12.5px] font-semibold tracking-[0.16em] uppercase text-primary mb-7">
            New course · Cohort 01 now open
          </div>

          <h1 className="font-serif font-normal text-[44px] md:text-[68px] leading-[1.03] tracking-[-0.015em] mb-7">
            Create stunning videos with the
            <br className="hidden sm:block" /> power of{" "}
            <em className="text-primary">AI &amp; video editing.</em>
          </h1>

          <p className="text-[17.5px] md:text-lg leading-relaxed text-muted-foreground max-w-[560px] mx-auto mb-10">
            A hands-on course by{" "}
            <span className="text-foreground font-medium">Mahmoud Saad</span> that
            teaches you to produce and edit scroll-stopping videos with AI — from
            zero to publishing.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              Reserve your seat
              <span className="text-lg">→</span>
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full font-semibold text-base hover:border-ink/40 transition-colors"
            >
              View my work
            </Link>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            No experience needed · Free to reserve — no payment now
          </p>

          {/* Sample video previews — click to play, loaded on demand from Supabase */}
          <HeroVideos clips={heroClips} />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 md:px-14 border-t border-border bg-muted/40">
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
                A selection of projects that demonstrate my ability to solve
                complex problems and ship high-quality software.
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-none hover:shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
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

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px] grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-accent rounded-[22px] rotate-3" />
              <Image
                src="/about.jpg"
                alt="About Mahmoud Saad"
                fill
                className="rounded-[22px] object-cover shadow-xl relative -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
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
                I&apos;m a passionate Full-Stack Developer focused on creating
                scalable web applications and intuitive user interfaces.
              </p>
              <p>
                With expertise in{" "}
                <span className="text-foreground font-medium">
                  Next.js, React, and Node.js
                </span>
                , I help businesses turn ideas into powerful software — and now I
                teach what I&apos;ve learned about building fast with AI.
              </p>
            </div>

            <h3 className="text-[12.5px] font-semibold tracking-[0.14em] uppercase text-muted-foreground border-b border-border pb-3.5 mb-5">
              Technical proficiency
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <SkillCard key={skill} skill={skill} />
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="/book"
                className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-primary transition-colors"
              >
                Join the course
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
              Have a project in mind, or a question about the course? I&apos;d
              love to hear from you.
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
              href="https://www.linkedin.com/in/mahm0us-saad"
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
            © {new Date().getFullYear()} Mahmoud Saad. All rights reserved.
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
const SUPABASE_VIDEOS = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/course-videos`;
const heroClips = [
  { videoUrl: `${SUPABASE_VIDEOS}/clip1.mp4`, poster: "/videos/clip1.jpg" },
  { videoUrl: `${SUPABASE_VIDEOS}/clip2.mp4`, poster: "/videos/clip2.jpg" },
  { videoUrl: `${SUPABASE_VIDEOS}/clip3.mp4`, poster: "/videos/clip3.jpg" },
];

const projects = [
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
    title: "Sufrah WhatsApp Bot",
    image: "/projects/sufrah-bot/slide.png",
    tech: ["WhatsApp API", "Bot", "Restaurant Management", "Ordering System"],
    description:
      "WhatsApp bot for restaurant ordering system that enables customers to place orders directly through WhatsApp with automated order management.",
    github: "#",
    deploy: "https://www.sufrah.sa/whatsapp-bot",
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
    title: "Sufrah Platform",
    image: "/projects/sufrah.sa.png",
    tech: ["Next.js", "SSG", "Tailwind CSS"],
    description:
      "Smart platform for creating restaurant websites and applications quickly without code.",
    github: "#",
    deploy: "https://www.sufrah.sa/",
  },
  {
    title: "Amstore",
    image: "/projects/amstore.png",
    tech: ["Next.js", "Tailwind CSS", "E‑commerce"],
    description:
      "Custom e-commerce platform with high performance and modern user experience.",
    github: "#",
    deploy: "https://amstore-eg.com/",
  },
  {
    title: "OneCard",
    image: "/projects/onecard.png",
    tech: ["Next.js", "Design", "Payments"],
    description:
      "Elegant landing page showcasing expertise in integrations and providing a reliable experience.",
    github: "#",
    deploy: "https://www.onecard.com/",
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

const skills = [
  "Figma",
  "Next.js",
  "React",
  "Expo",
  "ReactNative",
  "Tailwind CSS",
  "AI",
  "Supabase",
  "Prisma",
  "Node.js",
  "Express.js",
  "Nginx",
];
