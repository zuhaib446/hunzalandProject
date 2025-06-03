import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.hunzaland.com'
  
  const routes = [
    '',
    '/hunza',
    '/gilgit',
    '/naltar',
    '/sost-dry-port',
    '/attabad-lake',
    '/rent-a-car',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return routes
}