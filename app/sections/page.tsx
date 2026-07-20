import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export const metadata = {
  title: 'News Sections - LivePalakkad',
  description: 'Browse all news sections and categories',
}

async function getSections() {
  try {
    const sections = await prisma.section.findMany({
      where: { isActive: true },
      include: {
        categories: {
          where: { order: { not: undefined } },
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    })
    return sections
  } catch (error) {
    console.error('[Sections Page] Error:', error)
    return []
  }
}

export default async function SectionsPage() {
  const sections = await getSections()

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-black mb-2">News Sections</h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Explore all our news categories organized by section
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sections.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">No sections available</p>
          </div>
        ) : (
          <div className="space-y-12">
            {sections.map((section) => (
              <section
                key={section.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-lg transition"
              >
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 p-8">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{section.icon}</div>
                    <div>
                      <h2 className="text-3xl font-black text-white">{section.name}</h2>
                      {section.description && (
                        <p className="text-blue-100 mt-2">{section.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories Grid */}
                <div className="p-8">
                  {section.categories.length === 0 ? (
                    <p className="text-slate-600 dark:text-slate-400">No categories in this section</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="group p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="text-3xl">{category.icon}</div>
                            <div className="opacity-0 group-hover:opacity-100 transition text-blue-600 dark:text-blue-400 text-sm font-medium">
                              View →
                            </div>
                          </div>
                          <h3 className="font-black text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {category.name}
                          </h3>
                          {category.description && (
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                              {category.description}
                            </p>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
