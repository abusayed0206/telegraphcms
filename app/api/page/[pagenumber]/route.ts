// File: app/api/page/[pagenumber]/route.ts
import { NextRequest, NextResponse } from 'next/server'

type PageListResponse = {
  ok: boolean
  result: {
    total_count: number
    pages: Array<{
      path: string
      url: string
      title: string
      description: string
      views: number
    }>
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { pagenumber: string } }
): Promise<NextResponse> {
  const offset = (parseInt(params.pagenumber, 10) - 1) * 10
  const limit = '10' // Always 10 as per requirement

  const accessToken = process.env.tph_token

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token not configured' }, { status: 500 })
  }

  const url = `https://api.telegra.ph/getPageList?access_token=${accessToken}&offset=${offset}&limit=${limit}`

  try {
    const response = await fetch(url)
    const data: PageListResponse = await response.json()

    if (!data.ok) {
      return NextResponse.json({ error: 'Failed to fetch page list' }, { status: 400 })
    }

    return NextResponse.json(data.result)
  } catch (error) {
    console.error('Error fetching page list:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}