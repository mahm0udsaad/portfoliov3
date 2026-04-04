import Image from "next/image";
import Link from "next/link";
import { 
  ExternalLink, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Download,
  Phone,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
import TechBadge, { SkillCard } from "@/components/ui/techBadge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
               <Image
                width={50}
                height={50}
                src={"/logo.png"}
                alt={"logo"}
                className="object-cover"
              />
            </div>
            <span className="text-lg font-bold tracking-tight">Mahmoud Saad</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#projects" className="text-sm font-medium hover:text-primary transition-colors">
              Projects
            </Link>
            <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/Mahmoud_Saad%20Resume.pdf" target="_blank">
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
             {/* Simple mobile menu trigger - can be expanded to a Sheet later if needed */}
             <Link href="#contact">
                <Button size="sm">Get in Touch</Button>
             </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 lg:pt-40 lg:pb-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-green-100/50 via-background to-background dark:from-green-900/20"></div>
        
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center gap-8">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
              Available for new opportunities
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
              Building Scalable <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-400">
                Digital Experiences
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              I'm a Full-Stack Developer specializing in building exceptional digital products. 
              From conceptualization to deployment, I deliver robust, scalable, and user-centric solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="#projects">
                <Button size="lg" className="rounded-full px-8 h-12 text-base">
                  View My Work
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base">
                  Contact Me
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center gap-8 text-muted-foreground grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               {/* Tech Stack Hints */}
               <TechIcon icon="Next.js" />
               <TechIcon icon="React" />
               <TechIcon icon="Node.js" />
               <TechIcon icon="Supabase" />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-xl">
                A selection of projects that demonstrate my ability to solve complex problems 
                and deliver high-quality software.
              </p>
            </div>
            <Link href="https://github.com/mahm0udsaad" target="_blank">
               <Button variant="ghost" className="gap-2 group">
                 View all on GitHub 
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group flex flex-col overflow-hidden border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={project.deploy}
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-2.5 font-medium shadow hover:bg-white/90 transition-colors gap-2"
                    >
                      Visit Website
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechBadge
                        key={tech}
                        tech={tech}
                        className="text-xs py-0.5"
                      />
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

      {/* Mobile Apps Section - Commented out for now */}
      {/* 
      <section id="mobile-apps" className="py-24 px-4">
        <div className="container mx-auto">
           ...
        </div>
      </section> 
      */}

      {/* About Section */}
      <section id="about" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-primary/20 rounded-2xl transform rotate-3"></div>
                <Image
                  src="/about.jpg"
                  alt="About Mahmoud Saad"
                  fill
                  className="rounded-2xl object-cover shadow-xl relative transform -rotate-3 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
              <div className="space-y-4 text-lg text-muted-foreground mb-8">
                <p>
                  I am a passionate Full-Stack Developer with a strong focus on creating scalable web applications and intuitive user interfaces.
                </p>
                <p>
                  With expertise in modern technologies like <span className="text-foreground font-medium">Next.js, React, and Node.js</span>, 
                  I help businesses transform their ideas into powerful software solutions. I thrive on solving complex challenges and 
                  continuously learning new technologies to stay ahead in the rapidly evolving tech landscape.
                </p>
              </div>
              
              <h3 className="text-xl font-semibold mb-4">Technical Proficiency</h3>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>

              <div className="mt-10">
                <Link href="/Mahmoud_Saad%20Resume.pdf" target="_blank">
                  <Button variant="default" size="lg" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes/background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-white blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto">
              Have a project in mind or want to discuss a new opportunity? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="bg-background text-foreground rounded-2xl shadow-xl p-6 md:p-10 mb-12">
            <ContactForm />
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground">
            <SocialLink 
              href="mailto:mahmoud.saad.dev@gmail.com" // You might want to update this email
              icon={<Mail className="w-5 h-5" />}
              label="Email"
            />
            <SocialLink 
              href="https://wa.me/+201157337829" 
              icon={<Phone className="w-5 h-5" />}
              label="WhatsApp"
            />
            <SocialLink 
              href="https://www.linkedin.com/in/mahm0us-saad" 
              icon={<Linkedin className="w-5 h-5" />}
              label="LinkedIn"
            />
            <SocialLink 
              href="https://github.com/mahm0udsaad" 
              icon={<Github className="w-5 h-5" />}
              label="GitHub"
            />
          </div>
          
          <div className="text-center mt-12 text-primary-foreground/60 text-sm">
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
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-full backdrop-blur-sm"
    >
      {icon}
      <span className="font-medium">{label}</span>
    </Link>
  );
}

function TechIcon({ icon }) {
  // Simple helper for hero section logos - could be replaced with actual SVGs or Images
  return (
    <span className="font-semibold text-sm border px-3 py-1 rounded-md">{icon}</span>
  );
}

// Data
const projects = [
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
    image: "/projects/augen/Screenshot 2025-12-22 at 1.13.12 PM.png",
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

// Commented out mobileApps array to avoid unused variable warning if possible, or just leave it since it's used in commented code.
// Ideally remove if not needed, but keeping for reference if user uncomments.
/* 
const mobileApps = [ ... ];
*/
