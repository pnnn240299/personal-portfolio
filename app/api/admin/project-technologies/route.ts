import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/mysqlClient';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('projectId');
    
    if (!projectId) {
      return NextResponse.json(
        { error: 'Missing projectId parameter' },
        { status: 400 }
      );
    }
    
    const query = `
      SELECT el.* 
      FROM external_links el
      JOIN project_external_links pel ON el.id = pel.external_link_id
      WHERE pel.project_id = ?
      ORDER BY el.title
    `;
    
    const [rows] = await pool.query(query, [projectId]);
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching project technologies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project technologies' },
      { status: 500 }
    );
  }
}
