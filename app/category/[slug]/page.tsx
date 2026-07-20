'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { ChevronLeft, Loader } from 'lucide-react'

interface Article {
  id: string
  title: string
  titleMal?: string
  slug: string
  excerpt?: string
  excerptMal?: string
  image?: string
  category: {
    id: string
    name: string
    slug: string
  }
  author?: {
    name: string
    image?: string
  }
  createdAt: string
  updatedAt: string
}

interface Category {
  id: string
  name: string
  nameMal: string
  slug: string
  description?: string
  descriptionMal?: string
  icon?: string
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string

  const [articles, setArticles] = useState<Article[]>([])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  useEffect(() => {
    fetchArticles(1)
  }, [slug])

  const fetchArticles = async (pageNum: number) => {
    try {
      const isFirstPage = pageNum === 1
      if (isFirstPage) setLoading(true)
      else setLoadingMore(true)

      const response = await fetch(`/api/articles/category?slug=${slug}&page=${pageNum}`)

      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }

      const data = await response.json()

      if (isFirstPage) {
        setArticles(data.articles)
        setCategory(data.category)
      } else {
        setArticles((prev) => [...prev, ...data.articles])
      }

      setHasMore(data.pagination.hasMore)
      setPage(pageNum)
    } catch (error) {
      console.error('Error fetching articles:', error)
    } finally {
      if (isFirstPage) setLoading(false)
      else setLoadingMore(false)
    }
  }

  const handleLoadMore = () => {
    fetchArticles(page + 1)
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
            <p className="text-slate-600 dark:text-slate-400">Loading articles...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!category) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Category not found</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline mb-4">
            <ChevronLeft size={18} /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black mb-2">
            {category.icon} {category.name}
          </h1>
          {category.nameMal && <p className="text-lg text-slate-600 dark:text-slate-400">{category.nameMal}</p>}
          {category.description && <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">{category.description}</p>}
        </div>

        {/* Articles Grid */}
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No articles found in this category</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold rounded-lg transition flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <Loader size={18} className="animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Articles'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  )
}
