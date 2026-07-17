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
  layout?: 'vertical' | 'horizontal'
  views?: number
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
}: ArticleCardProps) {

  if (layout === 'horizontal') {
    return (
      <Link href={`/articles/${slug}`}>
        <article className="group flex gap-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-lg transition">
          {image && (
            <div className="w-40 h-32 flex-shrink-0 bg-slate-300 dark:bg-slate-700 rounded-lg overflow-hidden relative">
              <Image
                src={image}
                alt={title}
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition" />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Link
                  href={`/category/${categorySlug}`}
                  className="text-xs font-black px-2.5 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-600/20 transition"
                >
                  {category}
                </Link>
                {isBreaking && <span className="px-2.5 py-1 text-xs font-black bg-red-600 text-white rounded-full">BREAKING</span>}
              </div>
              <h3 className="font-black text-sm leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{title}</h3>
              {excerpt && <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{excerpt}</p>}
            </div>
            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Clock size={13} /> {publishedAt}</span>
              {views && <span className="flex items-center gap-1"><Eye size={13} /> {views.toLocaleString()}</span>}
            </div>
          </div>
          <ArrowRight size={18} className="flex-shrink-0 mt-2 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${slug}`}>
      <article className="group h-full rounded-lg overflow-hidden bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 shadow hover:shadow-xl transition flex flex-col">
        {image && (
          <div className="w-full h-48 bg-slate-300 dark:bg-slate-700 overflow-hidden relative">
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
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <Link
            href={`/category/${categorySlug}`}
            className="text-xs font-black px-2.5 py-1 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-600/20 transition w-fit mb-3"
          >
            {category}
          </Link>
          <h3 className="font-black text-base leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">{title}</h3>
          {excerpt && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">{excerpt}</p>}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="flex items-center gap-1"><Clock size={14} /> {publishedAt}</span>
            {views && <span className="flex items-center gap-1"><Eye size={14} /> {views.toLocaleString()}</span>}
          </div>
        </div>
      </article>
    </Link>
  )
}
