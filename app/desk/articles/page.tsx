'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit2, Trash2, Eye, EyeOff, Clock, Check } from 'lucide-react'

const MOCK_ARTICLES = [
  {
    id: 1,
    title: 'Civic Body Launches Monsoon Preparedness',
    slug: 'civic-body-launches-monsoon-preparedness',
    status: 'published',
    category: 'Weather',
    author: 'John Reporter',
    publishedAt: '2 hours ago',
    views: 1250,
    isBreaking: false,
  },
  {
    id: 2,
    title: 'New Engineering College Gets NBA Accreditation',
    slug: 'new-engineering-college-nba',
    status: 'published',
    category: 'Education',
    author: 'Sarah Editor',
    publishedAt: '4 hours ago',
    views: 890,
    isBreaking: false,
  },
  {
    id: 3,
    title: 'Draft: Weekend Weather Updates',
    slug: 'draft-weekend-weather',
    status: 'draft',
    category: 'Weather',
    author: 'Mike Reporter',
    publishedAt: '1 hour ago',
    views: 0,
    isBreaking: false,
  },
  {
    id: 4,
    title: 'Scheduled: Collector Press Meet Tomorrow',
    slug: 'scheduled-collector-press',
    status: 'scheduled',
    category: 'Politics',
    author: 'Lisa Reporter',
    publishedAt: 'Tomorrow 10:00 AM',
    views: 0,
    isBreaking: false,
  },
]

const STATUSES = {
  draft: { label: 'Draft', color: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' },
  published: { label: 'Published', color: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' },
}

export default function AdminArticlesPage() {
  const [selectedArticles, setSelectedArticles] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredArticles = filterStatus === 'all' 
    ? MOCK_ARTICLES 
    : MOCK_ARTICLES.filter(a => a.status === filterStatus)

  const toggleSelectArticle = (id: number) => {
    setSelectedArticles(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    setSelectedArticles(prev =>
      prev.length === filteredArticles.length ? [] : filteredArticles.map(a => a.id)
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Admin Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black">Articles</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">Manage all articles and create new ones</p>
          </div>
          <Link
            href="/desk/articles/new"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
          >
            <Plus size={20} /> New Article
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['all', 'draft', 'published', 'scheduled'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded font-medium transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
              }`}
            >
              {status === 'all' ? 'All Articles' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === filteredArticles.length}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold">Title</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Status</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Author</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Published</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map(article => (
                <tr key={article.id} className="border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedArticles.includes(article.id)}
                      onChange={() => toggleSelectArticle(article.id)}
                      className="rounded"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-slate-900 dark:text-white line-clamp-1">{article.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{article.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{article.category}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded ${STATUSES[article.status as keyof typeof STATUSES].color}`}>
                      {STATUSES[article.status as keyof typeof STATUSES].label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{article.author}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{article.publishedAt}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link
                      href={`/desk/articles/${article.id}/edit`}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400 rounded transition"
                    >
                      <Edit2 size={18} />
                    </Link>
                    <a
                      href={`/articles/${article.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-green-100 dark:hover:bg-green-900 text-green-600 dark:text-green-400 rounded transition"
                    >
                      <Eye size={18} />
                    </a>
                    <button className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 rounded transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center gap-2">
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">1</button>
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            2
          </button>
          <button className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
