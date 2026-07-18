import HeaderWithSettings from '@/components/HeaderWithSettings'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { MobileBottomNav } from '@/components/MobileBottomNav'

export const metadata = {
  title: 'Latest News - LivePalakkad',
  description: 'Latest breaking news and updates from Palakkad, Kerala',
}

export default function LatestPage() {
  // Mock data - replace with API call
  const articles = [
    {
      slug: 'latest-1',
      title: 'Breaking: New Development in Local Politics',
      excerpt: 'A major political announcement has been made today affecting the region.',
      image: '/images/placeholder-1.jpg',
      category: 'Politics',
      categorySlug: 'politics',
      publishedAt: '2 hours ago',
      isBreaking: true,
    },
    {
      slug: 'latest-2',
      title: 'Weather Alert: Heavy Rainfall Expected',
      excerpt: 'IMD issues warning for potential flooding in low-lying areas.',
      image: '/images/placeholder-2.jpg',
      category: 'Weather',
      categorySlug: 'weather',
      publishedAt: '4 hours ago',
      isBreaking: false,
    },
    {
      slug: 'latest-3',
      title: 'Local School Wins National Award',
      excerpt: 'Educational institution recognized for excellence in academics and sports.',
      image: '/images/placeholder-3.jpg',
      category: 'Education',
      categorySlug: 'education',
      publishedAt: '6 hours ago',
      isBreaking: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <HeaderWithSettings />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:pb-0 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black mb-2">Latest News</h1>
          <p className="text-slate-600 dark:text-slate-400">Most recent updates from Palakkad</p>
        </div>

        <div className="space-y-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              {...article}
              layout="horizontal"
            />
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
