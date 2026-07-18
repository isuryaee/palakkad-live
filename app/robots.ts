import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/desk', '/api/'],
    },
    sitemap: 'https://livepalakkad.com/sitemap.xml',
  }
}
