export const SITE_URL = "https://www.mahmoudsaad.art";

export const PROFILES = {
  github: "https://github.com/mahm0udsaad",
  linkedin: "https://www.linkedin.com/in/mahm0us-saad",
  whatsapp: "https://wa.me/+201157337829",
  email: "mailto:101mahm0udsaad@gmail.com",
};

const PERSON_ID = `${SITE_URL}/#person`;

function person(locale) {
  const ar = locale === "ar";
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Mahmoud Saad",
    alternateName: "محمود سعد",
    jobTitle: ar
      ? "مطور ويب وتطبيقات موبايل مستقل"
      : "Freelance Full-Stack Web & Mobile Developer",
    description: ar
      ? "محمود سعد — مبرمج ومطور مواقع وتطبيقات مستقل من مصر، متخصص في Next.js وReact Native وبوتات واتساب للأعمال."
      : "Mahmoud Saad is a freelance full-stack developer from Egypt specializing in Next.js websites, React Native mobile apps and WhatsApp Business API automation.",
    url: SITE_URL,
    image: `${SITE_URL}/me.jpg`,
    email: "101mahm0udsaad@gmail.com",
    address: { "@type": "PostalAddress", addressCountry: "EG" },
    knowsAbout: [
      "Next.js",
      "React",
      "React Native",
      "Node.js",
      "WhatsApp Business API",
      "E-commerce Development",
      "UI/UX Design",
      "Arabic RTL Web Development",
      "AI Integration",
    ],
    knowsLanguage: ["ar", "en"],
    sameAs: [PROFILES.github, PROFILES.linkedin],
  };
}

export function homeGraph(locale = "en") {
  const ar = locale === "ar";
  const pageUrl = ar ? `${SITE_URL}/ar` : SITE_URL;
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(locale),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: ar ? "محمود سعد — مطور ويب" : "Mahmoud Saad — Web Developer",
        url: pageUrl,
        inLanguage: ar ? "ar" : "en",
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: ar
          ? "محمود سعد — خدمات برمجة وتطوير مستقلة"
          : "Mahmoud Saad — Freelance Development Services",
        url: pageUrl,
        image: `${SITE_URL}/website.jpg`,
        areaServed: ar
          ? ["مصر", "السعودية", "الإمارات", "عن بُعد حول العالم"]
          : ["Egypt", "Saudi Arabia", "United Arab Emirates", "Worldwide (Remote)"],
        founder: { "@id": PERSON_ID },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: ar ? "خدمات التطوير" : "Development Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: ar
                  ? "تطوير مواقع Next.js"
                  : "Next.js Web Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: ar
                  ? "برمجة بوتات واتساب للأعمال (WhatsApp Business API)"
                  : "WhatsApp Business API & Chatbot Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: ar
                  ? "تطبيقات موبايل React Native"
                  : "React Native Mobile Apps",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: ar
                  ? "متاجر إلكترونية ومواقع ثنائية اللغة (عربي/إنجليزي)"
                  : "E-commerce & Arabic/English Bilingual Websites",
              },
            },
          ],
        },
      },
    ],
  };
}

export function courseSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "AI & Video Editing Course by Mahmoud Saad",
    description:
      "A hands-on cohort course teaching AI-powered video production and editing — from zero to publishing. Taught by Mahmoud Saad.",
    url: `${SITE_URL}/book`,
    provider: { "@id": PERSON_ID },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
    },
  };
}

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
