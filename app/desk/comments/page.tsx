'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Check, X, ChevronLeft, MessageSquare, AlertCircle, Eye } from 'lucide-react'

const MOCK_COMMENTS = [
  { id: 1, author: 'John User', email: 'john@example.com', text: 'Great article! Very informative.', article: 'Civic Body Launches Monsoon...', status: 'pending', date: '2 hours ago', replies: 0 },
  { id: 2, author: 'Sarah Reader', email: 'sarah@example.com', text: 'Thanks for the update!', article: 'New Engineering College Gets NBA...', status: 'approved', date: '4 hours ago', replies: 2 },
  { id: 3, author: 'Mike Commenter', email: 'mike@example.com', text: 'This is spam and irrelevant content!!!', article: 'Weekend Weather Updates', status: 'flagged', date: '1 hour ago', replies: 0 },
  { id: 4, author: 'Lisa Fan', email: 'lisa@example.com', text: 'Excellent reporting on this issue', article: 'Civic Body Launches Monsoon...', status: 'approved', date: '6 hours ago', replies: 1 },
  { id: 5, author: 'Anonymous', email: 'anon@example.com', text: 'Please remove this offensive comment', article: 'Local Sports Team Wins...', status: 'pending', date: '3 hours ago', replies: 0 },
]

export default function CommentsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [comments, setComments] = useState(MOCK_COMMENTS)
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'flagged'>('all')
  const [selectedComment, setSelectedComment] = useState<number | null>(null)

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

  const filteredComments = comments.filter(comment => 
    filterStatus === 'all' || comment.status === filterStatus
  )

  const handleApprove = (id: number) => {
    setComments(comments.map(c => c.id === id ? {...c, status: 'approved'} : c))
    setSelectedComment(null)
  }

  const handleReject = (id: number) => {
    setComments(comments.filter(c => c.id !== id))
    setSelectedComment(null)
  }

  const handleFlag = (id: number) => {
    setComments(comments.map(c => c.id === id ? {...c, status: 'flagged'} : c))
    setSelectedComment(null)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300'
      case 'approved': return 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
      case 'flagged': return 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
      default: return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
    }
  }

  const stats = {
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    flagged: comments.filter(c => c.status === 'flagged').length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/desk" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <h1 className="text-3xl font-black">Comments & Moderation</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">Review and approve user comments</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 uppercase font-bold">Pending</p>
            <p className="text-3xl font-black text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 uppercase font-bold">Approved</p>
            <p className="text-3xl font-black text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1 uppercase font-bold">Flagged</p>
            <p className="text-3xl font-black text-red-600">{stats.flagged}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {(['all', 'pending', 'approved', 'flagged'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded font-medium transition ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-blue-500'
              }`}
            >
              {status === 'all' ? 'All Comments' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.length > 0 ? (
            filteredComments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{comment.author}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{comment.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(comment.status)}`}>
                    {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                  </span>
                </div>
                
                <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  <p className="text-slate-900 dark:text-white mb-2">"{comment.text}"</p>
                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <span>On: {comment.article}</span>
                    <span>{comment.date}</span>
                    <span>{comment.replies} replies</span>
                  </div>
                </div>

                {comment.status === 'pending' || comment.status === 'flagged' ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(comment.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm font-medium"
                    >
                      <Check size={16} />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(comment.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm font-medium"
                    >
                      <X size={16} />
                      Reject
                    </button>
                    {comment.status !== 'flagged' && (
                      <button
                        onClick={() => handleFlag(comment.id)}
                        className="flex items-center gap-1 px-3 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition text-sm font-medium"
                      >
                        <AlertCircle size={16} />
                        Flag
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1 px-3 py-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-700 transition text-sm font-medium">
                      <Eye size={16} />
                      View Context
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <MessageSquare size={32} className="mx-auto mb-4 opacity-50 text-slate-400" />
              <p className="text-slate-600 dark:text-slate-400 font-medium">No comments to moderate</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
