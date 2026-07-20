'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ChevronRight, Loader } from 'lucide-react'

interface Category {
  id: string
  name: string
  nameMal: string
  slug: string
  description?: string
  descriptionMal?: string
  icon?: string
  _count?: {
    articles: number
  }
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/categories')

      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }

      const data = await response.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">All Categories</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Explore news from all categories and stay updated with the latest happenings in Palakkad.
          </p>
        </div>

        {/* Categories Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">No categories available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:shadow-lg hover:border-blue-400 dark:hover:border-blue-600 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{category.icon || '📰'}</div>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h2 className="text-2xl font-black mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h2>

                {category.nameMal && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">{category.nameMal}</p>
                )}

                {category.description && (
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">{category.description}</p>
                )}

                {category.descriptionMal && (
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {category.descriptionMal}
                  </p>
                )}

                {category._count?.articles && (
                  <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {category._count.articles} articles
                    </span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Explore →
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
