import Link from 'next/link'
import Image from 'next/image'
import { Clock, Eye, ArrowRight } from 'lucide-react'

interface ArticleCardProps {
  slug: string
  title: string
  excerpt?: string
  image?: string
  category: string
  categorySlug: string
  publishedAt: string
  isBreaking?: boolean
  layout?: 'vertical' | 'horizontal' | 'hero' | 'compact'
  views?: number
  categoryColor?: string
  hideExcerpt?: boolean
}

export default function ArticleCard({
  slug,
  title,
  excerpt,
  image,
  category,
  categorySlug,
  publishedAt,
  isBreaking,
  layout = 'vertical',
  views,
  categoryColor = '#2563eb',
  hideExcerpt = false,
}: ArticleCardProps) {

  // Hero layout
  if (layout === 'hero') {
    return (
      <Link href={`/articles/${slug}`} className="group relative block aspect-video sm:aspect-[2/1] overflow-hidden rounded-lg">
        {image && (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white rounded"
              style={{ backgroundColor: categoryColor }}
            >
              {category}
            </span>
            {isBreaking && <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded">Breaking</span>}
            <span className="text-white/80 text-sm font-sans flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {publishedAt}
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2 group-hover:text-white/90 transition-colors">
            {title}
          </h2>
          {!hideExcerpt && excerpt && (
            <p className="text-white/80 line-clamp-2 text-sm md:text-base font-sans max-w-3xl">
              {excerpt}
            </p>
          )}
        </div>
      </Link>
    )
  }

  // Compact layout
  if (layout === 'compact') {
    return (
      <Link href={`/articles/${slug}`} className="group block">
        <h3 className="font-semibold text-sm md:text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: categoryColor }}
          >
            {category}
          </span>
          <span className="text-slate-600 dark:text-slate-400 text-[10px] font-sans">{publishedAt}</span>
        </div>
      </Link>
    )
  }

  if (layout === 'horizontal') {
    return (
      <article className="group flex gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-lg transition">
        {image && (
          <Link href={`/articles/${slug}`} className="w-40 h-32 flex-shrink-0 rounded-lg overflow-hidden relative">
            <Image
              src={image}
              alt={title}
              fill
              className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
          </Link>
        )}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-black px-2.5 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full">
                {category}
              </span>
              {isBreaking && <span className="px-2.5 py-1 text-xs font-black bg-red-600 text-white rounded-full">BREAKING</span>}
            </div>
            <Link href={`/articles/${slug}`} className="group/title inline-block">
              <h3 className="font-black text-sm leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition">{title}</h3>
            </Link>
            {excerpt && <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{excerpt}</p>}
          </div>
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1"><Clock size={13} /> {publishedAt}</span>
            {views && <span className="flex items-center gap-1"><Eye size={13} /> {views.toLocaleString()}</span>}
          </div>
        </div>
        <ArrowRight size={18} className="flex-shrink-0 mt-2 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
      </article>
    )
  }

  return (
    <article className="group h-full rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 shadow hover:shadow-xl transition flex flex-col">
      {image && (
        <Link href={`/articles/${slug}`} className="w-full h-48 bg-slate-300 dark:bg-slate-700 overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
          {isBreaking && (
            <div className="absolute top-3 right-3 px-3 py-1 text-xs font-black bg-red-600 text-white rounded-full">BREAKING</div>
          )}
        </Link>
      )}
      <div className="p-5 flex-1 flex flex-col">
        <span className="text-xs font-black px-2.5 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full w-fit mb-3">
          {category}
        </span>
        <Link href={`/articles/${slug}`} className="group/title inline-block">
          <h3 className="font-black text-base leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover/title:text-blue-600 dark:group-hover/title:text-blue-400 transition">{title}</h3>
        </Link>
        {excerpt && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{excerpt}</p>}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
          <span className="flex items-center gap-1"><Clock size={14} /> {publishedAt}</span>
          {views && <span className="flex items-center gap-1"><Eye size={14} /> {views.toLocaleString()}</span>}
        </div>
      </div>
    </article>
  )
}
