import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Developer Portfolio | Web & Mobile App Development",
  description:
    "Explore the portfolio of a Full-Stack Developer specializing in web and mobile app development. Discover projects, skills, and services to help you build your next digital solution.",
  keywords:
    "Full-Stack Developer, Web Development, Mobile App Development, Portfolio, JavaScript, React, Node.js, TypeScript, Next.js, Software Engineer, Freelance Developer",
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  og: {
    title: "Full-Stack Developer Portfolio | Web & Mobile App Development",
    description:
      "Explore the portfolio of a Full-Stack Developer specializing in web and mobile app development. Discover projects, skills, and services to help you build your next digital solution.",
    type: "website",
    url: "https://your-portfolio-url.com",
    image: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
