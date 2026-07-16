import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Phone,
  Globe,
  Smartphone,
  MessageSquare,
  ShoppingCart,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import ContactForm from "@/components/contact";
import HeroVideos from "@/components/hero-videos";
import TechBadge, { SkillCard } from "@/components/ui/techBadge";
import { homeGraph, JsonLd } from "@/lib/seo";

const contactLabels = {
  heading: "أرسل رسالة",
  name: "اسمك",
  email: "بريدك الإلكتروني",
  message: "رسالتك",
  send: "إرسال الرسالة",
  sending: "جارٍ الإرسال...",
  success: "تم إرسال رسالتك بنجاح!",
  error: "تعذّر إرسال الرسالة. حاول مرة أخرى.",
  unexpected: "حدث خطأ. حاول مرة أخرى لاحقًا.",
};

export default function HomeArabic() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <JsonLd data={homeGraph("ar")} />

      {/* NAV */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
        <nav className="flex items-center justify-between px-6 md:px-14 py-5">
          <Link href="/ar" className="font-serif text-[22px] tracking-tight">
            محمود سعد<span className="text-primary">.</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-[14.5px] font-medium text-muted-foreground">
            <Link href="#services" className="hover:text-foreground transition-colors">
              الخدمات
            </Link>
            <Link href="#projects" className="hover:text-foreground transition-colors">
              أعمالي
            </Link>
            <Link href="/book" className="text-primary font-semibold hover:text-primary/80 transition-colors">
              الدورة
            </Link>
            <Link href="#about" className="hover:text-foreground transition-colors">
              عنّي
            </Link>
            <Link href="#contact" className="hover:text-foreground transition-colors">
              تواصل معي
            </Link>
            <Link href="/" hrefLang="en" className="hover:text-foreground transition-colors">
              English
            </Link>
            <Link
              href="#contact"
              className="bg-ink text-ink-foreground px-5 py-2.5 rounded-full font-semibold text-sm hover:bg-primary transition-colors"
            >
              ابدأ مشروعك
            </Link>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <Link href="/" hrefLang="en" className="text-sm font-medium text-muted-foreground">
              English
            </Link>
            <Link
              href="#contact"
              className="bg-ink text-ink-foreground px-4 py-2 rounded-full font-semibold text-sm"
            >
              ابدأ مشروعك
            </Link>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-[1000px] px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
          <div className="text-[13px] font-semibold tracking-wide text-primary mb-7">
            مطور Full-Stack مستقل · مصر · عمل عن بُعد لجميع الدول
          </div>

          <h1 className="font-serif font-bold text-[38px] md:text-[58px] leading-[1.25] tracking-tight mb-7">
            محمود سعد — مطور ويب
            <br className="hidden sm:block" /> و<span className="text-primary">تطبيقات موبايل</span> مستقل.
          </h1>

          <p className="text-[17.5px] md:text-lg leading-relaxed text-muted-foreground max-w-[640px] mx-auto mb-10">
            أصمّم وأبرمج مواقع سريعة بتقنية{" "}
            <span className="text-foreground font-medium">Next.js</span>،
            وتطبيقات موبايل بـ{" "}
            <span className="text-foreground font-medium">React Native</span>،
            ومتاجر إلكترونية، وبوتات واتساب للأعمال — لشركات ورواد أعمال في مصر
            والسعودية والخليج والعالم.
          </p>

          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              ابدأ مشروعك
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded-full font-semibold text-base hover:border-ink/40 transition-colors"
            >
              شاهد أعمالي
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px]">
          <div className="text-center mb-12">
            <div className="text-[13px] font-semibold tracking-wide text-primary mb-4">
              الخدمات
            </div>
            <h2 className="font-serif font-bold text-[32px] md:text-[40px] leading-snug tracking-tight">
              ماذا أستطيع أن أبني لك؟
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <div
                key={s.title}
                className="rounded-[18px] border border-border bg-card p-6 hover:shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-full bg-accent text-accent-foreground grid place-items-center mb-5">
                  {s.icon}
                </div>
                <h3 className="font-serif font-semibold text-[19px] leading-snug mb-2.5">
                  {s.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSE */}
      <section className="py-20 px-6 md:px-14 border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[1000px] text-center">
          <div className="text-[13px] font-semibold tracking-wide text-primary mb-6">
            دورة جديدة · الدفعة الأولى — الحجز مفتوح
          </div>
          <h2 className="font-serif font-bold text-[32px] md:text-[44px] leading-snug tracking-tight mb-6">
            اصنع فيديوهات مذهلة بقوة{" "}
            <span className="text-primary">الذكاء الاصطناعي والمونتاج.</span>
          </h2>
          <p className="text-[16.5px] leading-relaxed text-muted-foreground max-w-[560px] mx-auto mb-9">
            دورة عملية مع محمود سعد تتعلم فيها إنتاج ومونتاج فيديوهات احترافية
            بالذكاء الاصطناعي — من الصفر حتى النشر.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center items-center mb-3">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-8 py-4 rounded-full font-semibold text-base hover:bg-primary transition-colors"
            >
              احجز مقعدك
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-5">
            لا تحتاج أي خبرة سابقة · الحجز مجاني — بدون أي دفع الآن
          </p>

          {/* Sample video previews — click to play, loaded on demand from Supabase */}
          <HeroVideos clips={heroClips} />
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 md:px-14 border-t border-border">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-14 gap-5">
            <div>
              <div className="text-[13px] font-semibold tracking-wide text-primary mb-4">
                أعمال مختارة
              </div>
              <h2 className="font-serif font-bold text-[34px] md:text-[42px] leading-snug tracking-tight mb-4">
                مشاريع حقيقية في الإنتاج
              </h2>
              <p className="text-muted-foreground max-w-xl text-[15.5px] leading-relaxed">
                مواقع شركات، متاجر إلكترونية، منصات حجز، تطبيقات موبايل وبوتات
                واتساب — تم تسليمها لعملاء في مصر والسعودية والخليج.
              </p>
            </div>
            <Link
              href="https://github.com/mahm0udsaad"
              target="_blank"
              className="inline-flex items-center gap-2 text-sm font-semibold group whitespace-nowrap hover:text-primary transition-colors"
            >
              كل المشاريع على GitHub
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {projects.map((project) => (
              <Card
                key={project.title}
                className="group flex flex-col overflow-hidden rounded-[18px] border border-border bg-card shadow-none hover:shadow-[0_20px_50px_oklch(0.23_0.01_70_/_0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.alt}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-ink/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                      href={project.deploy}
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-full bg-background text-foreground px-6 py-2.5 font-semibold text-sm shadow hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      زيارة الموقع
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-serif font-semibold text-[20px] leading-snug mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-1 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.slice(0, 4).map((tech) => (
                      <TechBadge key={tech} tech={tech} className="text-xs py-0.5" />
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

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 md:px-14 border-t border-border bg-muted/40">
        <div className="mx-auto max-w-[1180px] grid lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-accent rounded-[22px] rotate-3" />
              <Image
                src="/about.jpg"
                alt="محمود سعد — مطور ويب وتطبيقات موبايل مستقل من مصر"
                fill
                className="rounded-[22px] object-cover shadow-xl relative -rotate-3 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="text-[13px] font-semibold tracking-wide text-primary mb-4">
              عنّي
            </div>
            <h2 className="font-serif font-bold text-[34px] md:text-[42px] leading-snug tracking-tight mb-6">
              مطور، صانع منتجات، <span className="text-primary">ومدرّب.</span>
            </h2>
            <div className="space-y-4 text-[16px] text-muted-foreground leading-relaxed mb-8">
              <p>
                أنا محمود سعد، مبرمج ومطور مواقع مستقل من مصر. سلّمت أكثر من ١٥
                مشروعًا في الإنتاج — مواقع شركات، متاجر إلكترونية، منصات حجز،
                تطبيقات موبايل، وأنظمة أتمتة واتساب — لعملاء في مصر والسعودية
                والخليج.
              </p>
              <p>
                بخبرة عميقة في{" "}
                <span className="text-foreground font-medium">
                  Next.js وReact وReact Native وNode.js
                </span>
                ، أنفّذ المشروع من تصميم واجهة الاستخدام في Figma حتى إطلاق منتج
                سريع وجاهز لمحركات البحث — بما في ذلك المواقع ثنائية اللغة
                (عربي/إنجليزي) بدعم كامل للكتابة من اليمين لليسار. وأشارك خبرتي
                أيضًا في البناء السريع بالذكاء الاصطناعي.
              </p>
            </div>

            <h3 className="text-[13px] font-semibold tracking-wide text-muted-foreground border-b border-border pb-3.5 mb-5">
              المهارات التقنية
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <SkillCard key={skill} skill={skill} />
              ))}
            </div>

            <div className="mt-10">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 bg-ink text-ink-foreground px-7 py-3.5 rounded-full font-semibold text-[15px] hover:bg-primary transition-colors"
              >
                اعمل معي
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="py-24 px-6 md:px-14 bg-ink text-ink-foreground"
      >
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <div className="text-[13px] font-semibold tracking-wide text-primary mb-4">
              تواصل معي
            </div>
            <h2 className="font-serif font-bold text-[36px] md:text-[44px] leading-snug tracking-tight mb-4">
              لنعمل معًا.
            </h2>
            <p className="text-ink-foreground/70 text-lg max-w-xl mx-auto leading-relaxed">
              عندك فكرة موقع أو تطبيق أو مشروع أتمتة — أو سؤال عن الدورة؟ يسعدني
              أن أسمع منك.
            </p>
          </div>

          <div className="bg-card text-card-foreground rounded-[22px] shadow-xl p-6 md:p-10 mb-12">
            <ContactForm labels={contactLabels} />
          </div>

          <div className="flex flex-wrap justify-center gap-3.5">
            <SocialLink
              href="mailto:101mahm0udsaad@gmail.com"
              icon={<Mail className="w-4 h-4" />}
              label="البريد الإلكتروني"
            />
            <SocialLink
              href="https://wa.me/+201157337829"
              icon={<Phone className="w-4 h-4" />}
              label="واتساب"
            />
            <SocialLink
              href="https://www.linkedin.com/in/mahm0udsaad"
              icon={<Linkedin className="w-4 h-4" />}
              label="لينكدإن"
            />
            <SocialLink
              href="https://github.com/mahm0udsaad"
              icon={<Github className="w-4 h-4" />}
              label="GitHub"
            />
          </div>

          <div className="text-center mt-12 text-ink-foreground/50 text-sm">
            © {new Date().getFullYear()} محمود سعد — مطور ويب وتطبيقات موبايل
            مستقل ·{" "}
            <Link href="/" hrefLang="en" className="underline hover:text-ink-foreground">
              English
            </Link>
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
      className="flex items-center gap-2 bg-ink-foreground/10 hover:bg-primary transition-colors px-4 py-2 rounded-full text-sm font-medium"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

// Data
const services = [
  {
    title: "تطوير المواقع",
    icon: <Globe className="w-5 h-5" />,
    description:
      "مواقع وتطبيقات ويب سريعة وجاهزة لمحركات البحث بتقنية Next.js وReact — صفحات هبوط، مواقع شركات، لوحات تحكم ومنصات كاملة.",
  },
  {
    title: "تطبيقات الموبايل",
    icon: <Smartphone className="w-5 h-5" />,
    description:
      "تطبيقات iOS وAndroid بكود واحد باستخدام React Native وExpo، متكاملة مع منصتك على الويب.",
  },
  {
    title: "بوتات واتساب والذكاء الاصطناعي",
    icon: <MessageSquare className="w-5 h-5" />,
    description:
      "بوتات WhatsApp Business API للحجوزات والطلبات وخدمة العملاء — وتكاملات ذكاء اصطناعي تؤتمت شغلك الحقيقي.",
  },
  {
    title: "المتاجر الإلكترونية",
    icon: <ShoppingCart className="w-5 h-5" />,
    description:
      "متاجر إلكترونية مخصصة مع بوابات دفع (Paymob وغيرها)، إدارة مخزون، لوحة تحكم، وواجهات ثنائية اللغة عربي/إنجليزي.",
  },
];

const SUPABASE_VIDEOS = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/course-videos`;
const heroClips = [
  { videoUrl: `${SUPABASE_VIDEOS}/clip1.mp4`, poster: "/videos/clip1.jpg" },
  { videoUrl: `${SUPABASE_VIDEOS}/clip2.mp4`, poster: "/videos/clip2.jpg" },
  { videoUrl: `${SUPABASE_VIDEOS}/clip3.mp4`, poster: "/videos/clip3.jpg" },
];

const projects = [
  {
    title: "Nehgz",
    image: "/projects/nehgzbot/nehgzbot-1.png",
    tech: ["Next.js", "WhatsApp API", "AI", "Bot"],
    alt: "بوت واتساب بالذكاء الاصطناعي لإدارة الحجوزات — برمجة محمود سعد",
    description:
      "منصة واتساب بالذكاء الاصطناعي تربط واتساب الشركات بنظام الحجز — ترد على العملاء تلقائيًا وتدير المواعيد على مدار الساعة من تطبيق واحد.",
    deploy: "https://nehgzbot.com/",
  },
  {
    title: "TRES",
    image: "/projects/tres/tres-1.png",
    tech: ["Next.js", "E‑commerce", "UI/UX"],
    alt: "موقع طلبات لمحمصة قهوة مختصة في الطائف — تطوير محمود سعد",
    description:
      "موقع هوية وطلبات لمحمصة قهوة مختصة في الطائف، يجمع بين السرد البصري وقائمة ثنائية اللغة بدعم كامل للعربية.",
    deploy: "https://tres.com.sa/",
  },
  {
    title: "Postaty",
    image: "/projects/postaty.png",
    tech: ["Next.js", "Supabase", "AI", "Google Nano Banana API"],
    alt: "منصة توليد منشورات سوشيال ميديا بالذكاء الاصطناعي",
    description:
      "مولّد منشورات سوشيال ميديا بالذكاء الاصطناعي يسرّع إنشاء المحتوى ونشره.",
    deploy: "https://www.postaty.com/",
  },
  {
    title: "وسيط الآن",
    image: "/projects/waiseet-alan.png",
    tech: ["Next.js", "Expo", "React Native", "Supabase"],
    alt: "تطبيق موبايل ومنصة خدمات عامة — برمجة تطبيقات React Native",
    description:
      "تطبيق موبايل ومنصة للتنازل والتعقيب والخدمات العامة، بكود مشترك بين الويب والموبايل.",
    deploy: "https://www.wasitalan.com/",
  },
  {
    title: "Augen",
    image: "/projects/augen/augen-1.png",
    tech: ["Next.js", "Admin Dashboard", "Inventory Management", "E-commerce"],
    alt: "متجر إلكتروني لنظارات فاخرة مع لوحة تحكم كاملة",
    description:
      "متجر إلكتروني لنظارات فاخرة مع لوحة تحكم شاملة لإدارة الطلبات والمخزون وبيانات العملاء.",
    deploy: "http://augeneg.com",
  },
  {
    title: "بوت سفرة للمطاعم",
    image: "/projects/sufrah-bot/slide.png",
    tech: ["WhatsApp API", "Bot", "Restaurant Management", "Ordering System"],
    alt: "بوت واتساب لطلبات المطاعم — نظام طلب آلي عبر واتساب",
    description:
      "بوت واتساب لنظام طلبات المطاعم يتيح للعملاء الطلب مباشرة عبر واتساب مع إدارة آلية كاملة للطلبات.",
    deploy: "https://www.sufrah.sa/whatsapp-bot",
  },
  {
    title: "تتبيلة وتوابل",
    image: "/projects/tabel/slide.png",
    tech: ["Next.js", "E-commerce", "B2B", "B2C", "Paymob", "Payment Gateway"],
    alt: "متجر إلكتروني للتوابل مع بوابة دفع Paymob",
    description:
      "منصة تجارة إلكترونية B2B وB2C للتوابل والمنتجات الغذائية مع بوابة دفع Paymob متكاملة.",
    deploy: "https://tatbela-tabel.vercel.app",
  },
  {
    title: "منصة سفرة",
    image: "/projects/sufrah.sa.png",
    tech: ["Next.js", "SSG", "Tailwind CSS"],
    alt: "منصة إنشاء مواقع وتطبيقات مطاعم بدون كود",
    description:
      "منصة ذكية لإنشاء مواقع وتطبيقات المطاعم بسرعة وبدون كود.",
    deploy: "https://www.sufrah.sa/",
  },
  {
    title: "Amstore",
    image: "/projects/amstore.png",
    tech: ["Next.js", "Tailwind CSS", "E‑commerce"],
    alt: "متجر إلكتروني مخصص عالي الأداء — تطوير مواقع مصر",
    description:
      "متجر إلكتروني مخصص بأداء عالٍ وتجربة استخدام عصرية.",
    deploy: "https://amstore-eg.com/",
  },
  {
    title: "OneCard",
    image: "/projects/onecard.png",
    tech: ["Next.js", "Design", "Payments"],
    alt: "صفحة هبوط لخدمات الدفع والتكاملات",
    description:
      "صفحة هبوط أنيقة تعرض خبرات التكاملات وتقدم تجربة موثوقة.",
    deploy: "https://www.onecard.com/",
  },
  {
    title: "موقع مجموعة أبريز",
    image: "/projects/abreez-site.jpg",
    tech: ["Next.js", "SSG", "Framer Motion", "Tailwind CSS"],
    alt: "موقع تعريفي لشركة منتجات صديقة للبيئة",
    description:
      "تصميم واجهة سهلة وجذابة لموقع منتجات صديقة للبيئة، مع عرض المنتجات بتصميم نظيف وعصري.",
    deploy: "https://abreezstock.com/",
  },
  {
    title: "منشئ السيرة الذاتية",
    image: "/projects/cohr.jpg",
    tech: ["Next.js", "SSG", "React-PDF", "PDF Generation"],
    alt: "أداة إنشاء سيرة ذاتية وتحميلها PDF",
    description:
      "أداة ويب لإنشاء السيرة الذاتية ديناميكيًا وتحميلها، مع تسجيل دخول Google ودوال Serverless.",
    deploy: "https://cv.cohr.sa/",
  },
  {
    title: "صفحة هبوط لتطبيق موبايل",
    image: "/projects/halaqr-site.jpg",
    tech: ["React Native", "UI/UX", "WhatsApp API"],
    alt: "صفحة هبوط لتطبيق تصميم ومشاركة الدعوات عبر واتساب",
    description:
      "صفحة هبوط لتطبيق تصميم ومشاركة الدعوات عبر واتساب، بتركيز على تصميم UI/UX وتطوير الواجهة.",
    deploy: "https://hala-qr-site.vercel.app/",
  },
  {
    title: "تصميم UI/UX لتطبيق موبايل",
    image: "/projects/hala-design.jpg",
    tech: ["Figma", "UI/UX", "Prototyping"],
    alt: "تصميم واجهات وتجربة استخدام لتطبيق دعوات في Figma",
    description:
      "تصميم واجهة سهلة وجذابة لتطبيق مصمم دعوات، مع تركيز على مسارات استخدام بديهية.",
    deploy:
      "https://www.figma.com/design/lXpObprsDsVJDQfhbUQO57/Invitation-Designer-UI?node-id=0-1&p=f&t=a9lDdPcGX0te8LUd-0",
  },
  {
    title: "موقع السويدي للأتمتة",
    image: "/projects/sewedy.jpg",
    tech: ["Next.js", "SSG", "DevOps", "Nginx", "PM2"],
    alt: "موقع شركة صناعية مع إدارة خوادم كاملة",
    description:
      "موقع شركة بتقنية Next.js SSG مع نشر خوادم البريد والسحابة وإدارة VPS بنظام Ubuntu وNginx وPM2.",
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
