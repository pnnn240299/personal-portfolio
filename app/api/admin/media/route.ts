import { NextRequest, NextResponse } from 'next/server';
import { mediaService } from '@/services';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const entityId = searchParams.get('entityId');
    const entityType = searchParams.get('entityType');
    const type = searchParams.get('type');
    
    if (!entityId || !entityType) {
      return NextResponse.json(
        { error: 'Missing entityId or entityType parameter' },
        { status: 400 }
      );
    }
    
    const mediaRelations = await mediaService.getEntityMedia(entityId, entityType, type || undefined);
    return NextResponse.json(mediaRelations);
  } catch (error) {
    console.error('Error fetching media:', error);
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Missing ID parameter' },
        { status: 400 }
      );
    }
    
    await mediaService.deleteMediaRelation(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media relation:', error);
    return NextResponse.json(
      { error: 'Failed to delete media relation' },
      { status: 500 }
    );
  }
}
