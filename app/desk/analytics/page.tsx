'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ChevronLeft, TrendingUp, Users, Eye, MessageSquare, Download } from 'lucide-react'

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [timeRange, setTimeRange] = useState('week')

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

  const stats = {
    week: {
      views: 54200,
      users: 12400,
      comments: 1250,
      shares: 3420,
      avgSessionTime: '4:23',
      bounceRate: '32%',
    },
    month: {
      views: 234500,
      users: 52300,
      comments: 5620,
      shares: 15480,
      avgSessionTime: '4:15',
      bounceRate: '35%',
    },
    year: {
      views: 2845600,
      users: 542100,
      comments: 63450,
      shares: 184320,
      avgSessionTime: '4:12',
      bounceRate: '38%',
    }
  }

  const currentStats = stats[timeRange as keyof typeof stats]

  const topArticles = [
    { title: 'Civic Body Launches Monsoon Preparedness', views: 8450, shares: 234, comments: 89 },
    { title: 'New Engineering College Gets NBA Accreditation', views: 7230, shares: 189, comments: 67 },
    { title: 'Local Sports Team Wins Championship', views: 6890, shares: 156, comments: 54 },
    { title: 'Weekend Weather Updates', views: 5120, shares: 98, comments: 32 },
    { title: 'Political Rally Draws Thousands', views: 4560, shares: 145, comments: 78 },
  ]

  const categoryStats = [
    { name: 'Breaking', articles: 42, views: 45230, trend: '+12%' },
    { name: 'Politics', articles: 28, views: 32150, trend: '+8%' },
    { name: 'Sports', articles: 56, views: 28900, trend: '+5%' },
    { name: 'Education', articles: 31, views: 18450, trend: '+3%' },
    { name: 'Weather', articles: 19, views: 15680, trend: '+2%' },
  ]

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
                <h1 className="text-3xl font-black">Analytics Dashboard</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">View site performance and engagement metrics</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition font-medium">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Time Range Selector */}
        <div className="flex gap-2 mb-8">
          {(['week', 'month', 'year'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
              }`}
            >
              {range === 'week' ? 'Last 7 Days' : range === 'month' ? 'Last 30 Days' : 'Last Year'}
            </button>
          ))}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Views</p>
                <p className="text-3xl font-black">{currentStats.views.toLocaleString()}</p>
              </div>
              <Eye size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">+12% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Unique Users</p>
                <p className="text-3xl font-black">{currentStats.users.toLocaleString()}</p>
              </div>
              <Users size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">+8% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Comments</p>
                <p className="text-3xl font-black">{currentStats.comments.toLocaleString()}</p>
              </div>
              <MessageSquare size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">+5% from previous period</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Shares</p>
                <p className="text-3xl font-black">{currentStats.shares.toLocaleString()}</p>
              </div>
              <TrendingUp size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">+3% from previous period</p>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Session Metrics */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-black mb-4">Session Metrics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Average Session Time</span>
                <span className="font-bold text-lg">{currentStats.avgSessionTime}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Bounce Rate</span>
                <span className="font-bold text-lg">{currentStats.bounceRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Pages Per Session</span>
                <span className="font-bold text-lg">3.2</span>
              </div>
            </div>
          </div>

          {/* Engagement Rate */}
          <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
            <h2 className="text-lg font-black mb-4">Engagement Rate</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Comments Rate</span>
                  <span className="text-sm font-bold">2.3%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{width: '2.3%'}} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Share Rate</span>
                  <span className="text-sm font-bold">6.3%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{width: '6.3%'}} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Return Visitor Rate</span>
                  <span className="text-sm font-bold">42%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '42%'}} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Articles */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 mb-8">
          <h2 className="text-lg font-black mb-4">Top Articles</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Article Title</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Views</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Shares</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Comments</th>
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <td className="px-4 py-3 text-sm">{article.title}</td>
                    <td className="px-4 py-3 text-sm font-bold">{article.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">{article.shares}</td>
                    <td className="px-4 py-3 text-sm">{article.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6">
          <h2 className="text-lg font-black mb-4">Category Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Articles</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Views</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-slate-900 dark:text-white">Growth</th>
                </tr>
              </thead>
              <tbody>
                {categoryStats.map((category, idx) => (
                  <tr key={idx} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                    <td className="px-4 py-3 text-sm font-bold">{category.name}</td>
                    <td className="px-4 py-3 text-sm">{category.articles}</td>
                    <td className="px-4 py-3 text-sm">{category.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="text-green-600 dark:text-green-400 font-bold">{category.trend}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
