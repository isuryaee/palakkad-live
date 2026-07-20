import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const section = await prisma.section.findUnique({
      where: { id: params.id },
      include: { categories: { orderBy: { order: 'asc' } } },
    })

    if (!section) {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(section)
  } catch (error) {
    console.error('[Section API] Error fetching section:', error)
    return NextResponse.json(
      { error: 'Failed to fetch section' },
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
    const { name, nameMal, slug, description, descriptionMal, icon, heroImage, order, isActive } = data

    const finalSlug = slug.toLowerCase().replace(/\s+/g, '-')

    const section = await prisma.section.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(nameMal && { nameMal }),
        ...(slug && { slug: finalSlug }),
        ...(description !== undefined && { description }),
        ...(descriptionMal !== undefined && { descriptionMal }),
        ...(icon !== undefined && { icon }),
        ...(heroImage !== undefined && { heroImage }),
        ...(order !== undefined && { order }),
        ...(isActive !== undefined && { isActive }),
      },
      include: { categories: true },
    })

    return NextResponse.json(section)
  } catch (error: any) {
    console.error('[Section API] Error updating section:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Section name or slug already exists' },
        { status: 409 }
      )
    }
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update section' },
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

    await prisma.section.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Section API] Error deleting section:', error)
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Section not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to delete section' },
      { status: 500 }
    )
  }
}
