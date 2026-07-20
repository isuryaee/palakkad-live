import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const sections = await prisma.section.findMany({
      where: { isActive: true },
      include: { categories: { orderBy: { order: 'asc' } } },
      orderBy: { order: 'asc' },
    })
    return NextResponse.json(sections)
  } catch (error) {
    console.error('[Sections API] Error fetching sections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sections' },
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
    const { name, nameMal, slug, description, descriptionMal, icon, heroImage } = data

    if (!name || !nameMal || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const finalSlug = slug.toLowerCase().replace(/\s+/g, '-')

    const section = await prisma.section.create({
      data: {
        name,
        nameMal,
        slug: finalSlug,
        description,
        descriptionMal,
        icon,
        heroImage,
        order: 0,
      },
      include: { categories: true },
    })

    return NextResponse.json(section, { status: 201 })
  } catch (error: any) {
    console.error('[Sections API] Error creating section:', error)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Section name or slug already exists' },
        { status: 409 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create section' },
      { status: 500 }
    )
  }
}
