'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, ChevronLeft, Shield, Eye, EyeOff } from 'lucide-react'

const MOCK_USERS = [
  { id: 1, name: 'Admin User', email: 'admin@livepalakkad.com', role: 'Admin', status: 'active', joined: '2026-01-15', articles: 42 },
  { id: 2, name: 'John Reporter', email: 'john@livepalakkad.com', role: 'Editor', status: 'active', joined: '2026-02-20', articles: 28 },
  { id: 3, name: 'Sarah Editor', email: 'sarah@livepalakkad.com', role: 'Editor', status: 'active', joined: '2026-03-10', articles: 35 },
  { id: 4, name: 'Mike Reporter', email: 'mike@livepalakkad.com', role: 'Contributor', status: 'active', joined: '2026-04-05', articles: 12 },
  { id: 5, name: 'Lisa Reporter', email: 'lisa@livepalakkad.com', role: 'Contributor', status: 'inactive', joined: '2026-01-30', articles: 8 },
]

const ROLES = ['Admin', 'Editor', 'Contributor', 'Moderator']

export default function UsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState(MOCK_USERS)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Contributor', password: '' })

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
    if (formData.name && formData.email) {
      const newUser = {
        id: Math.max(...users.map(u => u.id), 0) + 1,
        ...formData,
        status: 'active',
        joined: new Date().toISOString().split('T')[0],
        articles: 0
      }
      setUsers([...users, newUser])
      setFormData({ name: '', email: '', role: 'Contributor', password: '' })
      setShowForm(false)
    }
  }

  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id))
    setDeleteId(null)
  }

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'Admin': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      case 'Editor': return 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
      case 'Moderator': return 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300'
      default: return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
    }
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
                <h1 className="text-3xl font-black">Users & Roles</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">Manage staff and permissions</p>
              </div>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              <Plus size={18} />
              Add User
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Form */}
        {showForm && (
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
            <h2 className="text-lg font-black mb-4">Add New User</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <input
                type="password"
                placeholder="Temporary password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Create User
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

        {/* Users Table */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Name</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Joined</th>
                  <th className="px-6 py-4 text-left text-xs font-black text-slate-900 dark:text-white uppercase">Articles</th>
                  <th className="px-6 py-4 text-right text-xs font-black text-slate-900 dark:text-white uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${getRoleColor(user.role)}`}>
                        <Shield size={14} />
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.status === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.joined}</td>
                    <td className="px-6 py-4 font-bold">{user.articles}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition text-blue-600 dark:text-blue-400">
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteId(user.id)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition text-red-600 dark:text-red-400"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-8 max-w-sm mx-4">
            <h3 className="text-xl font-black mb-4">Delete User?</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              This user account will be permanently deleted. Their articles will remain published.
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
