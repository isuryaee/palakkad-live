'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import { ChevronLeft, MapPin } from 'lucide-react'

const LOCATIONS_MAP: Record<string, { name: string; description: string }> = {
  'palakkad-town': { name: 'Palakkad Town', description: 'News from Palakkad city and surrounding areas' },
  'ottapalam': { name: 'Ottapalam', description: 'News from Ottapalam' },
  'mannarkkad': { name: 'Mannarkkad', description: 'News from Mannarkkad' },
  'chittur': { name: 'Chittur', description: 'News from Chittur' },
}

const MOCK_ARTICLES = [
  {
    id: 1,
    slug: 'civic-body-launches-monsoon-preparedness',
    title: 'Civic Body Launches Monsoon Preparedness Drive in Palakkad',
    excerpt: 'The municipal corporation has initiated comprehensive measures to ensure drainage maintenance.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isBreaking: false,
  },
  {
    id: 2,
    slug: 'new-library-opens-in-palakkad',
    title: 'New Public Library Opens in Palakkad Town',
    excerpt: 'State-of-the-art library facility inaugurated with digital reading sections.',
    image: 'https://images.unsplash.com/photo-1507842217343-583f20270319?w=600&h=400&fit=crop',
    category: 'Education',
    categorySlug: 'education',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isBreaking: false,
  },
  {
    id: 3,
    slug: 'traffic-improvements-palakkad',
    title: 'Major Traffic Improvements to Begin Next Month',
    excerpt: 'New traffic management system to be implemented across major intersections.',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=600&h=400&fit=crop',
    category: 'Transport',
    categorySlug: 'transport',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isBreaking: false,
  },
]

export default function LocationPage({ params }: { params: { slug: string } }) {
  const location = LOCATIONS_MAP[params.slug] || LOCATIONS_MAP['palakkad-town']

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ChevronLeft size={18} /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <MapPin size={32} className="text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-black">{location.name}</h1>
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400">{location.description}</p>
        </div>

        {/* Featured Map (placeholder) */}
        <div className="mb-12 bg-slate-200 dark:bg-slate-800 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-2 text-slate-400" />
            <p className="text-slate-500">Google Maps Integration Coming Soon</p>
          </div>
        </div>

        {/* Articles Grid */}
        <h2 className="text-2xl font-black mb-6">Latest News</h2>
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
