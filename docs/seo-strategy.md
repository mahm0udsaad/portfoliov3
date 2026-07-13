# Mahmoud Saad — SEO Action Plan for Inbound Client Leads

*Produced 2026-07-13 from a multi-agent audit: live-site crawl, 30+ live SERP checks (Arabic + English), brand/name research, and the claude-seo skill methodology. Domain has since been registered: canonical is now `https://www.mahmoudsaad.art`.*

## TL;DR

- **The site was invisible**: Google had indexed zero pages; every SEO signal pointed to the expired `mahmoudsaad.site`. ✅ Fixed: new domain `www.mahmoudsaad.art` live, all metadata/robots/sitemap rebased, vercel.app 301s to it.
- **Skip every head term** (مستقل, "web developer", تصميم موقع الكتروني, "hire nextjs developer"). Win the three verified vacuums instead: **Arabic Next.js**, **WhatsApp bot development (AR+EN)**, and **Egypt geo terms** — SERPs where bare GitHub READMEs and personal blogs already rank page 1.
- **Bilingual site**: root = English, `/ar` = Arabic RTL with full hreflang mesh. ✅ Homepages shipped; service pages + Arabic pricing blog are the next build.
- **Entity fix**: Person JSON-LD with alternateName محمود سعد ✅ shipped. Still to do: fix misspelled LinkedIn slug (`mahm0us-saad`), fill empty GitHub blog field, create Mostaql/Khamsat profiles.

## Keyword targets (verified winnable)

| # | Keyword cluster | Lang | Difficulty | Page |
|---|---|---|---|---|
| 1 | محمود سعد مطور ويب / mahmoud saad web developer | AR+EN | Trivial — AR is a total vacuum | Homepages + Person schema ✅ |
| 2 | freelance web developer egypt / cairo | EN | Low — personal sites already rank page 1 | EN homepage ✅ |
| 3 | برمجة بوت واتساب للشركات | AR | Low — only SaaS blogs rank | `/ar/services/whatsapp-bots` (build next) |
| 4 | whatsapp business api developer for hire | EN | Low-med — no Toptal/Upwork wall | `/services/whatsapp-business-api` (build FIRST) |
| 5 | whatsapp ordering system for restaurants (custom) | EN | Med — SaaS-only SERP, "custom" variant open | productized sub-page |
| 6 | مطور Next.js | AR | Very low — SERP is 100% English docs, zero Arabic freelancers | `/ar/services/nextjs` |
| 7 | nextjs developer egypt | EN | Very low — bare GitHub READMEs rank top-4 | `/services/nextjs-development` + GitHub README |
| 8 | freelance nextjs developer (global) | EN | Med-high, 3-6 mo — solo devs prove it's winnable | same page, long-form + backlinks |
| 9 | مطور React Native مستقل | AR | Low — SERP is raw Mostaql listings | `/ar/services/react-native` |
| 10 | react native developer egypt | EN | Low — only job boards rank | `/services/react-native-development` |
| 11 | تكلفة انشاء موقع الكتروني في مصر 2026 / اسعار تصميم المواقع في السعودية | AR | Med — personal blogs already rank | Arabic blog articles with real EGP/SAR price tables |
| 12 | تصميم موقع تعريفي لشركة (+سعر) | AR | Med | `/ar/services/company-websites` with transparent pricing |
| 13 | برمجة متجر الكتروني مخصص | AR | Low-med | `/ar/services/ecommerce` + "سلة vs متجر مخصص" article |
| 14 | arabic english bilingual / RTL Next.js websites | EN | Low — weak SERP, natural differentiator | `/services/arabic-english-websites` |
| 15 | مبرمج مواقع في مصر | AR | Med, 6-12 mo | `/ar` homepage + hire page |

**Explicitly skipped:** مستقل (navigational for Mostaql.com), "web developer", "programmer", "software engineer", "develop a website", "UI/UX designer" (global head terms — marketplace/job-board walls), مبرمج، تطبيقات موبايل bare terms (wrong intent).

## Site architecture target

```
/                      EN homepage ✅
/ar                    AR homepage (RTL) ✅
/services/whatsapp-business-api  + /ar/services/whatsapp-bots   ← build FIRST (highest-value cluster)
/services/nextjs-development     + /ar/services/nextjs
/services/react-native-development + /ar/services/react-native
/services/arabic-english-websites  (EN only)
/ar/services/ecommerce + /ar/services/company-websites
/work/[slug]           3-4 case studies (WhatsApp bot case study first), EN + AR
/blog + /ar/blog       Arabic pricing/cost articles + EN tutorials (link magnets)
/book                  course page ✅ (add /ar/book later)
/about                 entity page, ProfilePage schema
```

