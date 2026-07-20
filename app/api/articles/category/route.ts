import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'
const ARTICLES_PER_PAGE = 12

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const categorySlug = searchParams.get('slug')
    const page = parseInt(searchParams.get('page') || '1')

    if (!categorySlug) {
      return NextResponse.json(
        { error: 'Category slug is required' },
        { status: 400 }
      )
    }

    // Fetch category to verify it exists
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    // Calculate pagination
    const skip = (page - 1) * ARTICLES_PER_PAGE

    // Fetch articles with pagination
    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where: {
          categoryId: category.id,
          published: true,
        },
        include: {
          category: true,
          author: {
            select: { name: true, image: true },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: ARTICLES_PER_PAGE,
      }),
      prisma.article.count({
        where: {
          categoryId: category.id,
          published: true,
        },
      }),
    ])

    const totalPages = Math.ceil(total / ARTICLES_PER_PAGE)
    const hasMore = page < totalPages

    return NextResponse.json({
      articles,
      pagination: {
        page,
        pageSize: ARTICLES_PER_PAGE,
        total,
        totalPages,
        hasMore,
      },
      category,
    })
  } catch (error) {
    console.error('[Articles Category API] Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}
