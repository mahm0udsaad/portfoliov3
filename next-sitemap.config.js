/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://mahmoudsaad.site', // Replace with your website URL
    generateRobotsTxt: true, // Generate robots.txt
    changefreq: 'daily', // Frequency of changes
    priority: 0.7, // Default priority
    sitemapSize: 5000, // Maximum entries per sitemap file
    generateIndexSitemap: true, // Generate an index sitemap
  };
  
  module.exports = config;
  