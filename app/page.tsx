import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ArticleCard from '@/components/ArticleCard'
import { WeatherWidget } from '@/components/WeatherWidget'
import { PollWidget } from '@/components/PollWidget'
import { MobileBottomNav } from '@/components/MobileBottomNav'
import Link from 'next/link'
import Image from 'next/image'
import { AlertCircle, Zap, Camera, Video, TrendingUp, MapPin, Clock, Eye, Radio, Share2, Bookmark, Radio as RadioIcon, AlertTriangle, ChevronRight } from 'lucide-react'

const BREAKING_NEWS = {
  id: 0,
  slug: 'heavy-rains-alert',
  title: 'Yellow Alert: Heavy Rains Expected This Week',
  excerpt: 'IMD issues warning for potential flooding. Residents advised to stay alert.'
}

const MOCK_ARTICLES = [
  {
    id: 1,
    slug: 'civic-body-launches-monsoon-preparedness',
    title: 'Civic Body Launches Monsoon Preparedness Drive in Palakkad',
    excerpt: 'The municipal corporation has initiated comprehensive measures to ensure drainage maintenance and preparedness ahead of the peak monsoon season.',
    image: 'https://images.unsplash.com/photo-1575505586569-646b2ca898fc?w=600&h=400&fit=crop',
    category: 'Weather',
    categorySlug: 'weather',
    publishedAt: '2 hours ago',
    isBreaking: false,
    views: 2450
  },
  {
    id: 2,
    slug: 'new-engineering-college-gets-nba-accreditation',
    title: 'New Engineering College in Mannarkkad Gets NBA Accreditation',
    excerpt: 'The institution becomes the second in the district to achieve accreditation from the National Board of Accreditation.',
    image: 'https://images.unsplash.com/photo-1427504494785-cdfa056f496d?w=600&h=400&fit=crop',
    category: 'Education',
    categorySlug: 'education',
    publishedAt: '4 hours ago',
    isBreaking: false,
    views: 1890
  },
  {
    id: 3,
    slug: 'collector-directs-swift-action-on-pothole-repairs',
    title: 'Collector Directs Swift Action on Pothole Repairs',
    excerpt: 'Following complaints from residents, the district collector has ordered immediate inspection and repair of damaged roads across Palakkad.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695c952952?w=600&h=400&fit=crop',
    category: 'Politics',
    categorySlug: 'politics',
    publishedAt: '6 hours ago',
    isBreaking: false,
    views: 3120
  },
  {
    id: 4,
    slug: 'local-artist-wins-national-award',
    title: 'Local Artist Wins National Award for Contemporary Sculpture',
    excerpt: 'A Palakkad-based sculptor has been recognized at the National Art Exhibition for innovative use of traditional materials.',
    image: 'https://images.unsplash.com/photo-1578301978162-7eae4d755744?w=600&h=400&fit=crop',
    category: 'Entertainment',
    categorySlug: 'entertainment',
    publishedAt: '8 hours ago',
    isBreaking: false,
    views: 1540
  },
]

const TRENDING = [
  { id: 1, title: 'Monsoon Preparedness Drive Underway', views: 5420 },
  { id: 2, title: 'Engineering College Gets Accreditation', views: 4980 },
  { id: 3, title: 'Roads to Get Major Repairs', views: 4120 },
]

const CATEGORIES = [
  { name: 'Breaking', slug: 'breaking-news', icon: AlertCircle },
  { name: 'Politics', slug: 'politics', icon: RadioIcon },
  { name: 'Crime', slug: 'crime', icon: AlertCircle },
  { name: 'Weather', slug: 'weather', icon: Zap },
  { name: 'Sports', slug: 'sports', icon: TrendingUp },
  { name: 'Education', slug: 'education', icon: Radio },
  { name: 'Business', slug: 'business', icon: TrendingUp },
  { name: 'Entertainment', slug: 'entertainment', icon: Camera },
]

