'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { TrendingUp, Calendar, MapPin } from 'lucide-react'

// Mock data - will be replaced with real data from API
const MOCK_ARTICLES = [
  {
    id: 1,
    slug: 'civic-body-launches-monsoon-preparedness',
    title: 'Civic Body Launches Monsoon Preparedness Drive in Palakkad',
    excerpt: 'The municipal corporation has initiated comprehensive measures to ensure drainage maintenance and preparedness ahead of the peak monsoon season.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isBreaking: false,
  },
  {
    id: 2,
    slug: 'new-engineering-college-gets-nba-accreditation',
    title: 'New Engineering College in Mannarkkad Gets NBA Accreditation',
    excerpt: 'The institution becomes the second in the district to achieve accreditation from the National Board of Accreditation.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdfa056f496d?w=600&h=400&fit=crop',
    category: 'Education',
    categorySlug: 'education',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    isBreaking: false,
  },
  {
    id: 3,
    slug: 'collector-directs-swift-action-on-pothole-repairs',
    title: 'Collector Directs Swift Action on Pothole Repairs',
    excerpt: 'Following complaints from residents, the district collector has ordered immediate inspection and repair of damaged roads across Palakkad.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695c952952?w=600&h=400&fit=crop',
    category: 'Politics',
    categorySlug: 'politics',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isBreaking: false,
  },
  {
    id: 4,
    slug: 'local-artist-wins-national-award',
    title: 'Local Artist Wins National Award for Contemporary Sculpture',
    excerpt: 'A Palakkad-based sculptor has been recognized at the National Art Exhibition for innovative use of traditional materials.',
    image: 'https://images.unsplash.com/photo-1578301978162-7eae4d755744?w=600&h=400&fit=crop',
    category: 'Entertainment',
    categorySlug: 'entertainment',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
    isBreaking: false,
  },
]

const CATEGORIES = [
  { name: 'Breaking News', slug: 'breaking-news', icon: '🔴' },
  { name: 'Politics', slug: 'politics', icon: '🏛' },
  { name: 'Crime', slug: 'crime', icon: '🚔' },
  { name: 'Education', slug: 'education', icon: '🎓' },
  { name: 'Weather', slug: 'weather', icon: '🌧' },
  { name: 'Sports', slug: 'sports', icon: '⚽' },
  { name: 'Business', slug: 'business', icon: '💼' },
  { name: 'Entertainment', slug: 'entertainment', icon: '🎭' },
]

const LOCATIONS = [
  { name: 'Palakkad Town', slug: 'palakkad-town' },
  { name: 'Ottapalam', slug: 'ottapalam' },
  { name: 'Mannarkkad', slug: 'mannarkkad' },
  { name: 'Chittur', slug: 'chittur' },
]

export default function HomePage() {
  const [heroArticle] = useState(MOCK_ARTICLES[0])
  const [latestArticles] = useState(MOCK_ARTICLES.slice(1))

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="mb-12">
          <Link href={`/articles/${heroArticle.slug}`}>
            <article className="group relative rounded-xl overflow-hidden bg-slate-900 h-96 md:h-[500px]">
              <Image
                src={heroArticle.image}
                alt={heroArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-red-600 text-xs font-bold rounded">FEATURED</span>
                  <span className="text-sm font-medium text-slate-300">{heroArticle.category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black leading-tight mb-2 text-balance">{heroArticle.title}</h2>
                <p className="text-sm text-slate-300">{new Date(heroArticle.publishedAt).toLocaleDateString()}</p>
              </div>
            </article>
          </Link>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <Calendar size={24} /> Latest News
            </h2>
            <div className="space-y-4">
              {latestArticles.map((article) => (
                <ArticleCard
                  key={article.id}
                  {...article}
                  layout="horizontal"
                />
              ))}
            </div>
            <Link
              href="/latest"
              className="block text-center py-3 px-6 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              View All Articles
            </Link>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-lg font-black mb-4">Categories</h3>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="p-3 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm font-medium text-center"
                  >
                    <span className="block mb-1">{cat.icon}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div>
              <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                <MapPin size={20} /> Locations
              </h3>
              <div className="space-y-2">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/location/${loc.slug}`}
                    className="block p-3 bg-slate-100 dark:bg-slate-800 rounded hover:bg-slate-200 dark:hover:bg-slate-700 transition text-sm font-medium"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
              <Link
                href="/locations"
                className="block mt-3 text-center py-2 px-4 bg-slate-200 dark:bg-slate-800 rounded text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-700 transition"
              >
                View All Locations
              </Link>
            </div>

            {/* Newsletter */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-6 rounded-lg">
              <h3 className="font-black mb-2">Get Breaking News</h3>
              <p className="text-sm text-blue-100 mb-4">Subscribe to our newsletter for the latest updates from Palakkad.</p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 rounded bg-white/20 text-white placeholder-blue-200 text-sm"
                />
                <button
                  type="submit"
                  className="w-full px-3 py-2 bg-white text-blue-600 font-bold rounded hover:bg-blue-50 transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
