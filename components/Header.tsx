'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const CATEGORIES = [
  { name: 'Breaking News', slug: 'breaking-news' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Crime', slug: 'crime' },
  { name: 'Education', slug: 'education' },
  { name: 'Weather', slug: 'weather' },
  { name: 'Sports', slug: 'sports' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Image
              src="/logo/livepalakkad-icon.png"
              alt="LivePalakkad"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-black text-slate-900 dark:text-white">LivePalakkad</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Palakkad First</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {CATEGORIES.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link href="/desk" className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 border-t border-slate-200 dark:border-slate-800">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-2 px-4 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
