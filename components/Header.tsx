'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const SettingsToggle = dynamic(() => import('./SettingsToggle'), {
  ssr: false,
  loading: () => <div className="w-20 h-10" />,
})

const CATEGORIES = [
  { name: 'Breaking', slug: 'breaking-news' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Crime', slug: 'crime' },
  { name: 'Weather', slug: 'weather' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Education', slug: 'education' },
]

export default function Header() {

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950 border-b border-blue-800/30 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <Image
                src="/logo/livepalakkad-icon.png"
                alt="LivePalakkad"
                width={44}
                height={44}
                className="w-11 h-11 group-hover:scale-110 transition"
              />
              <div className="absolute -inset-1 bg-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition -z-10" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-black bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">LivePalakkad</h1>
              <p className="text-xs text-blue-300">Palakkad First</p>
            </div>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-blue-100 hover:bg-white/10 rounded-lg transition"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Suspense fallback={<div className="w-20 h-10" />}>
              <SettingsToggle />
            </Suspense>
            <Link
              href="/desk"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-600 transition shadow-lg hover:shadow-blue-500/50"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="hidden lg:flex items-center gap-6 pb-4 text-sm border-t border-blue-800/20 pt-4">
          <Link href="/latest" className="text-blue-200 hover:text-white font-medium transition">Latest</Link>
          <Link href="/explore" className="text-blue-200 hover:text-white font-medium transition">Explore</Link>
          <Link href="/photos" className="text-blue-200 hover:text-white font-medium transition">Photos</Link>
          <Link href="/videos" className="text-blue-200 hover:text-white font-medium transition">Videos</Link>
          <Link href="/live" className="text-blue-200 hover:text-white font-medium transition flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
          </Link>
        </div>
      </div>
    </header>
  )
}
