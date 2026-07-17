import Link from 'next/link'
import Image from 'next/image'

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
}: ArticleCardProps) {

  if (layout === 'horizontal') {
    return (
      <Link href={`/articles/${slug}`}>
        <article className="flex gap-4 hover:opacity-75 transition">
          {image && (
            <div className="w-32 h-32 flex-shrink-0 bg-slate-200 dark:bg-slate-800 rounded overflow-hidden">
              <Image
                src={image}
                alt={title}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Link
                href={`/category/${categorySlug}`}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {category}
              </Link>
              {isBreaking && <span className="px-2 py-1 text-xs font-bold bg-red-600 text-white rounded">BREAKING</span>}
            </div>
            <h3 className="font-bold text-sm leading-snug line-clamp-3 text-slate-900 dark:text-white mb-1">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{publishedAt}</p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/articles/${slug}`}>
      <article className="hover:shadow-lg transition rounded-lg overflow-hidden bg-white dark:bg-slate-900">
        {image && (
          <div className="w-full h-48 bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <Image
              src={image}
              alt={title}
              width={400}
              height={192}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link
              href={`/category/${categorySlug}`}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {category}
            </Link>
            {isBreaking && <span className="px-2 py-1 text-xs font-bold bg-red-600 text-white rounded">BREAKING</span>}
          </div>
          <h3 className="font-bold text-base leading-snug line-clamp-2 text-slate-900 dark:text-white mb-2">{title}</h3>
          {excerpt && <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">{excerpt}</p>}
          <p className="text-xs text-slate-500 dark:text-slate-400">{publishedAt}</p>
        </div>
      </article>
    </Link>
  )
}
