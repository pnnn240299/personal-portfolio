import { NextRequest, NextResponse } from 'next/server';
import { externalLinksService } from '@/services';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const link = await externalLinksService.getLinkById(params.id);
    if (!link) {
      return NextResponse.json({ error: 'External link not found' }, { status: 404 });
    }
    return NextResponse.json(link);
  } catch (error) {
    console.error('Error fetching external link:', error);
    return NextResponse.json({ error: 'Failed to fetch external link' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedLink = await externalLinksService.updateLink(params.id, body);
    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Error updating external link:', error);
    return NextResponse.json({ error: 'Failed to update external link' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await externalLinksService.deleteLink(params.id);
    return NextResponse.json({ message: 'External link deleted' });
  } catch (error) {
    console.error('Error deleting external link:', error);
    return NextResponse.json({ error: 'Failed to delete external link' }, { status: 500 });
  }
}