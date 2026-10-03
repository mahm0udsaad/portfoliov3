import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import localFont from "next/font/local";
import { Bricolage_Grotesque } from "next/font/google";
import "../globals.css";

// Body: Geist, self-hosted from app/fonts (no extra request to Google).
const geist = localFont({
  src: "../fonts/GeistVF.woff",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
});

// Display: Bricolage Grotesque. Components use the `font-serif` utility as
// the display role, so it is bound to --font-serif.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahmoudsaad.art"),
  title: {
    default:
      "Mahmoud Saad — Freelance Full-Stack Web Developer | Next.js & React Native",
    template: "%s | Mahmoud Saad",
  },
  description:
    "Mahmoud Saad (محمود سعد) is a freelance full-stack web & mobile developer in Egypt. I build Next.js websites, React Native apps, e-commerce platforms and WhatsApp Business API bots for clients in Egypt, Saudi Arabia and worldwide.",
  keywords: [
    "Mahmoud Saad",
    "محمود سعد",
    "freelance web developer",
    "freelance web developer Egypt",
    "Next.js developer",
    "React Native developer",
    "WhatsApp Business API developer",
    "مطور ويب مستقل",
    "مبرمج مواقع",
    "full-stack developer",
    "UI/UX developer",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  openGraph: {
    title: "Mahmoud Saad — Freelance Full-Stack Web Developer",
    description:
      "Freelance full-stack developer in Egypt building Next.js websites, React Native apps and WhatsApp automation for clients worldwide.",
    url: "/",
    siteName: "Mahmoud Saad — Web Developer",
    images: [
      {
        url: "/website.jpg",
        width: 1280,
        height: 632,
        alt: "Mahmoud Saad — Freelance Full-Stack Web Developer",
      },
    ],
    locale: "en_US",
    alternateLocale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Saad — Freelance Full-Stack Web Developer",
    description:
      "Freelance full-stack developer in Egypt building Next.js websites, React Native apps and WhatsApp automation for clients worldwide.",
    images: ["/website.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geist.variable} ${bricolage.variable} font-sans`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
