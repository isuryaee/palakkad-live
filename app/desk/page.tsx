'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { BarChart3, FileText, MessageSquare, Eye, TrendingUp, Users, LogOut } from 'lucide-react'

const STATS = [
  { label: 'Total Articles', value: '247', icon: FileText, trend: '+12 this month' },
  { label: 'Total Views', value: '54.2K', icon: Eye, trend: '+8.2% vs last week' },
  { label: 'Comments', value: '1,250', icon: MessageSquare, trend: '+45 pending' },
  { label: 'Active Users', value: '892', icon: Users, trend: '+23 new today' },
]

const RECENT_ARTICLES = [
  { title: 'Civic Body Launches Monsoon Preparedness', views: 1250, time: '2 hours ago', status: 'published' },
  { title: 'New Engineering College Gets NBA Accreditation', views: 890, time: '4 hours ago', status: 'published' },
  { title: 'Draft: Weekend Weather Updates', views: 0, time: '1 hour ago', status: 'draft' },
]

const MENU_ITEMS = [
  { label: 'Articles', href: '/desk/articles', icon: FileText },
  { label: 'Comments', href: '/desk/comments', icon: MessageSquare },
  { label: 'Users & Roles', href: '/desk/users', icon: Users },
  { label: 'Analytics', href: '/desk/analytics', icon: TrendingUp },
]

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black">Admin Dashboard</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Welcome to LivePalakkad Staff Console</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition font-medium"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                    <p className="text-3xl font-black mt-1">{stat.value}</p>
                  </div>
                  <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-xs text-green-600 dark:text-green-400">{stat.trend}</p>
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl font-black mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Link
                  href="/desk/articles/new"
                  className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition text-center"
                >
                  <FileText size={24} className="mx-auto mb-2 text-blue-600" />
                  <p className="font-bold text-sm">New Article</p>
                </Link>
                <Link
                  href="/desk/articles"
                  className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition text-center"
                >
                  <FileText size={24} className="mx-auto mb-2 text-green-600" />
                  <p className="font-bold text-sm">All Articles</p>
                </Link>
                <Link
                  href="/desk/comments"
                  className="p-6 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg transition text-center"
                >
                  <MessageSquare size={24} className="mx-auto mb-2 text-purple-600" />
                  <p className="font-bold text-sm">Comments (45)</p>
                </Link>
              </div>
            </div>

            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black">Top Articles (24h)</h2>
                <Link href="/desk/articles" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">View All →</Link>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800">
                {RECENT_ARTICLES.map((article, idx) => (
                  <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{article.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800">{article.status}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{article.time}</p>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-black text-lg">{article.views.toLocaleString()}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div>
            <h2 className="text-2xl font-black mb-4">Navigation</h2>
            <div className="space-y-2 mb-8">
              {MENU_ITEMS.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition"
                  >
                    <Icon size={20} className="text-blue-600 dark:text-blue-400" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                )
              })}
            </div>

            {/* Help Box */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg border border-blue-200 dark:border-blue-700">
              <h3 className="font-black mb-2">Need Help?</h3>
              <p className="text-sm text-slate-700 dark:text-slate-200 mb-3">Contact support</p>
              <div className="space-y-1 text-sm">
                <p className="font-medium text-slate-700 dark:text-slate-200">📞 90745 00360</p>
                <p className="font-medium text-slate-700 dark:text-slate-200">📧 mailstudiocity@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
