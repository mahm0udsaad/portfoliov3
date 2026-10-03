/**
 * All homepage copy and data, per locale. The page component is shared, so
 * English and Arabic stay structurally identical — edit words here, not JSX.
 */

const WHATSAPP = "201157337829";

/* Work tabs, in display order. Each project's default category is set in
   PROJECT_MEDIA; /admin/projects can override it. */
export const PROJECT_CATEGORIES = ["systems", "websites", "apps", "designs"];

/* Newest films, shown first in the "Just released" row and teased in the
   hero. Previews are short, silent, low-res loops (~200KB)
   that autoplay only while on screen; the full file loads on tap. */
const NEW_RELEASES = [
  {
    id: "kiara-launch",
    videoUrl: "/videos/kiara-launch.mp4",
    previewUrl: "/videos/kiara-launch-preview.mp4",
    poster: "/videos/kiara-launch.jpg",
    hasAudio: false,
  },
  {
    id: "nehgz-story",
    videoUrl: "/videos/nehgz-story.mp4",
    previewUrl: "/videos/nehgz-story-preview.mp4",
    poster: "/videos/nehgz-story.jpg",
    hasAudio: true,
  },
];

const SHOWREEL_FEATURE = {
  videoUrl: "/videos/tres-ad.mp4",
  poster: "/videos/tres-ad.jpg",
};

const SHOWREEL_CLIPS = [
  { videoUrl: "/videos/clip4.mp4", poster: "/videos/clip4.jpg" },
  { videoUrl: "/videos/clip5.mp4", poster: "/videos/clip5.jpg" },
];

const PROJECT_MEDIA = {
  skylight: { category: "systems", image: "/projects/rawasm/rawasm-1.jpg", deploy: "https://skylight.rwasem.com", tech: ["Next.js", "Supabase", "AI Assistant", "RTL Dashboard"] },
  kiara: { category: "systems", image: "/projects/kiara/kiara-1.jpg", deploy: "https://kiara-chat-eight.vercel.app", tech: ["Next.js", "WhatsApp API", "Supabase", "Realtime"] },
  multigates: { category: "websites", image: "/projects/multigates/multigates-1.jpg", deploy: "https://multigates-eg.vercel.app", tech: ["Next.js", "next-intl", "Supabase", "SEO"] },
  nehgz: { category: "systems", image: "/projects/nehgzbot/nehgzbot-1.png", deploy: "https://nehgzbot.com/", tech: ["Next.js", "WhatsApp API", "AI", "Bot"] },
  tres: { category: "websites", image: "/projects/tres/tres-1.png", deploy: "https://tres.com.sa/", tech: ["Next.js", "E‑commerce", "UI/UX"] },
  postaty: { category: "systems", image: "/projects/postaty.png", deploy: "https://www.postaty.com/", tech: ["Next.js", "Supabase", "AI", "Google Nano Banana API"] },
  wasit: { category: "apps", image: "/projects/waiseet-alan.png", deploy: "https://www.wasitalan.com/", tech: ["Next.js", "Expo", "React Native", "Supabase"] },
  augen: { category: "websites", image: "/projects/augen/augen-1.png", deploy: "http://augeneg.com", tech: ["Next.js", "Admin Dashboard", "Inventory Management", "E-commerce"] },
  tabel: { category: "websites", image: "/projects/tabel/slide.png", deploy: "https://tatbela-tabel.vercel.app", tech: ["Next.js", "E-commerce", "B2B", "B2C", "Paymob", "Payment Gateway"] },
  abreez: { category: "websites", image: "/projects/abreez-site.jpg", deploy: "https://abreezstock.com/", tech: ["Next.js", "SSG", "Framer Motion", "Tailwind CSS"] },
  cohr: { category: "systems", image: "/projects/cohr.jpg", deploy: "https://cv.cohr.sa/", tech: ["Next.js", "SSG", "React-PDF", "PDF Generation"] },
  halaqr: { category: "apps", image: "/projects/halaqr-site.jpg", deploy: "https://hala-qr-site.vercel.app/", tech: ["React Native", "UI/UX", "WhatsApp API"] },
  haladesign: { category: "designs", image: "/projects/hala-design.jpg", deploy: "https://www.figma.com/design/lXpObprsDsVJDQfhbUQO57/Invitation-Designer-UI?node-id=0-1&p=f&t=a9lDdPcGX0te8LUd-0", tech: ["Figma", "UI/UX", "Prototyping"] },
  sewedy: { category: "websites", image: "/projects/sewedy.jpg", deploy: "https://www.elsewedy-automation.com/", tech: ["Next.js", "SSG", "DevOps", "Nginx", "PM2"] },
};

