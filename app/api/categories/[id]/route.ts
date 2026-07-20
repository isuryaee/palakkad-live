import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { section: true, articles: { take: 10 } },
    })

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(category)
  } catch (error) {
    console.error('[Category API] Error fetching category:', error)
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const data = await request.json()
    const { name, nameMal, slug, description, descriptionMal, icon, heroImage, sectionId, order } = data

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

    const finalSlug = slug ? slug.toLowerCase().replace(/\s+/g, '-') : undefined

    const category = await prisma.category.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(nameMal && { nameMal }),
        ...(finalSlug && { slug: finalSlug }),
        ...(description !== undefined && { description }),
        ...(descriptionMal !== undefined && { descriptionMal }),
        ...(icon !== undefined && { icon }),
        ...(heroImage !== undefined && { heroImage }),
        ...(sectionId !== undefined && { sectionId }),
        ...(order !== undefined && { order }),
      },
      include: { section: true, articles: { take: 10 } },
    })

    return NextResponse.json(category)
  } catch (error: any) {
    console.error('[Category API] Error updating category:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Category name or slug already exists' },
        { status: 409 }
      )
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.category.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Category API] Error deleting category:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    )
  }
}
