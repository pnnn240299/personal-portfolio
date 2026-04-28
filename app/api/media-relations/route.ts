import { NextRequest, NextResponse } from 'next/server';
import mysqlClient from '@/lib/mysqlClient';

export async function POST(request: NextRequest) {
  try {
    const { media_id, entity_id, entity_type, type, sort_order } = await request.json();

    if (!media_id || !entity_id || !entity_type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const connection = await mysqlClient.getConnection();
    try {
      const [result] = await connection.execute(
        `INSERT INTO media_relations (media_id, entity_id, entity_type, type, sort_order) 
         VALUES (?, ?, ?, ?, ?)`,
        [media_id, entity_id, entity_type, type || 'thumbnail', sort_order || 0]
      );
      
      return NextResponse.json({ 
        message: 'Media relation created successfully',
        id: (result as any).insertId
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Error creating media relation:', error);
    return NextResponse.json({ error: 'Failed to create media relation' }, { status: 500 });
  }
}
