'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserCircle2, ThumbsUp } from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: string;
  likes?: number;
  liked?: boolean;
}

interface CommentsProps {
  articleSlug: string;
  comments?: Comment[];
}

export function Comments({ articleSlug, comments = [] }: CommentsProps) {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [allComments, setAllComments] = useState(comments);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !content) {
      alert('Please provide your name and a comment.');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSubmitted(true);
      setName('');
      setContent('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = (commentId: string) => {
    setAllComments(allComments.map(c => 
      c.id === commentId 
        ? { ...c, liked: !c.liked, likes: (c.likes || 0) + (c.liked ? -1 : 1) }
        : c
    ));
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="font-sans">
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-xl">Comments</h3>
        {comments && (
          <span className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full ml-2">
            {comments.length}
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-10 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/50 p-6 rounded-xl border border-blue-200 dark:border-slate-700 shadow-sm">
        <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Leave a comment
        </h4>
        {submitted && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded-lg text-sm flex items-center gap-2">
            <span className="text-lg">✓</span> Comment submitted and awaiting moderation.
          </div>
        )}
        <div className="space-y-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-200">Your Comment</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts..."
              required
              className="w-full px-4 py-2.5 border border-blue-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
            />
          </div>
        </div>
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg transition">
          {isLoading ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-4">
        {allComments && allComments.length > 0 ? (
          allComments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors">
              <UserCircle2 className="w-10 h-10 text-slate-400 shrink-0 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{comment.authorName}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatTime(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">{comment.content}</p>
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${
                    comment.liked
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <ThumbsUp size={14} className={comment.liked ? 'fill-current' : ''} />
                  Like {comment.likes && comment.likes > 0 && `(${comment.likes})`}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 italic py-12 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800/30">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
