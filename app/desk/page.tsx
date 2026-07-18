'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BarChart3, FileText, MessageSquare, Eye, TrendingUp, Users, LogOut, Activity, AlertCircle, CheckCircle, Clock, Phone, Mail } from 'lucide-react'

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
  { label: 'Categories', href: '/desk/categories', icon: FileText },
  { label: 'Comments', href: '/desk/comments', icon: MessageSquare },
  { label: 'Users & Roles', href: '/desk/users', icon: Users },
  { label: 'Analytics', href: '/desk/analytics', icon: TrendingUp },
  { label: 'Settings', href: '/desk/settings', icon: TrendingUp },
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
          {STATS.map((stat, idx) => {
            const Icon = stat.icon
            const colors = [
              'from-blue-500 to-blue-600',
              'from-purple-500 to-purple-600',
              'from-pink-500 to-pink-600',
              'from-green-500 to-green-600',
            ]
            return (
              <div key={stat.label} className="group overflow-hidden">
                <div className={`bg-gradient-to-br ${colors[idx]} rounded-lg p-6 text-white shadow-lg hover:shadow-xl transition relative overflow-hidden`}>
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition" />
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm font-medium opacity-90">{stat.label}</p>
                        <p className="text-4xl font-black mt-2">{stat.value}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-lg backdrop-blur">
                        <Icon size={24} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-medium opacity-90">
                      <TrendingUp size={14} />
                      {stat.trend}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Traffic Chart Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-4">Traffic Overview (Last 7 Days)</h2>
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <div className="space-y-4">
              {/* Traffic bars */}
              <div className="space-y-3">
                {[
                  { day: 'Monday', views: 4200, percentage: 70 },
                  { day: 'Tuesday', views: 5100, percentage: 85 },
                  { day: 'Wednesday', views: 6800, percentage: 100 },
                  { day: 'Thursday', views: 5500, percentage: 81 },
                  { day: 'Friday', views: 6200, percentage: 91 },
                  { day: 'Saturday', views: 4900, percentage: 72 },
                  { day: 'Sunday', views: 3800, percentage: 56 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-20 text-sm font-medium text-slate-600 dark:text-slate-400">{item.day}</div>
                    <div className="flex-1 relative h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-end pr-3"
                        style={{ width: `${item.percentage}%` }}
                      >
                        <span className="text-xs font-bold text-white">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-16 text-right text-sm font-bold text-slate-900 dark:text-white">{item.views.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Activity Feed */}
            <div>
              <h2 className="text-2xl font-black mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[
                  { type: 'published', title: 'Article published: Monsoon Preparedness', time: '2 hours ago', icon: CheckCircle },
                  { type: 'comment', title: 'New comment on Weather Updates', time: '45 minutes ago', icon: MessageSquare },
                  { type: 'user', title: 'New user registered', time: '30 minutes ago', icon: Users },
                  { type: 'pending', title: '3 articles pending review', time: '1 hour ago', icon: AlertCircle },
                  { type: 'activity', title: 'High traffic spike detected', time: '12 minutes ago', icon: Activity },
                ].map((activity, idx) => {
                  const Icon = activity.icon
                  const colors = {
                    published: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                    comment: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                    user: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                    pending: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-600',
                    activity: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
                  }
                  return (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition">
                      <div className={`p-2 rounded-lg ${colors[activity.type]}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{activity.time}</p>
                      </div>
                      <div className="text-xs px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                        {activity.type}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

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

            {/* Top Articles */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black">Top Articles (24h)</h2>
                <Link href="/desk/articles" className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium">View All →</Link>
              </div>
              <div className="space-y-3">
                {RECENT_ARTICLES.map((article, idx) => (
                  <div key={idx} className="p-4 bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900/50 dark:to-transparent rounded-lg border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition group cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-xs font-black px-2 py-0.5 rounded-full ${article.status === 'published' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                            {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                          </span>
                          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                            <Clock size={12} />
                            {article.time}
                          </p>
                        </div>
                        <p className="font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{article.title}</p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="font-black text-xl text-slate-900 dark:text-white">{article.views.toLocaleString()}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 justify-end">
                          <Eye size={12} />
                          views
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div>
              <h2 className="text-2xl font-black mb-4">Dashboard Stats</h2>
              <div className="space-y-3">
                {[
                  { label: 'Pending Reviews', value: '5', color: 'from-orange-500 to-orange-600' },
                  { label: 'Scheduled Posts', value: '3', color: 'from-cyan-500 to-cyan-600' },
                  { label: 'Flagged Comments', value: '2', color: 'from-red-500 to-red-600' },
                ].map((item, idx) => (
                  <div key={idx} className={`bg-gradient-to-r ${item.color} rounded-lg p-4 text-white`}>
                    <p className="text-sm font-medium opacity-90">{item.label}</p>
                    <p className="text-3xl font-black">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Menu */}
            <div>
              <h3 className="text-lg font-black mb-3 text-slate-900 dark:text-white">Navigation</h3>
              <div className="space-y-2">
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-md hover:border-blue-500 dark:hover:border-blue-500 transition group"
                    >
                      <Icon size={18} className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition" />
                      <span className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{item.label}</span>
                      <div className="ml-auto w-1.5 h-1.5 bg-blue-600 rounded-full opacity-0 group-hover:opacity-100 transition" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Support Box */}
            <div className="p-5 bg-gradient-to-br from-blue-50 via-blue-50 to-indigo-50 dark:from-blue-900/20 dark:via-blue-900/10 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start gap-3 mb-3">
                <div className="p-2 bg-blue-200 dark:bg-blue-900 rounded-lg">
                  <Activity size={18} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">System Status</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">All systems operational</p>
                </div>
              </div>
              <div className="text-sm space-y-1 border-t border-blue-200 dark:border-blue-800 pt-3 mt-3">
                <p className="font-medium text-slate-700 dark:text-slate-300">Need support?</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Phone size={12} /> +91 491 2500000
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                  <Mail size={12} /> news@livepalakkad.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
