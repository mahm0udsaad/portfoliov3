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
  openGraph: {
    title: "Mahmoud Saad Portfolio Website | Web & Mobile App Developer",
    description:
      "Explore the portfolio of a Full-Stack Developer specializing in web and mobile app development. Discover projects, skills, and services to help you build your next digital solution.",
    url: "https://mahmoudsaad.site",
    siteName: "Mahmoud Saad Portfolio",
    images: [
      {
        url: "https://cloud.sooqsquare.com/apps/sharingpath/nextcloud/upload/website.jpg",
        width: 600,
        height: 600,
        alt: "Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Saad Portfolio Website | Web & Mobile App Developer",
    description:
      "Explore the portfolio of a Full-Stack Developer specializing in web and mobile app development. Discover projects, skills, and services to help you build your next digital solution.",
    images: [
      {
        url: "https://cloud.sooqsquare.com/apps/sharingpath/nextcloud/upload/website.jpg",
        width: 600,
        height: 600,
        alt: "Website",
      },
    ],
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
