import { NextRequest, NextResponse } from 'next/server';
import { externalLinksService } from '@/services';

export async function GET() {
  try {
    const links = await externalLinksService.getAllLinks();
    return NextResponse.json(links);
  } catch (error) {
    console.error('Error fetching external links:', error);
    return NextResponse.json({ error: 'Failed to fetch external links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const link = await externalLinksService.createLink(body);
    return NextResponse.json(link, { status: 201 });
  } catch (error) {
    console.error('Error creating external link:', error);
    return NextResponse.json({ error: 'Failed to create external link' }, { status: 500 });
  }
}