const SERVICE_MEDIA = {
  web: "/visuals/service-web.jpg",
  mobile: "/visuals/service-mobile.jpg",
  whatsapp: "/visuals/service-whatsapp.jpg",
  ecommerce: "/visuals/service-ecommerce.jpg",
};

function withMedia(projects) {
  return projects.map((p) => ({ ...PROJECT_MEDIA[p.id], ...p }));
}

function withVisuals(services) {
  return services.map((s) => ({ ...s, visual: SERVICE_MEDIA[s.iconKey] }));
}

const en = {
  locale: "en",
  dir: "ltr",
  home: "/",
  nav: {
    links: [
      { href: "#services", label: "Services" },
      { href: "#work", label: "Work" },
      { href: "#films", label: "Films", isNew: true },
      { href: "#process", label: "Process" },
      { href: "/book", label: "Course" },
      { href: "#contact", label: "Contact" },
    ],
    cta: "Start a project",
    lang: { href: "/ar", hrefLang: "ar", label: "العربية" },
    menu: "Menu",
    close: "Close menu",
    newTag: "New",
  },
  hero: {
    dir: "ltr",
    person: "Mahmoud Saad",
    available: "Available for new projects",
    seoTitle:
      "Mahmoud Saad — freelance web & mobile developer building websites, mobile apps, WhatsApp bots, online stores and launch films that sell.",
    before: "I build",
    words: ["websites", "mobile apps", "WhatsApp bots", "online stores", "launch films"],
    after: "that sell.",
    lead: "Freelance full-stack developer for businesses in Egypt, Saudi Arabia and the Gulf. Design, code and the launch ad, all from one person.",
    primary: "Start your project",
    secondary: "See the work",
    whatsapp: "Chat on WhatsApp",
    whatsappHref: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi Mahmoud, I'd like to discuss a project.")}`,
    reel: {
      tag: "New",
      title: "Kiara launch film",
      href: "#films",
      cta: "Watch the new films",
    },
  },
  work: {
    title: "Previous work, live and earning",
    lead: "Systems, websites, apps and designs that are in production and used by real teams and customers every day. Pick a category.",
    github: "All code on GitHub",
    visit: "Visit website",
    tabs: { systems: "Systems", websites: "Websites", apps: "Mobile apps", designs: "Designs" },
    tabsShort: { apps: "Apps" },
    viewDesign: "View full size",
    close: "Close",
  },
  services: {
    title: "What I can build for you",
    lead: "Four things I ship every week, each built to bring in customers or save your team hours.",
    end: {
      title: "Not sure which one you need?",
      body: "Tell me the problem, not the tech. I'll suggest the simplest thing that solves it.",
      cta: "Describe your project",
    },
    items: withVisuals([
      {
        title: "Websites & web apps",
        iconKey: "web",
        description:
          "Fast, search-ready sites and platforms in Next.js. Built to load quickly, rank on Google and turn visitors into enquiries.",
        points: ["Landing pages and company sites", "Dashboards and web platforms", "Speed, SEO and analytics built in"],
      },
      {
        title: "Mobile apps",
        iconKey: "mobile",
        description:
          "One React Native codebase for iOS and Android, sharing data with your website. Launch on both stores without paying twice.",
        points: ["iOS and Android from one codebase", "Same backend as your website", "App Store and Google Play release"],
      },
      {
        title: "WhatsApp & AI automation",
        iconKey: "whatsapp",
        description:
          "Bots that answer customers, take bookings and route chats to your team around the clock, on the number your customers already use.",
        points: ["Auto-replies and bookings 24/7", "One shared inbox for your team", "AI that answers in your brand's voice"],
      },
      {
        title: "Online stores",
        iconKey: "ecommerce",
        description:
          "Bilingual Arabic and English stores with Paymob and local payments, inventory, and an admin panel your team can run on day one.",
        points: ["Paymob and local payment gateways", "Orders, inventory and invoices", "Arabic and English storefront"],
      },
    ]),
  },
  films: {
    title: "Launch films and ads, made in-house",
    lead: "A product nobody sees doesn't sell. I write, animate and edit the films that introduce it: launch videos, vertical ads for Reels, TikTok and WhatsApp Status, and the brand visuals around them.",
    newHeading: "Just released",
    newTag: "New",
    play: "Play",
    soundOff: "Silent motion film",
    releases: [
      {
        ...NEW_RELEASES[0],
        title: "Kiara — launch film",
        caption:
          "Eight staff, one WhatsApp number, zero chaos. Launch film for Kiara, a WhatsApp operations app, from script to final motion.",
      },
      {
        ...NEW_RELEASES[1],
        title: "Nehgz Hub — story ad",
        caption:
          "A salon owner's booking headache, solved in 35 seconds. Vertical ad for WhatsApp Status and Reels.",
      },
    ],
    archiveHeading: "From the reel",
    feature: {
      ...SHOWREEL_FEATURE,
      title: "TRES commercial",
      caption:
        "TRES, a specialty coffee roaster in Taif. Concept, edit and motion graphics for a brand whose website I also built.",
      playLabel: "Play the TRES commercial",
    },
    clips: SHOWREEL_CLIPS,
    clipAlt: "Vertical ad sample",
    clipHint: "Tap to watch. Vertical ads cut for WhatsApp Status, Reels and TikTok.",
    primary: "Get a film for your brand",
    secondary: "Learn to make them yourself",
  },
  process: {
    title: "How a project runs",
    lead: "No black box. You always know what's happening, what it costs and what comes next.",
    steps: [
      {
        title: "A short call",
        body: "You explain the goal and I ask the questions that shape the scope. You leave with a clear next step, free.",
      },
      {
        title: "Fixed quote and plan",
        body: "Scope, timeline and price in writing before any work starts. No hourly surprises.",
      },
      {
        title: "Build in visible steps",
        body: "You follow progress on a live link and steer while changes are still cheap to make.",
      },
      {
        title: "Launch and grow",
        body: "Deployment, analytics and a film to announce it. I stay on for fixes and the next feature.",
      },
    ],
  },
  about: {
    title: "One person, the whole launch",
    body: [
      "I'm Mahmoud Saad, a full-stack developer based in Egypt. I've shipped agency dashboards, WhatsApp service desks, online stores, booking platforms and mobile apps for clients across Egypt, Saudi Arabia and the Gulf.",
      "You work directly with me, from design in Figma to Next.js and React Native in production, WhatsApp and AI automation, and the film that launches it. Every product is Arabic-ready and bilingual from day one, with full right-to-left support. I also teach what I've learned about building fast with AI.",
    ],
    stackLabel: "Technical stack of Mahmoud Saad",
    cta: "Work with me",
  },
  faq: {
    title: "Questions clients ask first",
  },
  contact: {
    title: "Have a project in mind? Let's get it live.",
    lead: "Tell me what you're building and where you're stuck. I'll reply with honest, clear next steps.",
    email: "Email",
    whatsapp: "WhatsApp",
    linkedin: "LinkedIn",
    github: "GitHub",
    footer: "Mahmoud Saad, freelance web & mobile developer",
    langLink: { href: "/ar", hrefLang: "ar", label: "العربية" },
  },
  projects: withMedia([
    {
      id: "skylight",
      title: "Skylight — agency command center",
      description:
        "Arabic-first operating system for a Saudi marketing agency: sales handover, clients, projects, auto-generated tasks, SLA and satisfaction KPIs, plus a built-in AI assistant. It replaced a customised Odoo deployment.",
    },
    {
      id: "kiara",
      title: "Kiara Chat",
      description:
        "White-label WhatsApp service desk for a spa: live conversations, staff assignment, today's bookings and workload reports in one Arabic dashboard.",
    },
    {
      id: "multigates",
      title: "Multi Gates",
      description:
        "Bilingual corporate site for an industrial bearings distributor in Egypt, with a searchable product catalog, brands and industries, all managed from Supabase.",
    },
    {
      id: "nehgz",
      title: "Nehgz",
      description:
        "WhatsApp AI desk that connects a business's WhatsApp to its booking system. It replies to customers and manages appointments 24/7 from one app.",
    },
    {
      id: "tres",
      title: "TRES",
      description:
        "Brand and ordering site for a specialty coffee roaster in Taif, pairing illustrated storytelling with a bilingual RTL/LTR menu.",
    },
    {
      id: "postaty",
      title: "Postaty",
      description:
        "AI social post generator that turns a product and an offer into ready-to-publish creatives in seconds.",
    },
    {
      id: "wasit",
      title: "Wasit Alan",
      description:
        "Mobile app and web platform for transfer, follow-up and public-service requests, sharing one stack across web and mobile.",
    },
    {
      id: "augen",
      title: "Augen",
      description:
        "Luxury eyewear store with a full admin dashboard for orders, inventory and customer data.",
    },
    {
      id: "tabel",
      title: "Tatbela & Tabel",
      description:
        "B2B and B2C spice store with an integrated Paymob payment gateway for wholesale and retail customers.",
    },
    {
      id: "abreez",
      title: "Abreez Group",
      description:
        "Product showcase for an eco-friendly packaging company, with a clean catalog that lets buyers find the right item fast.",
    },
    {
      id: "cohr",
      title: "Resume Builder",
      description:
        "Build-and-download resume tool with Google sign-in and serverless PDF generation.",
    },
    {
      id: "halaqr",
      title: "Hala QR landing page",
      description:
        "Landing page for an app that designs invitations and shares them over WhatsApp.",
    },
    {
      id: "haladesign",
      title: "Invitation app UI/UX",
      description:
        "Figma design for an invitation-maker app, focused on short, obvious user flows.",
    },
    {
      id: "sewedy",
      title: "Elsewedy Automation",
      description:
        "Company website on Next.js SSG, plus mail and cloud servers on an Ubuntu VPS with Nginx and PM2.",
    },
  ]),
};

