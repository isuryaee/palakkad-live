'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import SettingsToggle from './SettingsToggle'

const CATEGORIES = [
  { name: 'Breaking', slug: 'breaking-news' },
  { name: 'Politics', slug: 'politics' },
  { name: 'Crime', slug: 'crime' },
  { name: 'Weather', slug: 'weather' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Education', slug: 'education' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50">
      {/* Domain Bar */}
      <div className="bg-blue-600 text-white text-center py-1.5 text-xs sm:text-sm font-bold tracking-wide">
        LIVEPALAKKAD.COM
      </div>
      
      {/* Main Header */}
      <div className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navigation */}
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-foreground hover:bg-muted rounded-lg transition"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group ml-0 lg:ml-auto">
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
              <h1 className="text-xl font-black text-foreground">LivePalakkad</h1>
              <p className="text-xs text-muted-foreground">Palakkad First</p>
            </div>
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden lg:flex items-center gap-1">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-muted rounded-lg transition"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <SettingsToggle />
            <Link
              href="/desk"
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition shadow-sm"
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-card border-b border-border py-4 space-y-2">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:bg-muted rounded-lg transition"
              >
                {cat.name}
              </Link>
            ))}
            <Link
              href="/latest"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Latest
            </Link>
            <Link
              href="/explore"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Explore
            </Link>
            <Link
              href="/photos"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Photos
            </Link>
            <Link
              href="/videos"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
            >
              Videos
            </Link>
            <Link
              href="/live"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition flex items-center gap-1"
            >
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
            </Link>
          </div>
        )}

        {/* Secondary Navigation */}
        <div className="hidden lg:flex items-center gap-6 pb-4 text-sm border-t border-border pt-4">
          <Link href="/latest" className="text-muted-foreground hover:text-foreground font-medium transition">Latest</Link>
          <Link href="/explore" className="text-muted-foreground hover:text-foreground font-medium transition">Explore</Link>
          <Link href="/photos" className="text-muted-foreground hover:text-foreground font-medium transition">Photos</Link>
          <Link href="/videos" className="text-muted-foreground hover:text-foreground font-medium transition">Videos</Link>
          <Link href="/live" className="text-muted-foreground hover:text-foreground font-medium transition flex items-center gap-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live
          </Link>
        </div>
      </div>
      </div>
    </header>
  )
}
