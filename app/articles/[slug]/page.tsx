'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Share2, MessageCircle, Calendar, MapPin, User } from 'lucide-react'

// Mock article data - using static strings for dates to prevent hydration mismatch
const ARTICLE = {
  title: 'Civic Body Launches Monsoon Preparedness Drive in Palakkad',
  slug: 'civic-body-launches-monsoon-preparedness',
  image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=1200&h=600&fit=crop',
  category: 'Weather',
  categorySlug: 'weather',
  location: 'Palakkad Town',
  locationSlug: 'palakkad-town',
  author: 'John Reporter',
  publishedAt: '2 hours ago',
  updatedAt: '1 hour ago',
  readTime: '5 min read',
  content: `
    <p>The Palakkad Municipal Corporation has launched a comprehensive monsoon preparedness drive to ensure the city remains protected during the upcoming heavy rainfall season.</p>
    
    <h2>Key Initiatives</h2>
    <p>The initiative includes regular inspection and maintenance of drainage systems, clearing of clogged storm drains, and repair of damaged road surfaces that could lead to waterlogging.</p>
    
    <h2>Community Involvement</h2>
    <p>Officials have urged residents to keep their drainage areas clean and report any signs of waterlogging or structural damage to the civic body immediately. A dedicated helpline has been set up for emergency reporting.</p>
    
    <p>District Collector has directed all departments to remain on high alert and maintain emergency response teams ready for deployment.</p>
  `,
}

const RELATED_ARTICLES = [
  { title: 'Heavy Rains Expected This Week', slug: 'heavy-rains-expected' },
  { title: 'IMD Issues Yellow Alert', slug: 'imd-yellow-alert' },
  { title: 'Disaster Management Committee Meets', slug: 'disaster-management-meets' },
]

export default function ArticlePage() {
  const handleShareWhatsApp = () => {
    const text = `Check out this article: ${ARTICLE.title} - LivePalakkad`
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex gap-2 text-sm text-slate-500 dark:text-slate-400 mb-8">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white">Home</Link>
          <span>/</span>
          <Link href={`/category/${ARTICLE.categorySlug}`} className="hover:text-slate-900 dark:hover:text-white">{ARTICLE.category}</Link>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-medium truncate">{ARTICLE.title.substring(0, 40)}...</span>
        </div>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/category/${ARTICLE.categorySlug}`} className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded hover:bg-blue-700">
              {ARTICLE.category}
            </Link>
            <span className="text-xs text-slate-500 dark:text-slate-400">{ARTICLE.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6 text-balance text-slate-900 dark:text-white">
            {ARTICLE.title}
          </h1>
          <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>{ARTICLE.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{ARTICLE.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <Link href={`/location/${ARTICLE.locationSlug}`} className="hover:text-slate-900 dark:hover:text-white">
                {ARTICLE.location}
              </Link>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="mb-8">
          <Image
            src={ARTICLE.image}
            alt={ARTICLE.title}
            width={800}
            height={400}
            className="w-full h-96 object-cover rounded-lg"
          />
        </figure>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Content */}
          <article className="lg:col-span-2 prose dark:prose-invert max-w-none">
            <div
              className="text-base leading-relaxed text-slate-700 dark:text-slate-300 space-y-4"
              dangerouslySetInnerHTML={{ __html: ARTICLE.content }}
            />
          </article>

          {/* Sidebar */}
          <aside>
            {/* Share */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-lg mb-8 border border-blue-200 dark:border-slate-700">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Share2 size={18} className="text-blue-600" /> Share This Article
              </h3>
              <div className="space-y-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="w-full p-3 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition"
                >
                  Share on WhatsApp
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="w-full p-3 bg-blue-600 text-white text-sm font-bold rounded hover:bg-blue-700 transition"
                >
                  Share on Facebook
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-full p-3 bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-bold rounded hover:bg-slate-400 dark:hover:bg-slate-600 transition"
                >
                  Copy Link
                </button>
              </div>
            </div>

            {/* Related */}
            <div>
              <h3 className="font-bold mb-4">Related News</h3>
              <div className="space-y-3">
                {RELATED_ARTICLES.map((article) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block p-3 bg-slate-100 dark:bg-slate-900 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition"
                  >
                    <p className="text-sm font-medium line-clamp-2 text-slate-900 dark:text-white">{article.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Comments Section */}
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <MessageCircle size={24} /> Comments
          </h2>

          <div className="space-y-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-900 rounded">
              <div className="flex justify-between mb-2">
                <p className="font-bold text-slate-900 dark:text-white">Rajeesh Kumar</p>
                <span className="text-xs text-slate-500 dark:text-slate-400">2 hours ago</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300">Great initiative by the municipality! Hope they follow through with proper maintenance.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
