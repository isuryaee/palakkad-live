import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'Trending - LivePalakkad',
  description: 'Most viewed and trending news stories from Palakkad',
}

export default function TrendingPage() {
  // Mock trending data
  const trendingArticles = [
    {
      slug: 'trending-1',
      title: 'Most Popular: Political Development Shakes District',
      excerpt: '45K views - A major political announcement continues to dominate discussions.',
      image: '/images/placeholder-1.jpg',
      category: 'Politics',
      categorySlug: 'politics',
      publishedAt: '6 hours ago',
      isBreaking: true,
      views: 45000,
    },
    {
      slug: 'trending-2',
      title: 'Viral: Local Sports Achievement Gets National Recognition',
      excerpt: '32K views - Young athlete from Palakkad wins prestigious award.',
      image: '/images/placeholder-2.jpg',
      category: 'Sports',
      categorySlug: 'sports',
      publishedAt: '12 hours ago',
      isBreaking: false,
      views: 32000,
    },
    {
      slug: 'trending-3',
      title: 'Hot Topic: Community Initiative Helps Families',
      excerpt: '28K views - Local NGO launches successful aid program.',
      image: '/images/placeholder-3.jpg',
      category: 'Community',
      categorySlug: 'community',
      publishedAt: '1 day ago',
      isBreaking: false,
      views: 28000,
    },
    {
      slug: 'trending-4',
      title: 'Breaking: Traffic Update - Main Highway Reopens',
      excerpt: '22K views - Authorities clear obstruction after hours-long closure.',
      image: '/images/placeholder-4.jpg',
      category: 'Traffic',
      categorySlug: 'traffic',
      publishedAt: '8 hours ago',
      isBreaking: true,
      views: 22000,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:pb-0 pb-20">
        <div className="mb-8 flex items-center gap-3">
          <TrendingUp className="w-8 h-8 text-red-500" />
          <div>
            <h1 className="text-4xl md:text-5xl font-black">Trending Now</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Most popular stories today</p>
          </div>
        </div>

        <div className="space-y-4">
          {trendingArticles.map((article, index) => (
            <div key={article.slug} className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-black">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <ArticleCard
                  {...article}
                  layout="compact"
                />
                {article.views && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    {(article.views / 1000).toFixed(0)}K views
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
