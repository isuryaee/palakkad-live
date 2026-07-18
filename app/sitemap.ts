import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://livepalakkad.com'

  // Main pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/latest`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ]

  // Category pages
  const categories = [
    'breaking-news',
    'politics',
    'crime',
    'weather',
    'sports',
    'education',
    'health',
    'business',
  ]

  categories.forEach((category) => {
    routes.push({
      url: `${baseUrl}/category/${category}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })
  })

  // Location pages
  const locations = [
    'palakkad-town',
    'ottapalam',
    'mannarkkad',
    'chittur',
  ]

  locations.forEach((location) => {
    routes.push({
      url: `${baseUrl}/location/${location}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    })
  })

  // Sample articles (in production, fetch from database)
  const articles = [
    'civic-body-launches-monsoon-preparedness',
    'new-library-opens-in-palakkad',
    'traffic-improvements-palakkad',
    'monsoon-weather-alert-issued',
    'palakkad-political-update',
  ]

  articles.forEach((article) => {
    routes.push({
      url: `${baseUrl}/articles/${article}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })
  })

  return routes
}
