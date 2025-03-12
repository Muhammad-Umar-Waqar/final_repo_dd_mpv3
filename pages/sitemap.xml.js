import { getAllDocuments } from '../lib/mongodb';

const WEBSITE_URL = 'https://dediabetes.com';
const DEFAULT_LOCALE = 'en';

function getLocalePath(locale, path = '') {
  return locale === DEFAULT_LOCALE ? path : `/${locale}${path}`;
}

// Map para convertir locales a códigos ISO
const localeToISO = {
  'en': 'en-US',
  'es': 'es-ES'
};

function generateSiteMap(pages, researchPosts, blogPosts, locales) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${locales.map(locale => `
        <!-- Home page for ${locale} -->
        <url>
          <loc>${WEBSITE_URL}${getLocalePath(locale)}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>1.0</priority>
          <xhtml:link 
            rel="alternate"
            hreflang="x-default"
            href="${WEBSITE_URL}"
          />
          ${locales.map(altLocale => `
            <xhtml:link 
              rel="alternate"
              hreflang="${localeToISO[altLocale]}"
              href="${WEBSITE_URL}${getLocalePath(altLocale)}"
            />`).join('')}
        </url>

        <!-- Articles page for ${locale} -->
        <url>
          <loc>${WEBSITE_URL}${getLocalePath(locale, '/articles')}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.9</priority>
          <xhtml:link 
            rel="alternate"
            hreflang="x-default"
            href="${WEBSITE_URL}/articles"
          />
          ${locales.map(altLocale => `
            <xhtml:link 
              rel="alternate"
              hreflang="${localeToISO[altLocale]}"
              href="${WEBSITE_URL}${getLocalePath(altLocale, '/articles')}"
            />`).join('')}
        </url>
      `).join('')}

      ${pages.map(page => locales.map(locale => `
        <url>
          <loc>${WEBSITE_URL}${getLocalePath(locale, `/${page.uid}`)}</loc>
          <lastmod>${page.last_publication_date || new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
          <xhtml:link 
            rel="alternate"
            hreflang="x-default"
            href="${WEBSITE_URL}/${page.uid}"
          />
          ${locales.map(altLocale => `
            <xhtml:link 
              rel="alternate"
              hreflang="${localeToISO[altLocale]}"
              href="${WEBSITE_URL}${getLocalePath(altLocale, `/${page.uid}`)}"
            />`).join('')}
        </url>
      `).join('')).join('')}

      ${researchPosts.map(post => locales.map(locale => `
        <url>
          <loc>${WEBSITE_URL}${getLocalePath(locale, `/${post.uid}`)}</loc>
          <lastmod>${post.last_publication_date || new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
          <xhtml:link 
            rel="alternate"
            hreflang="x-default"
            href="${WEBSITE_URL}/${post.uid}"
          />
          ${locales.map(altLocale => `
            <xhtml:link 
              rel="alternate"
              hreflang="${localeToISO[altLocale]}"
              href="${WEBSITE_URL}${getLocalePath(altLocale, `/${post.uid}`)}"
            />`).join('')}
        </url>
      `).join('')).join('')}

      ${blogPosts.map(post => locales.map(locale => `
        <url>
          <loc>${WEBSITE_URL}${getLocalePath(locale, `/blog/${post.uid}`)}</loc>
          <lastmod>${post.last_publication_date || new Date().toISOString()}</lastmod>
          <changefreq>monthly</changefreq>
          <priority>0.7</priority>
          <xhtml:link 
            rel="alternate"
            hreflang="x-default"
            href="${WEBSITE_URL}/blog/${post.uid}"
          />
          ${locales.map(altLocale => `
            <xhtml:link 
              rel="alternate"
              hreflang="${localeToISO[altLocale]}"
              href="${WEBSITE_URL}${getLocalePath(altLocale, `/blog/${post.uid}`)}"
            />`).join('')}
        </url>
      `).join('')).join('')}
    </urlset>`;
}

export async function getServerSideProps({ res }) {
  const databaseLocales = {
    'en': 'en-us',
    'es': 'es-es'
  };

  const locales = ['en', 'es'];
  const allPages = {};
  const allResearchPosts = {};
  const allBlogPosts = {};

  // Fetch all documents for each locale
  for (const locale of locales) {
    const dbLocale = databaseLocales[locale];
    
    // Fetch all types of documents
    allPages[locale] = await getAllDocuments('page', dbLocale);
    allResearchPosts[locale] = await getAllDocuments('research', dbLocale);
    allBlogPosts[locale] = await getAllDocuments('blog_post', dbLocale);
  }

  // Combine documents from all locales and remove duplicates by uid
  const pages = [...new Map(
    Object.values(allPages).flat().map(item => [item.uid, item])
  ).values()];
  
  const researchPosts = [...new Map(
    Object.values(allResearchPosts).flat().map(item => [item.uid, item])
  ).values()];
  
  const blogPosts = [...new Map(
    Object.values(allBlogPosts).flat().map(item => [item.uid, item])
  ).values()];

  // Generate sitemap XML
  const sitemap = generateSiteMap(pages, researchPosts, blogPosts, locales);

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  // This component doesn't need to render anything
  return null;
} 