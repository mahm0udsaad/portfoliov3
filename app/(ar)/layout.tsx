import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "../globals.css";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mahmoudsaad.art"),
  title: {
    default: "محمود سعد — مطور ويب مستقل | برمجة مواقع وتطبيقات Next.js في مصر",
    template: "%s | محمود سعد",
  },
  description:
    "محمود سعد (Mahmoud Saad) — مبرمج ومطور مواقع وتطبيقات موبايل مستقل من مصر. تطوير مواقع Next.js، تطبيقات React Native، متاجر إلكترونية، وبوتات واتساب للأعمال في مصر والسعودية والخليج.",
  keywords: [
    "محمود سعد",
    "Mahmoud Saad",
    "مطور ويب مستقل",
    "مبرمج مواقع",
    "مطور مواقع",
    "برمجة تطبيقات موبايل",
    "تطوير موقع الكتروني",
    "مطور Next.js",
    "برمجة بوت واتساب",
    "برمجة متجر الكتروني",
    "مبرمج مواقع في مصر",
  ],
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "محمود سعد — مطور ويب وتطبيقات موبايل مستقل",
    description:
      "مطور Full-Stack مستقل من مصر: مواقع Next.js، تطبيقات React Native، متاجر إلكترونية، وبوتات واتساب للأعمال.",
    url: "/ar",
    siteName: "محمود سعد — مطور ويب",
    images: [
      {
        url: "/website.jpg",
        width: 1280,
        height: 632,
        alt: "محمود سعد — مطور ويب وتطبيقات موبايل مستقل",
      },
    ],
    locale: "ar_EG",
    alternateLocale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "محمود سعد — مطور ويب وتطبيقات موبايل مستقل",
    description:
      "مطور Full-Stack مستقل من مصر: مواقع Next.js، تطبيقات React Native، متاجر إلكترونية، وبوتات واتساب للأعمال.",
    images: ["/website.jpg"],
  },
};

export default function ArabicRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${plexArabic.variable} font-sans`}
        style={{ "--font-serif": "var(--font-sans)" } as React.CSSProperties}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
