'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearched(true)
    
    // Mock search results
    const mockResults = [
      {
        slug: 'search-1',
        title: `Search results for "${query}"`,
        excerpt: 'Finding articles matching your query.',
        image: '/images/placeholder-1.jpg',
        category: 'News',
        categorySlug: 'news',
        publishedAt: '1 hour ago',
        isBreaking: false,
      },
    ]
    
    if (query.length > 0) {
      setResults(mockResults)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:pb-0 pb-20">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Search News</h1>
          
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles, topics, people..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full px-6 py-4 pl-14 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            </div>
            <button
              type="submit"
              className="mt-4 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition"
            >
              Search
            </button>
          </form>
        </div>

        {searched && (
          <div>
            {results.length > 0 ? (
              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-400 mb-6">
                  Found {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                {results.map((article) => (
                  <ArticleCard
                    key={article.slug}
                    {...article}
                    layout="horizontal"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">No results found</p>
                <p className="text-sm text-slate-500 dark:text-slate-500">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
