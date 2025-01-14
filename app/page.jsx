import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Menu,
  ArrowBigDown,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
import TechBadge, { SkillCard } from "@/components/ui/techBadge";
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold flex items-center gap-3">
            <Image
              width={50}
              height={100}
              src={"/logo.png"}
              alt={"logo"}
              className="rounded-lg"
            />
            <span>Mahmoud saad</span>
          </Link>
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
                I Deliver End-to-End Software Development Solutions
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
                      <TechBadge
                        key={tech}
                        tech={tech}
                        className="custom-class "
                      />
                    ))}
                  </div>
                  <div className="flex gap-4 justify-end items-end h-full">
                    {project.deploy !== "#" && (
                      <Link
                        href={project.deploy}
                        target="_blank"
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
                  <SkillCard key={skill} skill={skill} />
                ))}
              </div>
            </div>
            <div className="relative h-[400px] sm:w-[70%] w-full mx-auto">
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
        <div className="mt-8 flex justify-center gap-4">
          <Link target="_blank" href={"https://wa.me/+201157337829"}>
            <Button variant="secondary" size="icon">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                stroke="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M17.6 6.31999C16.8669 5.58141 15.9943 4.99596 15.033 4.59767C14.0716 4.19938 13.0406 3.99622 12 3.99999C10.6089 4.00135 9.24248 4.36819 8.03771 5.06377C6.83294 5.75935 5.83208 6.75926 5.13534 7.96335C4.4386 9.16745 4.07046 10.5335 4.06776 11.9246C4.06507 13.3158 4.42793 14.6832 5.12 15.89L4 20L8.2 18.9C9.35975 19.5452 10.6629 19.8891 11.99 19.9C14.0997 19.9001 16.124 19.0668 17.6222 17.5816C19.1205 16.0965 19.9715 14.0796 19.99 11.97C19.983 10.9173 19.7682 9.87634 19.3581 8.9068C18.948 7.93725 18.3505 7.05819 17.6 6.31999ZM12 18.53C10.8177 18.5308 9.65701 18.213 8.64 17.61L8.4 17.46L5.91 18.12L6.57 15.69L6.41 15.44C5.55925 14.0667 5.24174 12.429 5.51762 10.8372C5.7935 9.24545 6.64361 7.81015 7.9069 6.80322C9.1702 5.79628 10.7589 5.28765 12.3721 5.37368C13.9853 5.4597 15.511 6.13441 16.66 7.26999C17.916 8.49818 18.635 10.1735 18.66 11.93C18.6442 13.6859 17.9355 15.3645 16.6882 16.6006C15.441 17.8366 13.756 18.5301 12 18.53ZM15.61 13.59C15.41 13.49 14.44 13.01 14.26 12.95C14.08 12.89 13.94 12.85 13.81 13.05C13.6144 13.3181 13.404 13.5751 13.18 13.82C13.07 13.96 12.95 13.97 12.75 13.82C11.6097 13.3694 10.6597 12.5394 10.06 11.47C9.85 11.12 10.26 11.14 10.64 10.39C10.6681 10.3359 10.6827 10.2759 10.6827 10.215C10.6827 10.1541 10.6681 10.0941 10.64 10.04C10.64 9.93999 10.19 8.95999 10.03 8.56999C9.87 8.17999 9.71 8.23999 9.58 8.22999H9.19C9.08895 8.23154 8.9894 8.25465 8.898 8.29776C8.8066 8.34087 8.72546 8.403 8.66 8.47999C8.43562 8.69817 8.26061 8.96191 8.14676 9.25343C8.03291 9.54495 7.98287 9.85749 8 10.17C8.0627 10.9181 8.34443 11.6311 8.81 12.22C9.6622 13.4958 10.8301 14.5293 12.2 15.22C12.9185 15.6394 13.7535 15.8148 14.58 15.72C14.8552 15.6654 15.1159 15.5535 15.345 15.3915C15.5742 15.2296 15.7667 15.0212 15.91 14.78C16.0428 14.4856 16.0846 14.1583 16.03 13.84C15.94 13.74 15.81 13.69 15.61 13.59Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </Button>
          </Link>
          <Link target="_blank" href={"www.linkedin.com/in/mahm0us-saad"}>
            <Button variant="secondary" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
          <Link target="_blank" href={"https://github.com/mahm0udsaad"}>
            <Button variant="secondary" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
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
    tech: ["Next.js", "SSG", "React-PDF", "PDF Generation"],
    description:
      "Web-based tool for dynamic resume building and downloading with Google Sign-In authentication. Implemented serverless functions to reduce operational costs.",
    github: "#",
    deploy: "https://cv.cohr.sa/",
  },
  {
    title: "AbreezGroup Website",
    image: "/projects/abreez-site.jpg",
    tech: ["Next.js", "SSG", "Framer Motion", "Tailwind CSS"],
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
  {
    title: "Ebtekar Website",
    image: "/projects/eptecar.jpg",
    tech: ["Next.js", "SSG", "Tailwind CSS"],
    description:
      "Informative website about a manufacturer company in Saudi Arabia. Developed with Next.js and styled using Tailwind CSS for a modern and responsive design.",
    github: "#",
    deploy: "https://alibtekar.vercel.app/",
  },
];

const skills = [
  "Figma",
  "Next.js",
  "Expo",
  "React",
  "AI",
  "Tailwind CSS",
  "Prisma",
  "Node.js",
  "Express.js",
  "RESTful APIs",
  "Nginx",
];