const LOCATIONS = [
  { name: 'Palakkad Town', slug: 'palakkad-town', articles: 1240 },
  { name: 'Ottapalam', slug: 'ottapalam', articles: 890 },
  { name: 'Mannarkkad', slug: 'mannarkkad', articles: 670 },
  { name: 'Chittur', slug: 'chittur', articles: 540 },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:pb-0 pb-20">
        {/* Breaking News Alert - Compact Premium */}
        <Link href={`/articles/${BREAKING_NEWS.slug}`} className="group mb-6 block">
          <div className="relative overflow-hidden rounded-lg border border-red-200 dark:border-red-900/50 bg-gradient-to-r from-red-50 to-red-50/50 dark:from-red-950/30 dark:to-red-950/20 hover:border-red-300 dark:hover:border-red-800 transition-all duration-300 shadow-sm hover:shadow-md">
            <div className="relative px-4 py-3 sm:px-5 sm:py-4 flex items-start gap-3">
              {/* Icon */}
              <div className="flex-shrink-0 pt-0.5">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block px-2 py-0.5 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded">
                    BREAKING
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug line-clamp-2">{BREAKING_NEWS.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{BREAKING_NEWS.excerpt}</p>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 text-red-600 group-hover:translate-x-1 transition-transform">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Article */}
            <section>
              <Link href={`/articles/${MOCK_ARTICLES[0].slug}`}>
                <article className="group relative rounded-xl overflow-hidden h-[400px] shadow-xl hover:shadow-2xl transition">
                  <Image
                    src={MOCK_ARTICLES[0].image}
                    alt={MOCK_ARTICLES[0].title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="px-3 py-1 bg-blue-600 text-xs font-black rounded-full uppercase">Featured</span>
                      <span className="text-xs font-bold text-blue-200">{MOCK_ARTICLES[0].category}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3 text-balance">{MOCK_ARTICLES[0].title}</h2>
                    <div className="flex items-center gap-4 text-sm text-slate-300">
                      <span className="flex items-center gap-1"><Clock size={14} /> {MOCK_ARTICLES[0].publishedAt}</span>
                      <span className="flex items-center gap-1"><Eye size={14} /> {MOCK_ARTICLES[0].views} views</span>
                    </div>
                  </div>
                </article>
              </Link>
            </section>

            {/* Latest News */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black flex items-center gap-2">
                  <RadioIcon size={24} className="text-blue-600" /> Latest News
                </h3>
                <Link href="/latest" className="text-blue-600 font-bold text-sm hover:underline">View All →</Link>
              </div>
              <div className="space-y-4">
                {MOCK_ARTICLES.slice(1).map((article) => (
                  <ArticleCard key={article.id} {...article} layout="horizontal" />
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weather Widget */}
            <WeatherWidget />

            {/* Poll Widget */}
            <PollWidget />

            {/* Featured Sections Grid */}
            <div className="grid grid-cols-2 gap-4">
              <Link href="/photos" className="group relative rounded-lg overflow-hidden h-32 bg-slate-800 shadow-lg hover:shadow-xl transition">
                <Image
                  src="https://images.unsplash.com/photo-1606986628025-35d57e735ae0?w=300&h=300&fit=crop"
                  alt="Photo Gallery"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={32} className="mx-auto mb-2" />
                    <p className="font-black text-sm">Photo Gallery</p>
                  </div>
                </div>
              </Link>

              <Link href="/videos" className="group relative rounded-lg overflow-hidden h-32 bg-slate-800 shadow-lg hover:shadow-xl transition">
                <Image
                  src="https://images.unsplash.com/photo-1491480144351-f8d30750957d?w=300&h=300&fit=crop"
                  alt="Videos"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition flex items-center justify-center">
                  <div className="text-center text-white">
                    <Video size={32} className="mx-auto mb-2" />
                    <p className="font-black text-sm">Video Gallery</p>
                  </div>
                </div>
              </Link>

              <Link href="/live" className="group relative rounded-lg overflow-hidden h-32 bg-slate-800 shadow-lg hover:shadow-xl transition">
                <Image
                  src="https://images.unsplash.com/photo-1505355299627-b1f5f3854f4e?w=300&h=300&fit=crop"
                  alt="Live"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition flex items-center justify-center">
                  <div className="text-center text-white">
                    <RadioIcon size={32} className="mx-auto mb-2" />
                    <p className="font-black text-sm">Live Updates</p>
                  </div>
                </div>
              </Link>

              <Link href="/explore" className="group relative rounded-lg overflow-hidden h-32 bg-slate-800 shadow-lg hover:shadow-xl transition">
                <Image
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop"
                  alt="Explore"
                  fill
                  className="object-cover group-hover:scale-110 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition flex items-center justify-center">
                  <div className="text-center text-white">
                    <MapPin size={32} className="mx-auto mb-2" />
                    <p className="font-black text-sm">Explore</p>
                  </div>
                </div>
              </Link>
            </div>

            {/* Trending */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-black text-white rounded-xl p-6 shadow-lg">
              <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-orange-500" /> Trending Now
              </h4>
              <div className="space-y-3">
                {TRENDING.map((item, idx) => (
                  <Link
                    key={item.id}
                    href="#"
                    className="flex items-start gap-3 p-3 rounded hover:bg-white/10 transition group"
                  >
                    <span className="text-2xl font-black text-orange-500 flex-shrink-0">0{idx + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm leading-tight group-hover:text-orange-400 transition line-clamp-2">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Eye size={12} /> {item.views.toLocaleString()} views</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>


          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-black mb-6">Browse Categories</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="group p-4 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 shadow hover:shadow-lg transition text-center"
                >
                  <Icon size={32} className="mx-auto mb-2 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition" />
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{cat.name}</p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Locations Section */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black flex items-center gap-2">
              <MapPin size={24} className="text-blue-600" /> Palakkad Locations
            </h3>
            <Link href="/locations" className="text-blue-600 font-bold text-sm hover:underline">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {LOCATIONS.map((loc) => (
              <Link
                key={loc.slug}
                href={`/location/${loc.slug}`}
                className="group p-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 shadow hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-black text-lg group-hover:text-blue-600 transition">{loc.name}</h4>
                  </div>
                  <MapPin size={20} className="text-blue-600 flex-shrink-0" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{loc.articles} recent articles</p>
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Tap to explore →</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  )
}
