import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

const CATEGORIES_MAP: Record<string, { name: string; description: string }> = {
  'breaking-news': { name: 'Breaking News', description: 'Latest breaking news from Palakkad' },
  'politics': { name: 'Politics', description: 'Political news and developments' },
  'crime': { name: 'Crime', description: 'Crime reports and updates' },
  'weather': { name: 'Weather', description: 'Weather forecasts and warnings' },
  'education': { name: 'Education', description: 'Education news and updates' },
  'sports': { name: 'Sports', description: 'Sports news and events' },
}

const MOCK_ARTICLES = [
  {
    id: 1,
    slug: 'heavy-rains-expected-this-week',
    title: 'Heavy Rains Expected This Week in Palakkad',
    excerpt: 'The India Meteorological Department has issued a weather warning for Palakkad district for the coming week.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: '2 hours ago',
    isBreaking: false,
  },
  {
    id: 2,
    slug: 'imd-issues-yellow-alert',
    title: 'IMD Issues Yellow Alert for Palakkad',
    excerpt: 'The meteorological department warns of potential flooding in low-lying areas.',
    image: 'https://images.unsplash.com/photo-1601912348674-6d5a3af0f6a6?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: '4 hours ago',
    isBreaking: false,
  },
  {
    id: 3,
    slug: 'rain-likely-to-decrease',
    title: 'Rain Likely to Decrease by Weekend',
    excerpt: 'Weather forecast shows improvement in atmospheric conditions by the weekend.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: '8 hours ago',
    isBreaking: false,
  },
]

export default async function CategoryPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const category = CATEGORIES_MAP[params.slug] || CATEGORIES_MAP['breaking-news']

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ChevronLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-2">{category.name}</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">{category.description}</p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_ARTICLES.map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>

        {/* Load More */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition">
            Load More Articles
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
