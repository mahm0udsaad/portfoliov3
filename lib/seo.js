export const SITE_URL = "https://www.mahmoudsaad.art";

export const PROFILES = {
  github: "https://github.com/mahm0udsaad",
  linkedin: "https://www.linkedin.com/in/mahm0udsaad",
  mostaql: "https://mostaql.com/u/mahm0udsa",
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
    sameAs: [PROFILES.github, PROFILES.linkedin, PROFILES.mostaql],
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
    name: "AI Video Editing Course — Learn Video Editing with AI",
    description:
      "A hands-on online video editing course that teaches you to create and edit professional videos using AI — from zero to publishing. Learn AI video generation, editing, captions, color grading and content workflows for Reels, TikTok and YouTube. Taught by Mahmoud Saad.",
    url: `${SITE_URL}/book`,
    inLanguage: ["en", "ar"],
    provider: { "@id": PERSON_ID },
    isAccessibleForFree: false,
    educationalLevel: "Beginner",
    teaches: [
      "AI video generation",
      "AI-powered video editing",
      "Video editing fundamentals",
      "Cuts, transitions & captions",
      "Color grading",
      "Content workflows for Reels, TikTok & YouTube",
    ],
    about: [
      "Video Editing",
      "AI Video Editing",
      "Content Creation",
      "Artificial Intelligence",
    ],
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: "999",
      priceCurrency: "EGP",
      availability: "https://schema.org/LimitedAvailability",
      url: `${SITE_URL}/book`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: "PT6W",
      instructor: { "@id": PERSON_ID },
    },
  };
}

const COURSE_FAQ = [
  {
    q: "Do I need any video editing experience to join?",
    a: "No. This AI video editing course starts from zero — it's built for total beginners as well as creators who want to edit faster with AI. You'll learn the fundamentals and the AI tools side by side.",
  },
  {
    q: "What will I learn in the course?",
    a: "You'll learn to generate video, images and voiceovers with the latest AI tools, edit like a pro (cuts, transitions, captions and color grading), automate repetitive editing, and turn one idea into content for Reels, TikTok and YouTube.",
  },
  {
    q: "Is the course online?",
    a: "Yes. It's a fully online cohort course you can follow from anywhere, with real projects and direct feedback from the instructor.",
  },
  {
    q: "How do I reserve a seat?",
    a: "Just enter your name and phone number on this page — it takes about 15 seconds and no payment is required now. We'll message you on WhatsApp with the schedule and details within 24 hours.",
  },
  {
    q: "How much does the course cost?",
    a: "The first cohort is priced at 999 EGP. You reserve your seat for free now and only pay once the schedule is confirmed.",
  },
];

export function courseFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: COURSE_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export { COURSE_FAQ };

// Arabic hire-intent FAQ — targets real search queries used by people looking
// to hire a freelance developer ("مطور مستقل", "مبرمج مواقع", …) and powers
// FAQ rich results on /ar.
const AR_FAQ = [
  {
    q: "كيف أوظّف مطور مواقع مستقل محترف؟",
    a: "للتعاقد مع محمود سعد — مطور ويب وتطبيقات Full-Stack مستقل — راسله مباشرة عبر واتساب أو نموذج التواصل في الموقع. يبدأ العمل بمكالمة قصيرة لفهم فكرتك، ثم عرض سعر ومدة واضحين قبل بدء التنفيذ.",
  },
  {
    q: "ما الخدمات التي يقدمها محمود سعد؟",
    a: "تطوير مواقع Next.js، تطبيقات موبايل React Native، متاجر إلكترونية، وبوتات وأتمتة واتساب للأعمال (WhatsApp Business API)، بالإضافة إلى تصميم واجهات المستخدم UI/UX ودمج الذكاء الاصطناعي.",
  },
  {
    q: "هل تعمل مع عملاء خارج مصر (السعودية والخليج)؟",
    a: "نعم، أعمل عن بُعد مع عملاء في مصر والسعودية والإمارات وباقي دول الخليج والعالم، ولديّ مشاريع منفّذة لمتاجر وشركات في السوق السعودي.",
  },
  {
    q: "كم تكلفة تطوير موقع أو تطبيق مع مطور مستقل؟",
    a: "تختلف التكلفة حسب حجم المشروع ومميزاته. بعد فهم متطلباتك أقدّم عرض سعر ثابت وواضح دون مفاجآت. تواصل معي للحصول على تقدير مجاني لمشروعك.",
  },
  {
    q: "ما التقنيات التي تستخدمها في التطوير؟",
    a: "أعتمد على Next.js وReact وReact Native وNode.js وTailwind CSS وSupabase، مع دمج الذكاء الاصطناعي وواجهة واتساب للأعمال حسب حاجة كل مشروع.",
  },
  {
    q: "كم يستغرق تنفيذ المشروع؟",
    a: "تستغرق المواقع التعريفية عادةً من أسبوع إلى أسبوعين، بينما تحتاج المتاجر الإلكترونية والتطبيقات الأكبر من ٣ إلى ٦ أسابيع حسب المتطلبات.",
  },
];

export function arFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: "ar",
    mainEntity: AR_FAQ.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export { AR_FAQ };

export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