const ar = {
  locale: "ar",
  dir: "rtl",
  home: "/ar",
  nav: {
    links: [
      { href: "#services", label: "الخدمات" },
      { href: "#work", label: "أعمالي" },
      { href: "#films", label: "الأفلام", isNew: true },
      { href: "#process", label: "طريقة العمل" },
      { href: "/book", label: "الدورة" },
      { href: "#contact", label: "تواصل" },
    ],
    cta: "ابدأ مشروعك",
    lang: { href: "/", hrefLang: "en", label: "English" },
    menu: "القائمة",
    close: "إغلاق القائمة",
    newTag: "جديد",
  },
  hero: {
    dir: "rtl",
    person: "محمود سعد",
    available: "متاح لمشاريع جديدة",
    seoTitle:
      "محمود سعد — مطور مواقع وتطبيقات موبايل مستقل: مواقع، تطبيقات، بوتات واتساب، متاجر إلكترونية وإعلانات تبيع.",
    before: "أبني لك",
    words: ["مواقع", "تطبيقات", "بوتات واتساب", "متاجر", "إعلانات"],
    after: "تبيع.",
    lead: "مطور Full-Stack مستقل لأعمال في مصر والسعودية والخليج. التصميم والبرمجة وإعلان الإطلاق، كلها من شخص واحد.",
    primary: "ابدأ مشروعك",
    secondary: "شاهد أعمالي",
    whatsapp: "تواصل عبر واتساب",
    whatsappHref: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent("أهلاً محمود، أريد مناقشة مشروع.")}`,
    reel: {
      tag: "جديد",
      title: "فيلم إطلاق كيارا",
      href: "#films",
      cta: "شاهد الأفلام الجديدة",
    },
  },
  work: {
    title: "أعمال سابقة تعمل الآن وتحقق نتائج",
    lead: "أنظمة ومواقع وتطبيقات وتصاميم في الإنتاج، يستخدمها فرق وعملاء حقيقيون كل يوم. اختر التصنيف.",
    github: "كل الأكواد على GitHub",
    visit: "زيارة الموقع",
    tabs: { systems: "أنظمة", websites: "مواقع", apps: "تطبيقات موبايل", designs: "تصاميم" },
    tabsShort: { apps: "تطبيقات" },
    viewDesign: "عرض بالحجم الكامل",
    close: "إغلاق",
  },
  services: {
    title: "ماذا أستطيع أن أبني لك؟",
    lead: "أربع خدمات أنفّذها كل أسبوع، وكل واحدة مصممة لتجلب لك عملاء أو توفر على فريقك ساعات.",
    end: {
      title: "مش متأكد أي واحدة تحتاج؟",
      body: "احكِ لي المشكلة، مش التقنية. وسأقترح أبسط حل يعالجها.",
      cta: "صف مشروعك",
    },
    items: withVisuals([
      {
        title: "المواقع وتطبيقات الويب",
        iconKey: "web",
        description:
          "مواقع ومنصات بتقنية Next.js مبنية لتفتح بسرعة، وتظهر في نتائج Google، وتحوّل الزائر إلى عميل يتواصل معك.",
        points: ["صفحات هبوط ومواقع شركات", "لوحات تحكم ومنصات ويب", "سرعة وSEO وتحليلات مدمجة"],
      },
      {
        title: "تطبيقات الموبايل",
        iconKey: "mobile",
        description:
          "كود واحد بـ React Native لـ iOS وAndroid يشارك البيانات مع موقعك. تنزل على المتجرين دون أن تدفع مرتين.",
        points: ["iOS وAndroid من كود واحد", "نفس قاعدة بيانات موقعك", "النشر على App Store وGoogle Play"],
      },
      {
        title: "أتمتة واتساب والذكاء الاصطناعي",
        iconKey: "whatsapp",
        description:
          "بوتات ترد على عملائك وتستقبل الحجوزات وتوزّع المحادثات على فريقك على مدار الساعة، على نفس الرقم الذي يعرفه عملاؤك.",
        points: ["ردود وحجوزات تلقائية على مدار الساعة", "صندوق محادثات موحّد لفريقك", "ذكاء اصطناعي يرد بأسلوب علامتك"],
      },
      {
        title: "المتاجر الإلكترونية",
        iconKey: "ecommerce",
        description:
          "متاجر بالعربية والإنجليزية مع Paymob وبوابات الدفع المحلية، وإدارة مخزون، ولوحة تحكم يديرها فريقك من أول يوم.",
        points: ["Paymob وبوابات الدفع المحلية", "الطلبات والمخزون والفواتير", "واجهة متجر بالعربية والإنجليزية"],
      },
    ]),
  },
  films: {
    title: "أفلام الإطلاق والإعلانات، من صناعتي",
    lead: "المنتج الذي لا يراه أحد لا يبيع. أكتب وأحرّك وأمنتج الأفلام التي تقدّمه للناس: فيديوهات إطلاق، إعلانات عمودية للريلز والتيك توك وحالة واتساب، والهوية البصرية حولها.",
    newHeading: "صدر حديثًا",
    newTag: "جديد",
    play: "تشغيل",
    soundOff: "فيلم موشن بدون صوت",
    releases: [
      {
        ...NEW_RELEASES[0],
        title: "كيارا — فيلم الإطلاق",
        caption:
          "ثمانية موظفين، رقم واتساب واحد، ولا فوضى. فيلم إطلاق لتطبيق كيارا لإدارة العمليات عبر واتساب، من السيناريو حتى الموشن النهائي.",
      },
      {
        ...NEW_RELEASES[1],
        title: "نحجز هب — إعلان ستوري",
        caption:
          "صداع حجوزات صاحبة الصالون، محلول في ٣٥ ثانية. إعلان عمودي لحالة واتساب والريلز.",
      },
    ],
    archiveHeading: "من أرشيف الأعمال",
    feature: {
      ...SHOWREEL_FEATURE,
      title: "إعلان تريس",
      caption:
        "تريس، محمصة قهوة مختصة في الطائف. الفكرة والمونتاج والموشن جرافيك من تنفيذي، لعلامة برمجت لها الموقع أيضًا.",
      playLabel: "شغّل إعلان تريس",
    },
    clips: SHOWREEL_CLIPS,
    clipAlt: "نموذج إعلان عمودي",
    clipHint: "اضغط للمشاهدة. إعلانات عمودية مصممة لحالة واتساب والريلز والتيك توك.",
    primary: "اطلب فيلمًا لعلامتك",
    secondary: "أو تعلّم صناعتها بنفسك",
  },
  process: {
    title: "كيف يسير المشروع",
    lead: "بلا صناديق سوداء. تعرف دائمًا ما الذي يحدث، وكم يكلّف، وما الخطوة التالية.",
    steps: [
      {
        title: "مكالمة قصيرة",
        body: "تشرح الهدف، وأسأل الأسئلة التي تحدد نطاق العمل. تخرج بخطوة تالية واضحة، مجانًا.",
      },
      {
        title: "عرض سعر ثابت وخطة",
        body: "النطاق والمدة والسعر مكتوبة قبل بدء أي عمل. بلا مفاجآت.",
      },
      {
        title: "تنفيذ على مراحل واضحة",
        body: "تتابع التقدم على رابط مباشر، وتوجّه العمل بينما التعديل ما زال سهلًا وغير مكلف.",
      },
      {
        title: "الإطلاق والنمو",
        body: "النشر والتحليلات وفيلم يعلن عن الإطلاق. وأبقى معك للإصلاحات والميزة التالية.",
      },
    ],
  },
  about: {
    title: "شخص واحد، والإطلاق كاملًا",
    body: [
      "أنا محمود سعد، مطور Full-Stack من مصر. سلّمت لوحات تحكم لوكالات، ومكاتب خدمة عملاء على واتساب، ومتاجر إلكترونية، ومنصات حجز، وتطبيقات موبايل لعملاء في مصر والسعودية والخليج.",
      "تتعامل معي مباشرة: من التصميم في Figma، إلى Next.js وReact Native في الإنتاج، إلى أتمتة واتساب والذكاء الاصطناعي، وحتى الفيلم الذي يطلق المنتج. كل منتج جاهز بالعربية والإنجليزية من أول يوم، بدعم كامل للكتابة من اليمين لليسار. وأعلّم أيضًا ما تعلمته عن البناء السريع بالذكاء الاصطناعي.",
    ],
    stackLabel: "المهارات التقنية لمحمود سعد",
    cta: "اعمل معي",
  },
  faq: {
    title: "أسئلة يطرحها العملاء أولًا",
  },
  contact: {
    title: "عندك مشروع؟ لنطلقه معًا.",
    lead: "أخبرني بما تبنيه وأين تتعثر، وسأرد عليك بخطوات تالية واضحة وصريحة.",
    email: "البريد الإلكتروني",
    whatsapp: "واتساب",
    linkedin: "لينكدإن",
    github: "GitHub",
    footer: "محمود سعد، مطور مواقع وتطبيقات موبايل مستقل",
    langLink: { href: "/", hrefLang: "en", label: "English" },
  },
  voiceNoteLabels: {
    eyebrow: "رسائل حقيقية من العملاء",
    heading: "العملاء يتكلمون.",
    headingEm: "اضغط تشغيل واسمع.",
    chatTitle: "بعد الإطلاق",
    chatMeta: "ردود فعل حقيقية، منشورة بإذن أصحابها",
    today: "أحدث الرسائل",
    imageLabel: "رسالة عميل",
    viewImage: "عرض بالحجم الكامل",
    close: "إغلاق",
    play: "تشغيل الرسالة الصوتية",
    pause: "إيقاف الرسالة الصوتية",
    loadMore: "عرض رسائل أكثر",
    inputHint: "اكتب رسالة…",
    sendLabel: "إرسال الرسالة",
    footer: "رسالتك تفضل داخل التجربة دي ومش بتتبعت لأي مكان.",
    now: "الآن",
  },
  contactLabels: {
    heading: "احجز مكالمة سريعة",
    subheading: "اكتب رقمك واختر الوقت، وأنا أتصل بك. بهذه البساطة.",
    phone: "رقم هاتفك (واتساب)",
    dayLabel: "أي يوم؟",
    timeLabel: "أي وقت؟",
    send: "احجز المكالمة",
    sending: "جارٍ الحجز...",
    success: "تم! سأتصل بك في الوقت الذي اخترته.",
    error: "تعذّر حجز المكالمة. حاول مرة أخرى.",
    today: "اليوم",
    tomorrow: "غدًا",
    locale: "ar",
    dateLocale: "ar-EG",
  },
  projects: withMedia([
    {
      id: "skylight",
      title: "سكاي لايت — مركز قيادة الوكالة",
      alt: "لوحة تحكم عربية لإدارة وكالة تسويق سعودية — برمجة محمود سعد",
      description:
        "نظام تشغيل عربي بالكامل لوكالة تسويق سعودية: تسليم المبيعات، العملاء، المشاريع، مهام تُنشأ تلقائيًا، مؤشرات الالتزام ورضا العملاء، ومساعد ذكي داخل النظام. حلّ محل نظام أودو مخصص.",
    },
    {
      id: "kiara",
      title: "كيارا شات",
      alt: "نظام خدمة عملاء عبر واتساب لمركز تجميل — تطوير محمود سعد",
      description:
        "مكتب خدمة عملاء على واتساب بعلامة خاصة لمركز سبا: محادثات لحظية، توزيع على الموظفين، حجوزات اليوم وتقارير عبء العمل في لوحة عربية واحدة.",
    },
    {
      id: "multigates",
      title: "مالتي جيتس",
      alt: "موقع شركة صناعية ثنائي اللغة مع كتالوج منتجات — برمجة محمود سعد",
      description:
        "موقع شركة ثنائي اللغة لموزّع بيرنجات في مصر، مع كتالوج منتجات قابل للبحث والعلامات والقطاعات الصناعية، ويُدار بالكامل من Supabase.",
    },
    {
      id: "nehgz",
      title: "نحجز",
      alt: "بوت واتساب بالذكاء الاصطناعي لإدارة الحجوزات — برمجة محمود سعد",
      description:
        "مكتب واتساب بالذكاء الاصطناعي يربط واتساب النشاط بنظام الحجز. يرد على العملاء ويدير المواعيد على مدار الساعة من تطبيق واحد.",
    },
    {
      id: "tres",
      title: "تريس",
      alt: "موقع طلبات لمحمصة قهوة مختصة في الطائف — تطوير محمود سعد",
      description:
        "موقع هوية وطلبات لمحمصة قهوة مختصة في الطائف، يجمع السرد المرسوم مع قائمة ثنائية اللغة بدعم كامل للعربية.",
    },
    {
      id: "postaty",
      title: "بوستاتي",
      alt: "منصة توليد منشورات سوشيال ميديا بالذكاء الاصطناعي",
      description:
        "مولّد منشورات بالذكاء الاصطناعي يحوّل المنتج والعرض إلى تصاميم جاهزة للنشر في ثوانٍ.",
    },
    {
      id: "wasit",
      title: "وسيط الآن",
      alt: "تطبيق موبايل ومنصة خدمات عامة — برمجة تطبيقات React Native",
      description:
        "تطبيق موبايل ومنصة ويب للتنازل والتعقيب والخدمات العامة، بكود مشترك بين الويب والموبايل.",
    },
    {
      id: "augen",
      title: "أوجن",
      alt: "متجر إلكتروني لنظارات فاخرة مع لوحة تحكم كاملة",
      description:
        "متجر نظارات فاخرة مع لوحة تحكم كاملة لإدارة الطلبات والمخزون وبيانات العملاء.",
    },
    {
      id: "tabel",
      title: "تتبيلة وتوابل",
      alt: "متجر إلكتروني للتوابل مع بوابة دفع Paymob",
      description:
        "متجر توابل للجملة والتجزئة (B2B وB2C) مع بوابة دفع Paymob متكاملة.",
    },
    {
      id: "abreez",
      title: "مجموعة أبريز",
      alt: "موقع تعريفي لشركة منتجات صديقة للبيئة",
      description:
        "واجهة عرض لشركة تغليف صديق للبيئة، بكتالوج نظيف يساعد المشتري على الوصول للمنتج بسرعة.",
    },
    {
      id: "cohr",
      title: "منشئ السيرة الذاتية",
      alt: "أداة إنشاء سيرة ذاتية وتحميلها PDF",
      description:
        "أداة لإنشاء السيرة الذاتية وتحميلها، مع تسجيل دخول Google وتوليد PDF عبر دوال Serverless.",
    },
    {
      id: "halaqr",
      title: "صفحة هبوط هلا QR",
      alt: "صفحة هبوط لتطبيق تصميم ومشاركة الدعوات عبر واتساب",
      description:
        "صفحة هبوط لتطبيق يصمم الدعوات ويشاركها عبر واتساب.",
    },
    {
      id: "haladesign",
      title: "تصميم تطبيق الدعوات",
      alt: "تصميم واجهات وتجربة استخدام لتطبيق دعوات في Figma",
      description:
        "تصميم Figma لتطبيق صناعة الدعوات، بمسارات استخدام قصيرة وواضحة.",
    },
    {
      id: "sewedy",
      title: "السويدي للأتمتة",
      alt: "موقع شركة صناعية مع إدارة خوادم كاملة",
      description:
        "موقع شركة بتقنية Next.js SSG، مع خوادم بريد وسحابة على VPS بنظام Ubuntu وNginx وPM2.",
    },
  ]),
};

export const HOME_CONTENT = { en, ar };
