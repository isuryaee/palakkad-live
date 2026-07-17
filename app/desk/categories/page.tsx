'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ChevronLeft, Layers } from 'lucide-react'

const MOCK_CATEGORIES = [
  { id: 1, name: 'Breaking', slug: 'breaking-news', color: 'red', articles: 42, description: 'Breaking news and urgent updates' },
  { id: 2, name: 'Politics', slug: 'politics', color: 'blue', articles: 28, description: 'Political news and elections' },
  { id: 3, name: 'Crime', slug: 'crime', color: 'orange', articles: 35, description: 'Crime and law enforcement' },
  { id: 4, name: 'Weather', slug: 'weather', color: 'cyan', articles: 19, description: 'Weather forecasts and updates' },
  { id: 5, name: 'Sports', slug: 'sports', color: 'green', articles: 56, description: 'Sports news and events' },
  { id: 6, name: 'Education', slug: 'education', color: 'purple', articles: 31, description: 'Education and academics' },
]

const COLORS = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'cyan', 'indigo', 'lime']

export default function CategoriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', slug: '', color: 'blue', description: '' })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading' || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  const handleAdd = () => {
    if (formData.name && formData.slug) {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id), 0) + 1,
        ...formData,
        articles: 0
      }
      setCategories([...categories, newCategory])
      setFormData({ name: '', slug: '', color: 'blue', description: '' })
      setShowForm(false)
    }
  }

  const handleDelete = (id: number) => {
    setCategories(categories.filter(c => c.id !== id))
    setDeleteId(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/desk" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition">
                <ChevronLeft size={24} />
              </Link>
              <div>
                <h1 className="text-3xl font-black">Categories Management</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Create and manage article categories</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus size={18} />
              New Category
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <h2 className="text-lg font-black mb-4">Add New Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Category name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="URL slug"
                value={formData.slug}
                onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.color}
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COLORS.map(color => (
                  <option key={color} value={color}>{color.charAt(0).toUpperCase() + color.slice(1)}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Category
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 bg-${category.color}-100 dark:bg-${category.color}-900 rounded-lg flex items-center justify-center`}>
                  <Layers size={24} className={`text-${category.color}-600 dark:text-${category.color}-400`} />
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition text-blue-600 dark:text-blue-400">
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => setDeleteId(category.id)}
                    className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition text-red-600 dark:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-black text-lg mb-1">{category.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{category.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Slug: <span className="font-mono">{category.slug}</span></span>
                <span className="font-bold">{category.articles} articles</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 max-w-sm mx-4">
            <h3 className="text-xl font-black mb-4">Delete Category?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              This category will be deleted. Articles in this category will need to be reassigned.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