Service-page pattern: one H1, question-form H2s ("كم تكلفة برمجة بوت واتساب؟"), a **~150-word self-contained answer block in the first 30% of the page**, pricing-from table, case study with real numbers, FAQ, contact CTA. 800+ words each. FAQPage schema (AI-citation signal). All JSON-LD server-rendered.

## Technical layer — shipped 2026-07-13 ✅

- Route groups `app/(en)` + `app/(ar)/ar` → real `<html lang>` / `dir="rtl"` per locale; IBM Plex Sans Arabic.
- `metadataBase` → `https://www.mahmoudsaad.art`; name-first titles; canonicals + hreflang mesh (en/ar/x-default, HTML-link method only).
- JSON-LD in `lib/seo.js`: Person (+alternateName محمود سعد, knowsAbout, sameAs) + WebSite + ProfessionalService `@graph` on both homepages; Course on `/book`.
- `app/robots.ts` (disallow /admin, /api) + `app/sitemap.ts`; removed stale next-sitemap pointing to dead domain; admin noindex.
- Self-hosted OG image (was on a dead third-party host — broken WhatsApp/LinkedIn share previews).
- 301 host redirect mahm0udsaad.vercel.app → www.mahmoudsaad.art; security headers.

## Off-site checklist (requires Mahmoud's accounts)

1. **Google Search Console**: verify domain property (DNS TXT), submit sitemap.xml, request indexing for `/`, `/ar`, `/book`. Same for **Bing Webmaster Tools** (import from GSC) — Bing feeds ChatGPT/Copilot.
2. **GitHub** (github.com/mahm0udsaad): fill empty website field with the domain, location Egypt, capitalize name, profile README with "Next.js developer in Egypt" phrasing (bare READMEs rank top-4 for that query), pin best repos.
3. **LinkedIn**: fix misspelled slug `mahm0us-saad` → `mahm0udsaad`; website field = domain. (Then update sameAs in `lib/seo.js`.)
4. **Mostaql + Khamsat**: create/complete profiles as "Mahmoud Saad محمود سعد" with domain linked — highest-authority Arabic pages you can control + direct lead channel. Add to sameAs.
5. **Google Business Profile** (service-area, Cairo, no street address) + **Bing Places** — cheap lever for "مبرمج مواقع في مصر" map packs.
6. Identical name/photo/headline everywhere: "Mahmoud Saad — محمود سعد | Full-Stack Developer | Next.js · React Native".

## Backlinks & GEO (AI search)

- Get listed in developer-portfolio roundup lists (e.g. emmabostian/developer-portfolios).
- 2-3 EN technical tutorials (WhatsApp Cloud API bot build) on the blog, cross-posted to dev.to/Hashnode with canonical → domain.
- YouTube clips mentioning "Mahmoud Saad" (strongest single AI-citation signal); answer r/nextjs + r/smallbusiness questions (Perplexity sources ~47% from Reddit).
- Answer blocks + question H2s + comparison tables on every page; visible dates + real dateModified; quarterly refresh.
- Skip llms.txt (debunked). robots.txt already allows AI crawlers.

## 30/60/90 roadmap

- **Days 1-7**: ✅ code layer shipped. Remaining: deploy, GSC + Bing verification, GitHub/LinkedIn fixes.
- **Days 8-30**: WhatsApp pillar pages EN+AR with case study; Next.js service pages EN+AR; Mostaql/Khamsat/GBP; verify indexing (check google.com.eg with `&gl=eg`).
- **Days 31-60**: React Native pages, e-commerce/company-website AR pages, first 2 Arabic cost articles, /ar/book, YouTube uploads.
- **Days 61-90**: long-form global Next.js page, more Arabic articles, restaurant-ordering productized page, dev.to author pages, review GSC queries and double down.

**Expected wins:** name queries + مطور Next.js + "nextjs developer egypt" within weeks of indexing → WhatsApp cluster + Egypt geo at 1-4 months → pricing articles + مبرمج مواقع في مصر at 6-12 months → global "freelance nextjs developer" after backlinks mature.
