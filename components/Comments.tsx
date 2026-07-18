'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserCircle2 } from 'lucide-react';

interface Comment {
  id: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  articleSlug: string;
  comments?: Comment[];
}

export function Comments({ articleSlug, comments = [] }: CommentsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setEmail('');
      setContent('');
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    } finally {
      setIsLoading(false);
    }
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

      <form onSubmit={handleSubmit} className="mb-10 bg-slate-100 dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="font-bold text-sm mb-4 uppercase tracking-wider text-slate-600 dark:text-slate-300">
          Leave a comment
        </h4>
        {submitted && (
          <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 rounded text-sm">
            ✓ Comment submitted and awaiting moderation.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm"
            />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Your Comment *</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-sm min-h-[100px]"
            required
          />
        </div>
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
          {isLoading ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>

      <div className="space-y-6">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <UserCircle2 className="w-10 h-10 text-slate-400 shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm">{comment.authorName}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">•</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{formatTime(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{comment.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400 italic py-8 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
