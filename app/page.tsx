import { AlertCircle, Clock } from 'lucide-react'

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertCircle size={64} className="text-red-500" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4 text-balance">
          Site Offline
        </h1>

        {/* Description */}
        <p className="text-lg md:text-xl text-slate-300 mb-8 text-balance leading-relaxed">
          We&apos;re temporarily offline for maintenance. We&apos;ll be back online shortly with exciting updates for you.
        </p>

        {/* Status Info */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-8 inline-block">
          <div className="flex items-center justify-center gap-2 text-slate-300">
            <Clock size={20} />
            <span className="text-sm font-semibold">Check back soon!</span>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-slate-400 text-sm">
          For updates, follow us on social media
        </p>
      </div>
    </div>
  )
}
