import Image from "next/image";
import Link from "next/link";
import {
  Github,
  ExternalLink,
  Menu,
  Linkedin,
  ArrowBigDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <Image
              width={150}
              height={100}
              src={"/logo.svg"}
              alt={"logo"}
              className="rounded-lg"
            />
          </Link>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="shadow-xl relative w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-200 via-green-200 to-green-300">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Hello, I'm a Full-Stack Developer 👋
              </h1>
              <p className="text-xl md:text-2xl max-w-2xl mb-8">
                I develop ideas and help build a better world through software.
              </p>
              <div className="flex gap-2">
                <Link
                  href={"#projects"}
                  className="text-white bg-gray-800 rounded-full flex items-center p-2 hover:bg-green-600"
                >
                  <ArrowBigDown />{" "}
                </Link>
                <Link href={"#contact"}>
                  <Button>Contact</Button>
                </Link>
                <Link href={"/resume.pdf"} target="_blank">
                  <Button variant="outline">
                    Download CV
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12">Latest Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.title} className="overflow-hidden group ">
                <div className="aspect-video relative">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end items-end h-full">
                    {project.deploy !== "#" && (
                      <Link
                        href={project.deploy}
                        target=""
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-12">About Me</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg mb-6">
                Skilled Full-Stack Developer specializing in scalable web
                applications and user-friendly interfaces. Proficient in
                Next.js, React, Node.js, and other modern technologies. Strong
                background in creating high-performance and impactful software
                solutions.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Skills</h3>
              <div className="grid grid-cols-3 gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center p-2 bg-background rounded-lg"
                  >
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] w-[60%] mx-auto">
              <Image
                src="/about.jpg"
                alt="About illustration"
                fill
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-16 px-4 bg-primary text-primary-foreground"
      >
        <div className="container mx-auto">
          <ContactForm />
          {/* Rest of your social links */}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            Mahmoud Saad for Delivering End-to-End Software Development
            Solutions. ❤️
          </p>
        </div>
      </footer>
    </div>
  );
}

const projects = [
  {
    title: "Resume Builder",
    image: "/projects/cohr.jpg",
    tech: ["Next.js", "Google Auth", "PDF Generation"],
    description:
      "Web-based tool for dynamic resume building and downloading with Google Sign-In authentication. Implemented serverless functions to reduce operational costs.",
    github: "#",
    deploy: "https://cv.cohr.sa/",
  },
  {
    title: "AbreezGroup Website",
    image: "/projects/abreez-site.jpg",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "Designed a user-friendly and visually appealing interface for an eco-friendly product Website. Effectively displayed products using a clean and modern design, ensuring easy navigation and a pleasant user experience.",
    github: "#",
    deploy: "https://abreezstock.com/",
  },
  {
    title: "Elsewedy Automation Website",
    image: "/projects/sewedy.jpg",
    tech: ["Next.js", "SSG", "DevOps", "Nginx", "PM2"],
    description:
      "Created company website with Next.js SSG, deployed mail and cloud servers, managed Ubuntu VPS with Nginx and PM2. Implemented cost-effective solutions by replacing third-party services.",
    github: "#",
    deploy: "https://www.elsewedy-automation.com/",
  },
  {
    title: "Mobile App Landing Page",
    image: "/projects/halaqr-site.jpg",
    tech: ["React Native", "UI/UX", "WhatsApp API"],
    description:
      "Mobile app for designing and sharing invitations via WhatsApp, focused on UI/UX design and frontend development. Utilized efficient state management for optimal performance.",
    github: "#",
    deploy: "https://hala-qr-site.vercel.app/",
  },

  {
    title: "Mobile App UI/UX",
    image: "/projects/hala-design.jpg",
    tech: ["Figma", "UI/UX", "Prototyping"],
    description:
      "Designed a user-friendly and visually appealing interface for an invitation designer app. Focused on creating intuitive user flows and interactive prototypes using Figma. Ensured a seamless user experience through meticulous attention to detail and user feedback.",
    github: "#",
    deploy:
      "https://www.figma.com/design/lXpObprsDsVJDQfhbUQO57/Invitation-Designer-UI?node-id=0-1&p=f&t=a9lDdPcGX0te8LUd-0",
  },

  {
    title: "DailyTravel Website",
    image: "/projects/daily.jpg",
    tech: ["Next.js", "Paymob", "REST API"],
    description:
      "Built company website with Next.js and integrated Paymob payment services for seamless transactions. Implemented server-side optimizations for improved performance and reduced hosting costs.",
    github: "#",
    deploy: "https://dailtravel.vercel.app/",
  },

  {
    title: "TowSoft Company Website",
    image: "/projects/towsoft.jpg",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    description:
      "Designed and developed company website with Next.js featuring heavy animations via Framer Motion. Optimized for performance and cost-efficiency.",
    github: "#",
    deploy: "https://nakul-narewal-website.vercel.app/",
  },
];

const skills = [
  "Next.js",
  "React",
  "Tailwind CSS",
  "Prisma",
  "Node.js",
  "Express.js",
  "RESTful APIs",
  "Figma",
];
