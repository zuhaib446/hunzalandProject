/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://hunzarealestate.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/admin/*'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://hunzarealestate.com/server-sitemap.xml',
    ],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
};