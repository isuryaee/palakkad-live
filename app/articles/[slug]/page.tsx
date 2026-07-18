'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { Share2, MessageCircle, Calendar, MapPin, User, Clock, Eye, Link as LinkIcon } from 'lucide-react'

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
  authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  publishedAt: '2 hours ago',
  updatedAt: '1 hour ago',
  readTime: '5 min read',
  views: 1234,
  content: `
    <p>The Palakkad Municipal Corporation has launched a comprehensive monsoon preparedness drive to ensure the city remains protected during the upcoming heavy rainfall season.</p>
    
    <h2>Key Initiatives</h2>
    <p>The initiative includes regular inspection and maintenance of drainage systems, clearing of clogged storm drains, and repair of damaged road surfaces that could lead to waterlogging.</p>
    
    <h2>Community Involvement</h2>
    <p>Officials have urged residents to keep their drainage areas clean and report any signs of waterlogging or structural damage to the civic body immediately. A dedicated helpline has been set up for emergency reporting.</p>
    
    <p>District Collector has directed all departments to remain on high alert and maintain emergency response teams ready for deployment.</p>
  `,
  tags: ['Monsoon', 'Infrastructure', 'Safety'],
}

const RELATED_ARTICLES = [
  { title: 'Heavy Rains Expected This Week', slug: 'heavy-rains-expected' },
  { title: 'IMD Issues Yellow Alert', slug: 'imd-yellow-alert' },
  { title: 'Disaster Management Committee Meets', slug: 'disaster-management-meets' },
]

export default function ArticlePage() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
      setScrollProgress(progress)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShareWhatsApp = () => {
    const text = `Check out this article: ${ARTICLE.title} - LivePalakkad`
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    window.open(url, '_blank')
  }

  const handleShareTwitter = () => {
    const text = `${ARTICLE.title} - ${window.location.href}`
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    window.open(url, '_blank')
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"
          style={{
            width: `${scrollProgress}%`,
            transition: scrollProgress === 0 ? 'none' : 'width 0.1s ease',
          }}
        />
      </div>
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-12">
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
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8 text-balance text-slate-900 dark:text-white">
            {ARTICLE.title}
          </h1>

          {/* Author and Meta Info */}
          <div className="mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-4">
                <Image
                  src={ARTICLE.authorImage}
                  alt={ARTICLE.author}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{ARTICLE.author}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                    <span>{ARTICLE.publishedAt}</span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} /> {ARTICLE.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye size={12} /> {ARTICLE.views} views
                    </span>
                  </div>
                </div>
              </div>
              <Link href={`/location/${ARTICLE.locationSlug}`} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-xs font-medium rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition flex items-center gap-1">
                <MapPin size={12} />
                {ARTICLE.location}
              </Link>
            </div>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              {ARTICLE.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded"
                >
                  #{tag}
                </span>
              ))}
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
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-xl mb-8 border border-blue-200 dark:border-slate-700 sticky top-20">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white">
                <Share2 size={18} className="text-blue-600" /> Share
              </h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <button
                  onClick={handleShareWhatsApp}
                  className="p-2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold rounded transition flex items-center justify-center gap-1"
                  title="Share on WhatsApp"
                >
                  💬 WhatsApp
                </button>
                <button
                  onClick={handleShareFacebook}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded transition flex items-center justify-center gap-1"
                  title="Share on Facebook"
                >
                  f Facebook
                </button>
                <button
                  onClick={handleShareTwitter}
                  className="p-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded transition flex items-center justify-center gap-1"
                  title="Share on Twitter"
                >
                  𝕏 Twitter
                </button>
                <button
                  onClick={handleCopyLink}
                  className="p-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold rounded transition flex items-center justify-center gap-1"
                  title="Copy link"
                >
                  <LinkIcon size={14} /> Copy
                </button>
              </div>
            </div>

            {/* Related */}
            <div className="sticky top-96">
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Related News</h3>
              <div className="space-y-3">
                {RELATED_ARTICLES.map((article, idx) => (
                  <Link
                    key={article.slug}
                    href={`/articles/${article.slug}`}
                    className="block p-3 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg hover:from-slate-100 hover:to-slate-200 dark:hover:from-slate-800 dark:hover:to-slate-700 transition border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {idx + 1}
                      </div>
                      <p className="text-sm font-medium line-clamp-2 text-slate-900 dark:text-white">{article.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* Comments Section */}
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-slate-900 dark:text-white">
            <MessageCircle size={24} /> Comments ({3})
          </h2>

          {/* New Comment Form */}
          <div className="mb-8 p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Leave a Comment</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
              />
              <textarea
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 resize-none"
              />
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
                Post Comment
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-4">
            {[
              {
                name: 'Rajeesh Kumar',
                time: '2 hours ago',
                comment: 'Great initiative by the municipality! Hope they follow through with proper maintenance.',
                likes: 12,
              },
              {
                name: 'Priya Menon',
                time: '1 hour ago',
                comment: 'This is exactly what Palakkad needs. The drainage system has been problematic for years.',
                likes: 8,
              },
              {
                name: 'Arun Pillai',
                time: '45 minutes ago',
                comment: 'When will the work actually start? We need to see action, not just announcements.',
                likes: 5,
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{item.name}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.time}</span>
                  </div>
                  <button className="text-xs px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    ⋮
                  </button>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">{item.comment}</p>
                <div className="flex items-center gap-4 text-xs">
                  <button className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition flex items-center gap-1 text-slate-600 dark:text-slate-400">
                    👍 {item.likes}
                  </button>
                  <button className="px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-400">
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="px-6 py-2 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition">
              Load More Comments
            </button>
          </div>
        </section>

        {/* Next Article Navigation */}
        <section className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-black mb-8 text-slate-900 dark:text-white">Continue Reading</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/articles/heavy-rains-expected" className="group">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:border-blue-600 dark:hover:border-blue-600 transition">
                <div className="h-40 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-4xl">⛈️</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">Heavy Rains Expected This Week</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">5 min read</p>
                </div>
              </div>
            </Link>
            <Link href="/articles/imd-yellow-alert" className="group">
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden hover:border-blue-600 dark:hover:border-blue-600 transition">
                <div className="h-40 bg-gradient-to-br from-yellow-400 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-4xl">🚨</span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition">IMD Issues Yellow Alert</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">4 min read</p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
