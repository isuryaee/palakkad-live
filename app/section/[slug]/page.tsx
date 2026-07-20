import Link from 'next/link'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

export const revalidate = 60

async function getSection(slug: string) {
  try {
    const section = await prisma.section.findUnique({
      where: { slug },
      include: {
        categories: {
          orderBy: { order: 'asc' },
        },
      },
    })
    return section
  } catch (error) {
    console.error('[Section Detail] Error:', error)
    return null
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const section = await getSection(params.slug)

  if (!section) {
    return {
      title: 'Section Not Found - LivePalakkad',
    }
  }

  return {
    title: `${section.name} - LivePalakkad`,
    description: section.description,
  }
}

export default async function SectionPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const section = await getSection(params.slug)

  if (!section) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-900 dark:to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-6 mb-4">
            <div className="text-6xl">{section.icon}</div>
            <div>
              <h1 className="text-4xl font-black mb-2">{section.name}</h1>
              {section.description && (
                <p className="text-blue-100 text-lg">{section.description}</p>
              )}
            </div>
          </div>
          <Link
            href="/sections"
            className="inline-block text-blue-100 hover:text-white transition"
          >
            ← Back to All Sections
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {section.categories.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No categories in this section yet
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-black mb-8">Categories in {section.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="group p-8 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{category.icon}</div>
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                      VIEW
                    </div>
                  </div>
                  <h3 className="font-black text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                      {category.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
