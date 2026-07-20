import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        section: true,
        _count: {
          select: { articles: true },
        },
      },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(categories)
  } catch (error) {
    console.error('[Categories API] Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { name, nameMal, slug, description, descriptionMal, icon, heroImage, sectionId } = data

    if (!name || !nameMal || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const finalSlug = slug.toLowerCase().replace(/\s+/g, '-')

    // Verify section exists if provided
    if (sectionId) {
      const section = await prisma.section.findUnique({
        where: { id: sectionId },
      })
      if (!section) {
        return NextResponse.json(
          { error: 'Section not found' },
          { status: 404 }
        )
      }
    }

    const category = await prisma.category.create({
      data: {
        name,
        nameMal,
        slug: finalSlug,
        description,
        descriptionMal,
        icon,
        heroImage,
        sectionId: sectionId || null,
        order: 0,
      },
      include: { section: true },
    })

    return NextResponse.json(category, { status: 201 })
  } catch (error: any) {
    console.error('[Categories API] Error creating category:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category name or slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    )
  }
}
