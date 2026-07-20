'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ChevronLeft, Layers, AlertCircle, CheckCircle } from 'lucide-react'
import { getCategoryIcon } from '@/lib/icons'

interface Section {
  id: string
  name: string
  nameMal: string
}

interface Category {
  id: string
  name: string
  nameMal: string
  slug: string
  description?: string
  descriptionMal?: string
  icon?: string
  order: number
  sectionId?: string
  section?: Section
  _count?: { articles: number }
}

export default function CategoriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [formData, setFormData] = useState({ name: '', nameMal: '', slug: '', description: '', descriptionMal: '', icon: 'news', sectionId: '' })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchData()
    }
  }, [session])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [categoriesRes, sectionsRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/sections'),
      ])

      if (!categoriesRes.ok || !sectionsRes.ok) throw new Error('Failed to fetch')

      const categoriesData = await categoriesRes.json()
      const sectionsData = await sectionsRes.json()

      setCategories(categoriesData)
      setSections(sectionsData)
      setError('')
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = async () => {
    if (!formData.name || !formData.nameMal || !formData.slug) {
      setError('Please fill in all required fields')
      return
    }

    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error)
      }

      await fetchData()
      setFormData({ name: '', nameMal: '', slug: '', description: '', descriptionMal: '', icon: 'news', sectionId: '' })
      setShowForm(false)
      setSuccess('Category created successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to create category')
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete')

      await fetchData()
      setDeleteId(null)
      setSuccess('Category deleted successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err: any) {
      setError(err.message || 'Failed to delete category')
    }
  }

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
            <div className="flex items-center gap-3">
              <Link
                href="/desk/sections"
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
              >
                Manage Sections
              </Link>
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
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Alerts */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-3">
            <AlertCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <p className="text-green-700 dark:text-green-400">{success}</p>
          </div>
        )}

        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <h2 className="text-lg font-black mb-4">Add New Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Category Name (English)</label>
                <input
                  type="text"
                  placeholder="e.g., Politics"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">വിഭാഗത്തിന്റെ പേര് (Malayalam)</label>
                <input
                  type="text"
                  placeholder="e.g., രാഷ്ട്രീയം"
                  value={formData.nameMal}
                  onChange={(e) => setFormData({ ...formData, nameMal: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">URL Slug</label>
                <input
                  type="text"
                  placeholder="e.g., politics"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Icon (Emoji)</label>
                <input
                  type="text"
                  placeholder="e.g., 🏛️"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  maxLength={2}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Section</label>
                <select
                  value={formData.sectionId}
                  onChange={(e) => setFormData({ ...formData, sectionId: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">No Section</option>
                  {sections.map((section) => (
                    <option key={section.id} value={section.id}>
                      {section.name}
                    </option>
                  ))}
                </select>
              </div>
              <div></div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Description (English)</label>
                <textarea
                  placeholder="Category description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">വിവരണം (Malayalam)</label>
                <textarea
                  placeholder="Category description in Malayalam"
                  value={formData.descriptionMal}
                  onChange={(e) => setFormData({ ...formData, descriptionMal: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Save Category
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-6 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  {(() => {
                    const Icon = getCategoryIcon(category.slug)
                    return <Icon size={28} className="text-blue-600 dark:text-blue-400" />
                  })()}
                  <div className="flex gap-1">
                    <Link
                      href={`/desk/categories/${category.id}/edit`}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition text-blue-600 dark:text-blue-400"
                    >
                      <Edit2 size={16} />
                    </Link>
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Slug:</span>
                    <span className="font-mono text-slate-900 dark:text-white">{category.slug}</span>
                  </div>
                  {category.section && (
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Section:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{category.section.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
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
                onClick={() => deleteId && handleDelete(deleteId)}
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
